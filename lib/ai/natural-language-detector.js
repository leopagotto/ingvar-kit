/**
 * Natural Language Detector for Ingvar
 * Detects user intent from natural language commands
 * Replaces need for specific CLI commands with intelligent parsing
 */

const { MultiModelCodeGenerator } = require('./multi-model-generator');
const { generateWithAI } = require('./code-generator');

class NaturalLanguageDetector {
  constructor() {
    this.generator = new MultiModelCodeGenerator();
    this.generateWithAI = generateWithAI; // Add standalone generateWithAI

    // App creation patterns
    this.appCreationPatterns = [
      /create\s+(?:an?\s+)?app/i,
      /build\s+(?:an?\s+)?(?:new\s+)?app/i,
      /generate\s+(?:an?\s+)?app/i,
      /make\s+(?:an?\s+)?(?:new\s+)?app/i,
      /start\s+(?:an?\s+)?(?:new\s+)?(?:app\s+)?project/i,
      /bootstrap\s+(?:an?\s+)?app/i,
      /scaffold\s+(?:an?\s+)?app/i,
      /new\s+(?:app|project|application)/i,
      /prototype\s+(?:an?\s+)?app/i,
      /rapid\s+prototype/i,
      /quick\s+app/i,
      /spin\s+up\s+(?:an?\s+)?app/i,
      /initialize\s+(?:an?\s+)?(?:new\s+)?(?:app|project)/i
    ];

    // Component creation patterns
    this.componentPatterns = [
      /create\s+(?:a\s+)?component/i,
      /add\s+(?:a\s+)?component/i,
      /build\s+(?:a\s+)?component/i,
      /generate\s+(?:a\s+)?component/i,
      /make\s+(?:a\s+)?component/i,
      /new\s+component/i
    ];

    // Enhancement patterns
    this.enhancementPatterns = [
      /add\s+(?:some\s+)?features?/i,
      /enhance\s+(?:the\s+)?app/i,
      /improve\s+(?:the\s+)?(?:app|ui|design)/i,
      /update\s+(?:the\s+)?(?:app|design)/i,
      /modify\s+(?:the\s+)?app/i,
      /customize\s+(?:the\s+)?app/i
    ];
  }

  /**
   * Detect intent from natural language input
   * @param {string} input - User's natural language input
   * @returns {Object} Detected intent and parameters
   */
  async detectIntent(input) {
    if (!input || typeof input !== 'string') {
      return { intent: 'unknown', confidence: 0 };
    }

    const normalizedInput = input.trim().toLowerCase();

    // Check for app creation intent
    const appCreationMatch = this.appCreationPatterns.some(pattern =>
      pattern.test(normalizedInput)
    );

    if (appCreationMatch) {
      const extractedDetails = await this.extractAppDetails(input);
      return {
        intent: 'create_app',
        confidence: 0.9,
        action: 'spark_generate',
        parameters: {
          prompt: extractedDetails.prompt,
          name: extractedDetails.name,
          features: extractedDetails.features,
          style: 'ikea' // Default to IKEA design system
        }
      };
    }

    // Check for component creation intent
    const componentMatch = this.componentPatterns.some(pattern =>
      pattern.test(normalizedInput)
    );

    if (componentMatch) {
      const componentDetails = await this.extractComponentDetails(input);
      return {
        intent: 'create_component',
        confidence: 0.8,
        action: 'component_generate',
        parameters: componentDetails
      };
    }

    // Check for enhancement intent
    const enhancementMatch = this.enhancementPatterns.some(pattern =>
      pattern.test(normalizedInput)
    );

    if (enhancementMatch) {
      return {
        intent: 'enhance_app',
        confidence: 0.7,
        action: 'app_enhance',
        parameters: {
          enhancement: input,
          style: 'ikea'
        }
      };
    }

    // Use AI to detect more complex intents
    const aiDetection = await this.aiDetectIntent(input);
    return aiDetection;
  }

