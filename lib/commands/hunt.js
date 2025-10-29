/**
 * LEO Workflow Kit Hunt Commands
 * Interactive CLI commands for hunt management
 */

const inquirer = require('inquirer');
const chalk = require('chalk');
const { HuntCycleTracker } = require('../team/tracker');
const { ConfigurationManager } = require('../team/config-manager');
const { AnalyticsEngine } = require('../team/analytics');
const GitHubAuth = require('../team/github-auth');
const GitHubAPI = require('../team/github-api');
const SlackAuth = require('../team/slack-auth');
const SlackIntegration = require('../team/slack-integration');

/**
 * Hunt Commands Handler
 */
class HuntCommands {
  /**
   * Start a new hunt
   */
  static async start(options = {}) {
    console.log(chalk.cyan.bold('\n🦁 Starting New Hunt\n'));

    try {
      const manager = new ConfigurationManager('.');
      const config = await manager.load();

      if (!config) {
        console.error(chalk.red('❌ No LEO Workflow Kit configuration found. Run "leo team init" first.'));
        return;
      }

      // Get hunt details
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'featureName',
          message: 'Feature name:',
          validate: name => (name.length > 0 ? true : 'Feature name required')
        },
        {
          type: 'input',
          name: 'description',
          message: 'Feature description:',
          default: 'Add new feature'
        },
        {
          type: 'confirm',
          name: 'createIssues',
          message: 'Create GitHub issues for this hunt?',
          default: true
        }
      ]);

      // Start hunt
      const tracker = await HuntCycleTracker.load('.');
      const hunt = await tracker.startHunt(answers.featureName, answers.description);

      await tracker.save('.');

      console.log(chalk.green.bold('\n✅ Hunt started successfully!\n'));
      this._displayHuntStatus(hunt, config);

      // Create GitHub issue if enabled
      if (answers.createIssues && config.github?.enabled) {
        try {
          const issue = await this._createGitHubIssue(config, hunt);
          if (issue) {
            hunt.githubIssue = {
              number: issue.number,
              id: issue.id,
              url: issue.url,
              createdAt: new Date().toISOString()
            };
            await tracker.save('.');
            console.log(chalk.green(`✅ GitHub issue created: #${issue.number}\n`));
          }
        } catch (error) {
          console.log(chalk.yellow(`⚠️  Could not create GitHub issue: ${error.message}\n`));
        }
      }

      // Send Slack notification if enabled
      await this._notifySlackHuntCreated(config, hunt);

      // Display next steps
      console.log(chalk.cyan('📋 Next Steps:\n'));
      const firstColumn = config.workflow.columns[0];
      const assignee = config.workflow.memberMapping[firstColumn.id];
      console.log(chalk.dim(`   1. Assign to: @${assignee}`));
      console.log(chalk.dim(`   2. Add to column: ${firstColumn.name}`));
      console.log(chalk.dim(`   3. Track progress with: leo hunt status ${hunt.id}\n`));

      return hunt;
    } catch (error) {
      console.error(chalk.red.bold('❌ Error starting hunt:'), error.message);
      throw error;
    }
  }

  /**
   * Show hunt status
   */
  static async status(huntId, options = {}) {
    try {
      const manager = new ConfigurationManager('.');
      const config = await manager.load();

      if (!config) {
        console.error(chalk.red('❌ No LEO Workflow Kit configuration found. Run "leo team init" first.'));
        return;
      }

      const tracker = await HuntCycleTracker.load('.');

      if (!huntId) {
        // Show all active hunts
        const activeHunts = tracker.getActiveHunts();

        if (activeHunts.length === 0) {
          console.log(chalk.yellow('ℹ️  No active hunts\n'));
          return;
        }

        console.log(chalk.cyan.bold('\n📊 Active Hunts\n'));

        activeHunts.forEach((hunt, index) => {
          console.log(
            chalk.bold(`${index + 1}. ${hunt.featureName} (${hunt.id})`)
          );
          console.log(chalk.dim(`   Status: ${hunt.status}`));
          console.log(chalk.dim(`   Current phase: ${hunt.currentPhase}`));
          console.log(chalk.dim(`   Duration: ${hunt.getTotalDuration()} minutes\n`));
        });
      } else {
        // Show specific hunt
        const hunt = tracker.getHunt(huntId);

        if (!hunt) {
          console.error(chalk.red(`❌ Hunt not found: ${huntId}`));
          return;
        }

        this._displayHuntStatus(hunt, config);
      }
    } catch (error) {
      console.error(chalk.red.bold('❌ Error getting hunt status:'), error.message);
      throw error;
    }
  }

  /**
   * List all hunts
   */
  static async list(options = {}) {
    try {
      const tracker = await HuntCycleTracker.load('.');
      const allHunts = tracker._hunts || [];

      if (allHunts.length === 0) {
        console.log(chalk.yellow('ℹ️  No hunts found\n'));
        return;
      }

      console.log(chalk.cyan.bold('\n📊 All Hunts\n'));

      const completed = allHunts.filter(h => h.status === 'completed');
      const active = allHunts.filter(h => h.status === 'active');

      if (active.length > 0) {
        console.log(chalk.yellow('🔄 Active:\n'));
        active.forEach(hunt => {
          console.log(
            chalk.dim(`   ${hunt.featureName} (${hunt.id}) - Phase: ${hunt.currentPhase}`)
          );
        });
        console.log();
      }

      if (completed.length > 0) {
        console.log(chalk.green('✅ Completed:\n'));
        completed.forEach(hunt => {
          console.log(chalk.dim(`   ${hunt.featureName} (${hunt.id})`));
        });
        console.log();
      }
    } catch (error) {
      console.error(chalk.red.bold('❌ Error listing hunts:'), error.message);
      throw error;
    }
  }

  /**
   * Transition hunt to next phase
   */
  static async nextPhase(huntId, options = {}) {
    try {
      const manager = new ConfigurationManager('.');
      const config = await manager.load();

      if (!config) {
        console.error(chalk.red('❌ No LEO Workflow Kit configuration found. Run "leo team init" first.'));
        return;
      }

      const tracker = await HuntCycleTracker.load('.');
      const hunt = tracker.getHunt(huntId);

      if (!hunt) {
        console.error(chalk.red(`❌ Hunt not found: ${huntId}`));
        return;
      }

      // Get current and next phase
      const currentIndex = config.workflow.sequence.indexOf(hunt.currentPhase);
      if (currentIndex === -1 || currentIndex === config.workflow.sequence.length - 1) {
        console.error(chalk.red('❌ Hunt cannot transition further'));
        return;
      }

      const nextPhaseId = config.workflow.sequence[currentIndex + 1];
      const nextMember = config.workflow.memberMapping[nextPhaseId];

      // Store previous phase for notification
      const previousPhase = hunt.currentPhase;

      // Transition hunt
      tracker.transitionHunt(huntId, nextPhaseId, nextMember);
      await tracker.save('.');

      // Sync to GitHub if enabled
      if (hunt.githubIssue && config.github?.enabled) {
        await this._updateGitHubIssuePhase(config, hunt, nextPhaseId);
      }

      // Send Slack notification if enabled
      await this._notifySlackPhaseTransition(config, hunt, previousPhase, nextPhaseId);

      console.log(chalk.green.bold('\n✅ Hunt transitioned!\n'));
      console.log(chalk.dim(`   Moving to: ${nextPhaseId}`));
      console.log(chalk.dim(`   Assigned to: @${nextMember}\n`));

      this._displayHuntStatus(hunt, config);
    } catch (error) {
      console.error(chalk.red.bold('❌ Error transitioning hunt:'), error.message);
      throw error;
    }
  }

  /**
   * Complete hunt
   */
  static async complete(huntId, options = {}) {
    try {
      const manager = new ConfigurationManager('.');
      const config = await manager.load();
      const tracker = await HuntCycleTracker.load('.');
      const hunt = tracker.getHunt(huntId);

      if (!hunt) {
        console.error(chalk.red(`❌ Hunt not found: ${huntId}`));
        return;
      }

      // Close GitHub issue if enabled
      if (hunt.githubIssue && config.github?.enabled) {
        await this._closeGitHubIssue(config, hunt);
      }

      tracker.completeHunt(huntId);
      await tracker.save('.');

      // Send Slack notification if enabled
      await this._notifySlackHuntCompleted(config, hunt);

      console.log(chalk.green.bold('\n✅ Hunt completed!\n'));
      console.log(chalk.dim(`   ${hunt.featureName} finished`));
      console.log(chalk.dim(`   Total duration: ${hunt.getTotalDuration()} minutes\n`));
    } catch (error) {
      console.error(chalk.red.bold('❌ Error completing hunt:'), error.message);
      throw error;
    }
  }

  /**
   * Show hunt analytics
   */
  static async analytics(options = {}) {
    try {
      const engine = await AnalyticsEngine.load('LEO Workflow Kit', '.');

      if (!engine || engine.metrics.length === 0) {
        console.log(chalk.yellow('ℹ️  No hunt metrics available yet\n'));
        return;
      }

      const report = engine.generateTeamReport();
      const markdown = engine.formatReportAsMarkdown(report);

      console.log(chalk.cyan.bold('\n📊 Team Analytics\n'));
      console.log(markdown);
    } catch (error) {
      console.error(chalk.red.bold('❌ Error getting analytics:'), error.message);
      throw error;
    }
  }

  /**
   * Display hunt status
   */
  static _displayHuntStatus(hunt, config) {
    const currentPhaseIndex = config.workflow.sequence.indexOf(hunt.currentPhase);
    const phasePercentage = Math.round(((currentPhaseIndex + 1) / config.workflow.sequence.length) * 100);

    console.log(chalk.cyan.bold('═══════════════════════════════════════════════'));
    console.log(chalk.cyan.bold(`  🦁 ${hunt.featureName}`));
    console.log(chalk.cyan.bold('═══════════════════════════════════════════════\n'));

    console.log(chalk.bold('Hunt Details:\n'));
    console.log(chalk.dim(`   ID: ${hunt.id}`));
    console.log(chalk.dim(`   Status: ${hunt.status}`));
    console.log(chalk.dim(`   Current Phase: ${hunt.currentPhase}`));
    console.log(chalk.dim(`   Progress: ${phasePercentage}% (${currentPhaseIndex + 1}/${config.workflow.sequence.length})`));
    console.log(chalk.dim(`   Duration: ${hunt.getTotalDuration()} minutes`));

    // Display GitHub issue if available
    if (hunt.githubIssue) {
      console.log(chalk.dim(`   GitHub Issue: #${hunt.githubIssue.number}`));
    }

    console.log();

    // Phase timeline
    console.log(chalk.bold('Phase Timeline:\n'));
    config.workflow.sequence.forEach((phaseId, index) => {
      const isComplete = index < currentPhaseIndex;
      const isCurrent = index === currentPhaseIndex;
      const column = config.workflow.columns.find(c => c.id === phaseId);

      if (isComplete) {
        console.log(chalk.green(`   ✓ ${column.name}`));
      } else if (isCurrent) {
        console.log(chalk.yellow(`   ▶ ${column.name}`));
      } else {
        console.log(chalk.dim(`   ○ ${column.name}`));
      }
    });

    console.log(chalk.cyan.bold('\n═══════════════════════════════════════════════\n'));
  }

  /**
   * Create GitHub issue from hunt
   * @private
   */
  static async _createGitHubIssue(config, hunt) {
    try {
      if (!GitHubAuth.hasToken()) {
        return null;
      }

      const token = GitHubAuth.loadToken();
      const auth = new GitHubAuth(token);
      await auth.validateToken();

      const api = new GitHubAPI(auth);

      const issue = await api.createIssue(
        `${config.org}/${config.repo}`,
        `🦁 ${hunt.featureName}`,
        `${hunt.description}\n\nHunt ID: ${hunt.id}`,
        ['hunt', 'leo']
      );

      // Add to project board if available
      if (config.github?.projectId && config.github?.columns?.length > 0) {
        const firstColumnId = config.github.columns[0].id;
        await api.addIssueToBoard(
          config.github.projectId,
          issue.number,
          firstColumnId
        );
      }

      return issue;
    } catch (error) {
      throw new Error(`GitHub issue creation failed: ${error.message}`);
    }
  }

  /**
   * Update GitHub issue when hunt transitions phase
   * @private
   */
  static async _updateGitHubIssuePhase(config, hunt, newPhase) {
    try {
      if (!hunt.githubIssue || !config.github?.enabled) {
        return null;
      }

      const token = GitHubAuth.loadToken();
      const auth = new GitHubAuth(token);
      await auth.validateToken();

      const api = new GitHubAPI(auth);

      // Update labels
      const phaseLabel = newPhase.replace('_', '-');
      await api.addLabel(
        `${config.org}/${config.repo}`,
        hunt.githubIssue.number,
        [phaseLabel]
      );

      // Move on board if available
      if (config.github?.projectId) {
        const newColumn = config.github.columns.find(col => col.name === newPhase);
        if (newColumn) {
          await api.moveIssueColumn(
            config.github.projectId,
            hunt.githubIssue.number,
            newColumn.id
          );
        }
      }

      // Add comment
      await api.addComment(
        `${config.org}/${config.repo}`,
        hunt.githubIssue.number,
        `🔄 Moved to **${newPhase}** phase`
      );

      return true;
    } catch (error) {
      console.log(chalk.yellow(`⚠️  Could not update GitHub issue: ${error.message}`));
      return null;
    }
  }

  /**
   * Close GitHub issue when hunt completes
   * @private
   */
  static async _closeGitHubIssue(config, hunt) {
    try {
      if (!hunt.githubIssue || !config.github?.enabled) {
        return null;
      }

      const token = GitHubAuth.loadToken();
      const auth = new GitHubAuth(token);
      await auth.validateToken();

      const api = new GitHubAPI(auth);

      // Update issue to closed
      await api.updateIssue(
        `${config.org}/${config.repo}`,
        hunt.githubIssue.number,
        { state: 'closed' }
      );

      // Add completion comment
      await api.addComment(
        `${config.org}/${config.repo}`,
        hunt.githubIssue.number,
        `✅ Hunt completed! Duration: ${hunt.getTotalDuration()} minutes`
      );

      return true;
    } catch (error) {
      console.log(chalk.yellow(`⚠️  Could not close GitHub issue: ${error.message}`));
      return null;
    }
  }

  /**
   * Send Slack notification when hunt is created
   * @private
   */
  static async _notifySlackHuntCreated(config, hunt) {
    try {
      if (!SlackAuth.hasToken() || !config.slack?.enabled || !config.slack?.channelId) {
        return null;
      }

      const token = SlackAuth.loadToken();
      const auth = new SlackAuth(token);
      const integration = new SlackIntegration(auth, config.slack.channelId);

      await integration.notifyHuntCreated({
        title: hunt.title || hunt.featureName,
        description: hunt.description || 'No description',
        currentPhase: hunt.currentPhase || 'Not Started',
        owner: config.owner || 'Unassigned',
        priority: hunt.priority || 'Medium',
        createdAt: hunt.createdAt || new Date().toISOString()
      });

      return true;
    } catch (error) {
      console.log(chalk.yellow(`⚠️  Could not send Slack notification: ${error.message}`));
      return null;
    }
  }

  /**
   * Send Slack notification on phase transition
   * @private
   */
  static async _notifySlackPhaseTransition(config, hunt, fromPhase, toPhase) {
    try {
      if (!SlackAuth.hasToken() || !config.slack?.enabled || !config.slack?.channelId) {
        return null;
      }

      const token = SlackAuth.loadToken();
      const auth = new SlackAuth(token);
      const integration = new SlackIntegration(auth, config.slack.channelId);

      await integration.notifyPhaseTransition(
        {
          title: hunt.title || hunt.featureName,
          description: hunt.description,
          githubIssue: hunt.githubIssue,
          phases: hunt.phases
        },
        fromPhase,
        toPhase
      );

      return true;
    } catch (error) {
      console.log(chalk.yellow(`⚠️  Could not send Slack notification: ${error.message}`));
      return null;
    }
  }

  /**
   * Send Slack notification when hunt completes
   * @private
   */
  static async _notifySlackHuntCompleted(config, hunt) {
    try {
      if (!SlackAuth.hasToken() || !config.slack?.enabled || !config.slack?.channelId) {
        return null;
      }

      const token = SlackAuth.loadToken();
      const auth = new SlackAuth(token);
      const integration = new SlackIntegration(auth, config.slack.channelId);

      const duration = hunt.getTotalDuration?.() || 0;
      const phasesCompleted = hunt.phases?.filter(p => p.completed)?.length || 0;

      await integration.notifyHuntCompleted(
        {
          title: hunt.title || hunt.featureName,
          description: hunt.description,
          phases: hunt.phases
        },
        {
          duration: duration,
          completionRate: 100,
          phasesCompleted: phasesCompleted,
          startTime: hunt.createdAt,
          endTime: new Date().toISOString()
        }
      );

      return true;
    } catch (error) {
      console.log(chalk.yellow(`⚠️  Could not send Slack notification: ${error.message}`));
      return null;
    }
  }
}

module.exports = {
  HuntCommands
};
