/**
 * Code Generator for Ingvar Spark
 * Wrapper around the multi-model AI generator for app generation
 */

const { MultiModelCodeGenerator } = require('./multi-model-generator');
const ModelSelector = require('../model-selection');
const { getSpecsForAI } = require('../utils/component-spec-reader');
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
 * Generate a complete Spark app with AI
 */
async function generateSparkApp(prompt, appName, options = {}) {
  const { designSystem = 'ingka' } = options;
  const useIngka = designSystem === 'ingka' || designSystem === 'cwds';
  const useCwds = designSystem === 'cwds';

  // Load component specifications for the design system
  console.log(chalk.blue('📖 Loading component specifications...'));
  let componentSpecs = '';

  try {
    // Determine which components to load specs for based on prompt
    const componentsToLoad = detectRequiredComponents(prompt);

    if (componentsToLoad.length > 0) {
      console.log(chalk.gray(`   Reading specs for: ${componentsToLoad.join(', ')}`));
      componentSpecs = await getSpecsForAI(componentsToLoad);
      console.log(chalk.green('✅ Component specifications loaded'));
    }
  } catch (error) {
    console.warn(chalk.yellow(`⚠️  Could not load component specs: ${error.message}`));
    console.log(chalk.gray('   Proceeding with general design system knowledge'));
  }

  // Build system prompt based on design system
  let systemPrompt = '';

  if (useCwds) {
    // CWDS (internal tool with co-worker features, extends Ingka Skapa)
    systemPrompt = `You are an expert React developer creating a complete, production-ready internal co-worker tool using IKEA's Ingka Skapa Design System + CWDS.

TECH STACK:
- React 19 + TypeScript
- Vite build tool
- IKEA Ingka Skapa Design System (@ingka/* components) - Base components
- IKEA CWDS (@ingka-group-digital/* components) - Co-worker specific features
- Auth0 or Azure MSAL for authentication
- React Hook Form + Zod validation
- @tanstack/react-query for state

IKEA INGKA SKAPA BASE COMPONENTS (import from '@ingka/[component]'):
**Layout:** Grid, AspectRatioBox, Divider, Expander
**Display:** Card, Image, Text, List, Table, Tabs, Accordion
**Buttons:** Button, IconButton, DualButton, Hyperlink
**Forms:** InputField, TextArea, Checkbox, RadioButton, Switch, Select, Search
**Feedback:** Badge, Toast, Banner, InlineMessage, Loading, ProgressIndicator
**Modals:** Modal, ModalSheets, Popover, Tooltip

IKEA CWDS CO-WORKER COMPONENTS (import from '@ingka-group-digital/[component]'):
**Layout:** CWDSLayout, ILOFFLayout (with ILOFF apps integration)
**Navigation:** GlobalHeader, AppSwitcher, MobileNavigation (Bottom Nav), NavMenu (Drawer)
**User:** UserProfile (User Profile drawer)
**Shared:** cwds-variables, cwds-react-shared-models

DESIGN SYSTEM:
- Colors: Co-Worker Blue (#003E72), IKEA Yellow (#FFDB00)
- Professional, task-oriented, efficient for internal tools
- Global Header with app switching and user profile
- ILOFF Layout for app discovery
- Accessibility: WCAG 2.1 AA compliant

${componentSpecs ? '\n## COMPONENT SPECIFICATIONS\n\n' + componentSpecs + '\n' : ''}

REQUIREMENTS:
1. Use CWDSLayout or ILOFFLayout as root layout
2. Include GlobalHeader with AppSwitcher and UserProfile
3. Use @ingka/* components for UI elements (forms, tables, cards, etc.)
4. Import component CSS files
5. Implement authentication (Auth0 or Azure)
6. Add proper form validation with react-hook-form + zod
7. Include loading states and error handling
8. Follow IKEA design principles (professional, clean, efficient)
9. Use semantic HTML and accessibility features
10. Create reusable, composable components
11. FOLLOW the component specifications above precisely

EXAMPLE STRUCTURE:
\`\`\`tsx
import { CWDSLayout } from '@ingka-group-digital/cwds-react-layout';
import { GlobalHeader } from '@ingka-group-digital/cwds-react-header';
import { Card } from '@ingka/card';
import { Button } from '@ingka/button';

function App() {
  return (
    <CWDSLayout>
      <GlobalHeader
        appName="Admin Dashboard"
        user={currentUser}
      />
      <main>
        <Card>{/* content with @ingka/* components */}</Card>
      </main>
    </CWDSLayout>
  );
}
\`\`\`

Make it professional, efficient, and perfect for internal co-worker tools!`;

  } else if (useIngka) {
    // Ingka Skapa only (customer-facing)
    systemPrompt = `You are an expert React developer creating a complete, production-ready app using IKEA's official Ingka Skapa Design System.

TECH STACK:
- React 19 + TypeScript
- Vite build tool
- IKEA Ingka Skapa Design System (@ingka/* components)
- Framer Motion animations (optional)
- React Hook Form + Zod validation
- @tanstack/react-query for state
- Lucide React icons (supplementary)

IKEA INGKA SKAPA COMPONENTS AVAILABLE (import from '@ingka/[component]'):
**Layout:** Grid, AspectRatioBox, Divider, Expander
**Display:** Card, Image, Text, List, Table, Tabs, Accordion, Carousel
**Buttons:** Button (primary, secondary, outline, ghost), IconButton, DualButton, Hyperlink
**Forms:** InputField, TextArea, Checkbox, RadioButton, Switch, Select, Search, Slider
**Feedback:** Badge, Toast, Banner, InlineMessage, Loading, ProgressIndicator

DESIGN SYSTEM:
- Colors: IKEA Blue (#0051BA), IKEA Yellow (#FFDB00), Swedish minimalism
- Typography: Noto Sans font family
- Spacing: 8px grid system
- Accessibility: WCAG 2.1 AA compliant

${componentSpecs ? '\n## COMPONENT SPECIFICATIONS\n\n' + componentSpecs + '\n' : ''}

REQUIREMENTS:
1. Use ONLY @ingka/* components for UI (NO Tailwind CSS classes)
2. Import component CSS: import '@ingka/[component]/dist/style.css'
3. Import design tokens: import { colors, spacing } from '@ingka/variables'
4. Generate COMPLETE working React components with TypeScript
5. Implement responsive design (mobile-first, 8px grid)
6. Add proper form validation with react-hook-form + zod
7. Include loading states and error handling
8. Follow IKEA design principles (Swedish minimalism, clean, functional)
9. Use semantic HTML and accessibility features (WCAG 2.1 AA)
10. Create reusable, composable components
11. FOLLOW the component specifications above precisely

STYLING APPROACH:
- Use inline styles with IKEA design tokens: style={{ color: colors.blue, padding: spacing.md }}
- Import component CSS files for base styles
- NO Tailwind CSS classes (use IKEA components instead)

OUTPUT FORMAT:
Generate multiple files as needed. Use this format:
\`\`\`tsx
// src/App.tsx
import { Button } from '@ingka/button';
import { Card } from '@ingka/card';
import '@ingka/button/dist/style.css';
import '@ingka/card/dist/style.css';

[component code here]
\`\`\`

Make it polished, production-ready, Swedish-minimalist, and delightful to use!`;

  } else {
    // No IKEA design system - default Spark template
    systemPrompt = `You are an expert React developer creating a complete, production-ready app.

TECH STACK:
- React 19 + TypeScript
- Vite build tool
- Modern component library
- Responsive design

Generate clean, production-ready code with proper error handling and accessibility.`;
  }

  const userPrompt = `Create a complete React app: ${prompt}

App Name: ${appName}
Design System: ${useCwds ? 'IKEA Ingka Skapa + CWDS (Internal Tool)' : useIngka ? 'IKEA Ingka Skapa (Customer-facing)' : 'Default'}

Generate all necessary files with complete, working code.`;

  return generateWithAI(systemPrompt, userPrompt, {
    model: options.model,
    modelConfig: options.modelConfig,
    verbose: options.verbose,
    maxTokens: options.maxTokens || 4000
  });
}

