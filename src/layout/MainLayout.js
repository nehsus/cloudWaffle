import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './MainLayout.less';

const { Footer, Sider } = Layout;

const rootRoutes = ['/', '/posts', '/post', '/posts/:id', '/add'];
const aboutSubRoutes = ['/posts/:id'];

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const { children } = this.props;
    return (
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          {collapsed ? <div className="logo">S</div> : <div className="logo">su@sushen.dev</div>}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[
              aboutSubRoutes.includes(window.location.pathname)
                ? '1'
                : rootRoutes.indexOf(window.location.pathname).toString(),
            ]}
          >
            <Menu.Item key="0">
              <Link to="/">
                <HomeOutlined />
                <span className="menu-item-link">Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Link to="/posts">
                <QuestionCircleOutlined />
                <span className="menu-item-link">Posts</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/add">
                <QuestionCircleOutlined />
                <span className="menu-item-link">Add a post</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          {children}
          <Footer>
          <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://apply.cloudflareworkers.com/"
            >
              CloudFlare
            </a>
            <span> | </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/nehsus/cloudWaffle"
            >
              GitHub
            </a>
            <span> | </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://instagram.com/nehsus_"
            >
              Instagram
            </a>
            <span> | </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.npmjs.com/package/reactjs-boilerplate"
            >
              React BoilerPlate
            </a>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