  /**
   * Extract app details from natural language
   * @param {string} input - User input
   * @returns {Object} Extracted app details
   */
  async extractAppDetails(input) {
    try {
      // Try AI extraction first if available
      const prompt = `Extract app creation details from: "${input}"

Return JSON: {"prompt": "clear description", "name": "kebab-case-name", "features": ["feature1"], "type": "web"}`;

      const response = await this.generateWithAI(prompt, '', {
        model: 'claude-3-sonnet-20241022',
        temperature: 0.3,
        maxTokens: 300,
        textOnly: true
      });

      const parsed = JSON.parse(response.trim());
      return {
        prompt: parsed.prompt || input,
        name: parsed.name || 'my-app',
        features: parsed.features || [],
        type: parsed.type || 'web'
      };
    } catch (error) {
      console.warn('Failed to extract app details with AI, using fallback');

      // Simple pattern-based extraction as fallback
      const words = input.toLowerCase().split(/\s+/);

      // Extract app name from keywords
      const appTypeWords = ['todo', 'task', 'blog', 'shop', 'dashboard', 'portfolio', 'chat', 'calendar'];
      const foundType = appTypeWords.find(type => words.includes(type));
      const appName = foundType ? `${foundType}-app` : 'my-app';

      // Extract features
      const features = [];
      if (words.includes('dark') || words.includes('theme')) features.push('dark-mode');
      if (words.includes('auth') || words.includes('login')) features.push('authentication');
      if (words.includes('responsive')) features.push('responsive');
      if (words.includes('ikea') || words.includes('swedish')) features.push('ikea-design');

      return {
        prompt: input,
        name: appName,
        features,
        type: 'web'
      };
    }
  }

  /**
   * Extract component details from natural language
   * @param {string} input - User input
   * @returns {Object} Extracted component details
   */
  async extractComponentDetails(input) {
    // Simple extraction for now
    const words = input.toLowerCase().split(' ');
    const componentIndex = words.findIndex(word => word === 'component');

    let componentType = 'Button';
    if (componentIndex > 0) {
      const beforeComponent = words[componentIndex - 1];
      componentType = beforeComponent.charAt(0).toUpperCase() + beforeComponent.slice(1);
    }

    return {
      type: componentType,
      name: `${componentType}Component`,
      description: input
    };
  }

  /**
   * Use AI to detect complex intents
   * @param {string} input - User input
   * @returns {Object} AI-detected intent
   */
  async aiDetectIntent(input) {
    const systemPrompt = `
Analyze user requests and determine their intent for app/component creation.

Return a JSON object with:
- intent: One of ["create_app", "create_component", "enhance_app", "help", "unknown"]
- confidence: Number between 0 and 1
- action: Suggested action to take
- parameters: Object with relevant parameters

Be conservative with confidence scores. Only return high confidence for clear requests.

Only return valid JSON:`;

    const userPrompt = `Analyze this user request: "${input}"`;

    try {
      const response = await this.generateWithAI(systemPrompt, userPrompt, {
        model: 'claude-3-sonnet-20241022',
        temperature: 0.2,
        maxTokens: 200,
        textOnly: true
      });

      const parsed = JSON.parse(response.trim());
      return {
        intent: parsed.intent || 'unknown',
        confidence: parsed.confidence || 0.1,
        action: parsed.action || 'help',
        parameters: parsed.parameters || {}
      };
    } catch (error) {
      console.warn('AI intent detection failed:', error.message);
      return {
        intent: 'unknown',
        confidence: 0,
        action: 'help',
        parameters: {}
      };
    }
  }

  /**
   * Check if input contains app creation intent
   * @param {string} input - User input
   * @returns {boolean} True if contains app creation intent
   */
  isAppCreationRequest(input) {
    if (!input) return false;
    return this.appCreationPatterns.some(pattern =>
      pattern.test(input.toLowerCase())
    );
  }

  /**
   * Get supported intents and examples
   * @returns {Object} Supported intents with examples
   */
  getSupportedIntents() {
    return {
      create_app: {
        description: 'Create a new application',
        examples: [
          'Create an app',
          'Build a new dashboard app',
          'Generate a task management application',
          'Make a landing page',
          'Rapid prototype for e-commerce'
        ]
      },
      create_component: {
        description: 'Create a new component',
        examples: [
          'Create a button component',
          'Add a card component',
          'Build a navigation component'
        ]
      },
      enhance_app: {
        description: 'Enhance existing application',
        examples: [
          'Add dark mode to the app',
          'Improve the design',
          'Add authentication features'
        ]
      }
    };
  }
}

module.exports = { NaturalLanguageDetector };
