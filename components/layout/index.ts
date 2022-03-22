import { App } from 'vue';
import Layout, { Header, Footer, Content } from './layout';
import Sider from './Sider';

export const LayoutHeader = Header;
export const LayoutFooter = Footer;
export const LayoutContent = Content;
export const LayoutSider = Sider;

export default Object.assign(Layout, {
  Header,
  Footer,
  Content,
  Sider,
  install: (app: App) => {
    app.component(Layout.name, Layout);
    app.component(Header.name, Header);
    app.component(Footer.name, Footer);
    app.component(Content.name, Content);
    app.component(Sider.name, Sider);
    return app;
  },
});
