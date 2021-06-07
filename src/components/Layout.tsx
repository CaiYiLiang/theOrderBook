import { Typography, Layout as AntdLayout } from 'antd';
import styled from 'styled-components';
import { Header, Footer, Content } from '.';

const AppLayout = styled(AntdLayout)`
  height: 100vh;
  width: 100%;
`;

export const Layout: React.FC = ({ children }) => (
  <AppLayout>
    <Header />
    <Content>{children}</Content>
    <Footer />
  </AppLayout>
);