/**
 * Detect which components are likely needed based on the prompt
 * This helps load only relevant component specs
 */
function detectRequiredComponents(prompt) {
  const promptLower = prompt.toLowerCase();
  const components = [];

  // Common component keywords
  const componentMap = {
    button: ['button', 'cta', 'submit', 'action'],
    card: ['card', 'panel', 'container'],
    'input-field': ['input', 'form', 'field', 'text field', 'email', 'password'],
    'text-area': ['textarea', 'comment', 'description', 'message'],
    checkbox: ['checkbox', 'check', 'select all'],
    'radio-button': ['radio', 'option', 'choice'],
    switch: ['switch', 'toggle'],
    select: ['dropdown', 'select', 'picker'],
    modal: ['modal', 'dialog', 'popup'],
    table: ['table', 'grid', 'data', 'list'],
    tabs: ['tabs', 'navigation'],
    accordion: ['accordion', 'collapse', 'expand'],
    badge: ['badge', 'tag', 'label'],
    toast: ['toast', 'notification', 'alert'],
    loading: ['loading', 'spinner', 'progress'],
    search: ['search', 'find', 'filter']
  };

  // Check each component keyword
  for (const [component, keywords] of Object.entries(componentMap)) {
    if (keywords.some(keyword => promptLower.includes(keyword))) {
      components.push(component);
    }
  }

  // Always include button and card for most apps
  if (components.length > 0) {
    if (!components.includes('button')) components.push('button');
    if (!components.includes('card')) components.push('card');
  }

  // Limit to top 5 most relevant to avoid overwhelming the prompt
  return components.slice(0, 5);
}

module.exports = {
  generateWithAI,
  generateSparkApp
};
