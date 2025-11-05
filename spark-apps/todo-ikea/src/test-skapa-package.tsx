import React from 'react';
// Test direct @ingka exports
import { Button, Card, InputField, Switch } from '@ingvar-kit/skapa-components/ingka-direct';

// Test simplified wrappers
import { TextField, Toggle } from '@ingvar-kit/skapa-components';

export function TestSkapaPackage() {
  console.log('Skapa Components Package Test');
  console.log('Direct exports:', { Button, Card, InputField, Switch });
  console.log('Wrappers:', { TextField, Toggle });
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>✅ Skapa Components Package Loaded Successfully!</h1>
      
      <h2>Direct @ingka Exports</h2>
      <p>Imported: Button, Card, InputField, Switch</p>
      
      <h2>Simplified Wrappers</h2>
      <p>Imported: TextField, Toggle</p>
      
      <p style={{ color: 'green', marginTop: '20px' }}>
        🎉 All imports working correctly! Check browser console for component objects.
      </p>
    </div>
  );
}

export default TestSkapaPackage;
