import { Layout, Button } from 'antd';
import styled from 'styled-components';

const AppFooter = styled(Layout.Footer)`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const FooterLink = styled(Button)`
  color: grey;
`;

export const Footer: React.FC = () => (
  <AppFooter>
    <div>
      By
      <FooterLink type="link" href="https://caiyiliang.github.io/" target="_blank">
        CherryLiang
      </FooterLink>
    </div>
  </AppFooter>
);
