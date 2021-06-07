import React from 'react';
import styled from 'styled-components';

const FlexBoxWrapper = styled.div<any>`
  display: flex;
  flex-direction: ${(props) => (props.col ? 'column' : 'row')};
  justify-content: ${(props) => props.justifyContent || 'center'};
  align-items: ${(props) => props.alignItems || 'center'};
  width: 100%;
  margin-top: ${(props) => props.horizontalGap && '1rem'};
  margin-bottom: ${(props) => props.horizontalGap && '1rem'};
  margin-left: ${(props) => props.verticalGap && '1rem'};
  margin-right: ${(props) => props.verticalGap && '1rem'};
`;

interface IFlexBoxProps {
  col?: boolean;
  justifyContent?: string;
  alignItems?: string;
  children?: JSX.Element | React.ReactNode;
  horizontalGap?: boolean;
  verticalGap?: boolean;
}

export const FlexBox = ({
  col,
  horizontalGap,
  verticalGap,
  justifyContent,
  alignItems,
  children,
}: IFlexBoxProps) => (
  <FlexBoxWrapper
    col={col}
    justifyContent={justifyContent}
    alignItems={alignItems}
    horizontalGap={horizontalGap}
    verticalGap={verticalGap}
  >
    {children}
  </FlexBoxWrapper>
);
