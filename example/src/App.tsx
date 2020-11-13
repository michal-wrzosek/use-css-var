import React, { VFC } from 'react';
import styled from 'styled-components';

import { useCssVar } from './reactComponentLib';
import { numberToColor, useRandom } from './utils';

const BarStyled = styled.div<{ heightVar: string; colorVar: string }>`
  width: 10px;
  height: ${({ heightVar }) => `var(--${heightVar})`};
  background-color: ${({ colorVar }) => `var(--${colorVar})`};
  transition: height 100ms ease, background-color 100ms ease;
`;

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 200px;

  ${BarStyled} {
    margin: 0 1px;
  }
`;

const Bar = () => {
  const randomHeight = useRandom(0, 100, 100, 300);
  const randomColorNumber = useRandom(0, 1, 100, 300);
  const heightVar = useCssVar(`${randomHeight}%`);
  const colorVar = useCssVar(numberToColor(randomColorNumber));

  return <BarStyled heightVar={heightVar} colorVar={colorVar} />;
};

export const App: VFC = () => {
  return (
    <Container>
      {new Array(50).fill(undefined).map((_, index) => (
        <Bar key={index} />
      ))}
    </Container>
  );
};
