import { hot } from 'react-hot-loader';
import React, { Suspense, Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

// Lazy imports for Pages
const Post = React.lazy(() => import('./pages/posts/Post'));
const Posts = React.lazy(() => import('./pages/posts/Posts'));
const Home = React.lazy(() => import('./pages/home/Home'));
const Adder = React.lazy(() => import('./pages/posts/Adder'));
/**
 * Main App Component. Specifies routes for components
 * 
 * @author Sushen Kumar "su@sushen.dev"
 * @class App
 * @extends {Component}
 */
class App extends Component {
  render() {
    return (
      <Router>
        <MainLayout>
          <Route path='/' render={(props) => (
              <Suspense fallback={<div className="lazy-loading">Loading... hold up.</div>}>
                <Home {...props} routes={'/'} />
              </Suspense>
            )}
          />
        <Route path='/posts' render={(props) => (
            <Suspense fallback={<div className="lazy-loading">Loading... hold up.</div>}>
              <Posts {...props} routes={'/posts'} />
            </Suspense>
          )}
        />
        <Route path='/post:id' render={(props) => (
            <Suspense fallback={<div className="lazy-loading">Loading... hold up.</div>}>
              <Post {...props} routes={'/post:id'} />
            </Suspense>
          )}
        />
        <Route path='/add' render={(props) => (
            <Suspense fallback={<div className="lazy-loading">Loading... hold up.</div>}>
              <Adder {...props} routes={'/add'} />
            </Suspense>
          )}
        />
      </MainLayout>
    </Router>
    );
  }
};

export default hot(module)(App);
