/**
 * Simple Direct Import Test
 * 
 * Test that @ingka package exports can be imported successfully
 */

import { Button } from '@ingvar-kit/skapa-components/ingka-direct';
import { Card } from '@ingvar-kit/skapa-components/ingka-direct';
import { Badge } from '@ingvar-kit/skapa-components/ingka-direct';

export function SimpleTest() {
  return (
    <div>
      <h1>Skapa Direct Import Test</h1>
      <Button variant="primary">Test Button</Button>
      <Card>Test Card</Card>
      <Badge>Test Badge</Badge>
    </div>
  );
}
