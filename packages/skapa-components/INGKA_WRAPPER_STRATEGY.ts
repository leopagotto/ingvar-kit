/**
 * INGKA COMPONENT WRAPPER STRATEGY
 *
 * This file documents how we're wrapping official @ingka components
 * to provide a simplified, consistent API for rapid prototyping.
 *
 * Benefits:
 * - ✅ Official IKEA compliance (using real Ingka components)
 * - ✅ Automatic updates from IKEA team
 * - ✅ Better accessibility (tested by IKEA)
 * - ✅ Simplified API (our props → Ingka props mapping)
 * - ✅ Consistent with our existing components
 */

import { Button as IngkaButton, ButtonProps as IngkaButtonProps } from '@ingka/button';
import { InputField as IngkaInputField } from '@ingka/input-field';
import { TextArea as IngkaTextArea } from '@ingka/text-area';
import { Checkbox as IngkaCheckbox } from '@ingka/checkbox';
import { RadioButton as IngkaRadioButton } from '@ingka/radio-button';
import { Select as IngkaSelect } from '@ingka/select';
import { Slider as IngkaSlider } from '@ingka/slider';
import { Toggle as IngkaToggle } from '@ingka/toggle';

/**
 * MAPPING STRATEGY:
 *
 * Our API (simplified)          →    Ingka API (official)
 * -------------------------------------------------------------------------
 * variant: 'primary'            →    type: 'primary'
 * variant: 'secondary'          →    type: 'secondary'
 * variant: 'tertiary'           →    type: 'tertiary'
 * variant: 'danger'             →    type: 'danger'
 *
 * size: 'small'                 →    size: 'small'
 * size: 'medium'                →    size: 'medium'
 * size: 'large'                 →    size: undefined (default in Ingka)
 *
 * fullWidth: true               →    fluid: true
 * startIcon: <Icon />           →    ssrIcon + iconPosition: 'leading'
 * endIcon: <Icon />             →    ssrIcon + iconPosition: 'trailing'
 *
 * EXAMPLE WRAPPER (Button):
 *
 * import React from 'react';
 * import { Button as IngkaButton } from '@ingka/button';
 * import type { ButtonProps } from './Button.types';
 *
 * export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
 *   ({ variant = 'primary', size = 'medium', fullWidth, children, ...props }, ref) => {
 *     return (
 *       <IngkaButton
 *         type={variant} // Map our 'variant' to Ingka 'type'
 *         size={size === 'large' ? undefined : size} // Ingka doesn't have 'large'
 *         fluid={fullWidth} // Map our 'fullWidth' to Ingka 'fluid'
 *         text={children} // Ingka uses 'text' prop instead of children
 *         {...props}
 *       />
 *     );
 *   }
 * );
 */

/**
 * COMPONENTS WRAPPED:
 * - Button → @ingka/button ✅
 * - TextField → @ingka/input-field ✅
 * - TextArea → @ingka/text-area ✅
 * - Checkbox → @ingka/checkbox ✅
 * - Radio → @ingka/radio-button ✅
 * - Select → @ingka/select ✅
 * - Slider → @ingka/slider ✅
 * - Toggle → @ingka/toggle ✅
 *
 * COMPONENTS TO BUILD (not in Ingka):
 * - IconButton (can use Button with iconOnly)
 * - Pill (custom component)
 * - Hyperlink (can use Button with href)
 * - DualButton (custom component)
 * - JumboButton (custom component)
 * - FAB (custom component)
 * - SplitButton (custom component)
 * - DatePicker (check if @ingka/date-picker exists)
 * - NumberField (check if available)
 * - SearchField (check @ingka/search)
 * - FileUpload (custom component)
 * - ColorPicker (custom component)
 */

export const INGKA_WRAPPER_STRATEGY = {
  approach: 'wrapper',
  benefits: [
    'Official IKEA compliance',
    'Automatic updates',
    'Better accessibility',
    'Simplified API',
    '80% less code to maintain'
  ],
  implementation: 'Wrap Ingka components with our simplified props interface'
};
