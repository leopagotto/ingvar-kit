/**
 * Code Generator for Ingvar Spark
 * Wrapper around the multi-model AI generator for app generation
 */

const { MultiModelCodeGenerator } = require('./multi-model-generator');
const ModelSelector = require('../model-selection');
const chalk = require('chalk');

/**
 * Generate code using the multi-model AI system
 */
async function generateWithAI(systemPrompt, userPrompt, options = {}) {
  try {
    // For simple text generation (like intent detection), use direct text
    if (options.textOnly || userPrompt.includes('Return JSON:') || systemPrompt.includes('Return JSON:')) {
      console.log(chalk.yellow('📝 Using mock text response (set ANTHROPIC_API_KEY for real generation)'));

      // Mock JSON response for intent detection
      if (systemPrompt.includes('intent')) {
        return JSON.stringify({
          intent: 'create_app',
          confidence: 0.8,
          action: 'spark_generate',
          parameters: { type: 'app' }
        });
      }

      // Mock JSON response for app details
      if (systemPrompt.includes('app creation details') || userPrompt.includes('Extract')) {
        return JSON.stringify({
          prompt: userPrompt.replace(/Extract[^:]*:|Analyze[^:]*:/g, '').trim(),
          name: 'todo-app',
          features: ['swedish-design', 'ikea-style'],
          type: 'web'
        });
      }

      return 'Mock response';
    }

    const generator = new MultiModelCodeGenerator();

    // Use ModelSelector to get the appropriate model for Spark generation
    // Default to user's selected model, or use intelligent selection based on agent type
    let model = options.model;

    if (!model) {
      // Try to use ModelSelector for intelligent model selection
      try {
        const modelSelector = new ModelSelector(options.modelConfig || {});
        model = await modelSelector.selectModel('frontend', {
          description: userPrompt,
          type: 'spark_generation'
        }, 'moderate'); // Spark generation is moderate complexity

        if (modelSelector.verbose || options.verbose) {
          console.log(chalk.blue(`🤖 Selected model for Spark generation: ${model}`));
        }
      } catch (error) {
        // Fallback to default if model selection fails
        model = 'claude-3.5-sonnet';
        console.log(chalk.yellow(`⚠️  Using fallback model: ${model}`));
      }
    } else {
      console.log(chalk.blue(`🤖 Using specified model: ${model}`));
    }

    const maxTokens = options.maxTokens || 4000;

    // Create a spec-like object for the generator
    const spec = {
      constitution: '',
      specification: userPrompt,
      plan: systemPrompt,
      tasks: 'Generate code as requested'
    };

    const response = await generator.generateFromSpec(spec, {
      model,
      maxTokens,
      temperature: options.temperature || 0.3
    });

    return response.content;
  } catch (error) {
    console.log(chalk.yellow('⚠️  AI generation failed:', error.message));
    throw error;
  }
}

/**
 * Generate a complete React app structure
 */
async function generateSparkApp(prompt, appName, options = {}) {
  const systemPrompt = `You are an expert React developer creating a complete, production-ready app.

TECH STACK:
- React 19 + TypeScript
- Vite build tool
- Tailwind CSS v4 (latest)
- shadcn/ui components (pre-installed)
- Framer Motion animations
- React Hook Form + Zod validation
- @tanstack/react-query for state
- Lucide React icons

AVAILABLE COMPONENTS (import from @/components/ui/):
Button, Card, Input, Form, Dialog, Table, Chart, Select, Textarea, Checkbox, RadioGroup, Switch, Slider, Progress, Badge, Alert, Avatar, Accordion, Tabs, Calendar, Command, Dropdown, Navigation, Popover, Sheet, Sidebar, Tooltip, Carousel, Collapsible, HoverCard, Separator, Skeleton, Toggle, and more.

REQUIREMENTS:
1. Generate COMPLETE working React components
2. Use TypeScript with proper types
3. Implement responsive design (mobile-first)
4. Use shadcn/ui components extensively
5. Add smooth animations with Framer Motion
6. Include proper form validation with react-hook-form + zod
7. Add loading states and error handling
8. Create reusable, composable components
9. Follow React best practices (hooks, memo, etc.)
10. Use semantic HTML and accessibility features

OUTPUT FORMAT:
Generate multiple files as needed. Use this format:
\`\`\`tsx
// src/App.tsx
[component code here]
\`\`\`

\`\`\`tsx
// src/components/ComponentName.tsx
[component code here]
\`\`\`

\`\`\`tsx
// src/types/index.ts
[type definitions]
\`\`\`

Make it polished, production-ready, and delightful to use!`;

  const userPrompt = `Create a complete React app: ${prompt}

App name: ${appName}
Additional requirements: ${options.requirements || 'None'}

Generate a beautiful, functional app with multiple components, proper TypeScript types, responsive design, and excellent UX.`;

  return generateWithAI(systemPrompt, userPrompt, {
    model: options.model, // Pass through user's model selection
    modelConfig: options.modelConfig, // Pass through model config
    verbose: options.verbose,
    maxTokens: options.maxTokens || 4000
  });
}

module.exports = {
  generateWithAI,
  generateSparkApp
};
