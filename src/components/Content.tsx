import { Layout, Button } from 'antd';
import styled from 'styled-components';

const AppContent = styled(Layout.Content)`
  padding: 1rem 2rem;
`;

export const Content: React.FC = ({ children }) => <AppContent>{children}</AppContent>;
