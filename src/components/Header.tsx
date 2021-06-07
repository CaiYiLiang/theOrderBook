import { Typography, Layout } from 'antd';
import styled from 'styled-components';

const AppHeader = styled(Layout.Header)`
  padding: 1rem 2rem;
  display: flex;
`;
const Title = styled(Typography.Title)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const TITLE = 'Order Book';

export const Header: React.FC = () => (
  <AppHeader>
    <Title>{TITLE}</Title>
  </AppHeader>
);
