# use-css-var

React hook that will allow you to control randomly generated CSS variable.

## Install
package is already shipped with types for TypeScript

```bash
yarn add use-css-var
```

or

```bash
npm i --save use-css-var
```

## Usage

Simple example with styled components:

```typescript
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useCssVar } from 'use-css-var';

const Box = styled.div<{ colorVar: string }>`
  width: 20px;
  height: 20px;
  background-color: var(--${({ colorVar }) => colorVar});
`;

const Example = () => {
  const [isRed, setIsRed] = useState(true);
  const colorVar = useCssVar(isRed ? 'red' : 'blue');

  const handleClick = useCallback(() => setIsRed(prev => !prev), []);

  return <Box colorVar={colorVar} onClick={handleClick} />;
}
```

## Example + Demo

Check out another example with lots of state changes in example app:
https://github.com/michal-wrzosek/use-css-var/blob/master/example/src/App.tsx

Live demo:
https://michal-wrzosek.github.io/use-css-var/

## Notes

This package is still in an experimental phase and contribution is very welcomed.

---
This package was bootstrapped with [react-component-lib](https://github.com/michal-wrzosek/react-component-lib)
