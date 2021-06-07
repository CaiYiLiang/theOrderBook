import { Layout, Button } from 'antd';
import styled from 'styled-components';

const AppFooter = styled(Layout.Footer)`
  position: absolute;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  bottom: 1px;
`;

const FooterLink = styled(Button)`
  color: grey;
`;

export const Footer: React.FC = () => (
  <AppFooter>
    By
    <FooterLink type="link" href="https://caiyiliang.github.io/" target="_blank">
      CherryLiang
    </FooterLink>
  </AppFooter>
);
