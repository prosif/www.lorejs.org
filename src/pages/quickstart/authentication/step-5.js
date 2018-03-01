import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Quickstart';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        Step 5: Add Logout Experience
      </h1>

      <p>
        In this step we're going to add a logout experience.
      </p>

      <QuickstartBranch branch="authentication.5" />

      <h3>
        Create the Logout Component
      </h3>
      <p>
        While we don't have a "logout page" in a visual sense, we still have behavior that we want executed when the user logs
        out, such as removing their user token and redirecting them the login page. We're going to store this behavior in
        a component so that we can have it occur when the user navigates to the <code>/logout</code> route.
      </p>

      <p>
        To get started, create a <code>Logout</code> component:
      </p>

      <Markdown type="sh" text={`
      lore generate component Logout
      `}/>

      <p>
        Update your Logout component to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var auth = require('../utils/auth');

        module.exports = React.createClass({
          displayName: 'Logout',

          propTypes: {
            router: React.PropTypes.object.isRequired
          },

          componentDidMount: function(){
            auth.deleteToken();
            this.props.router.push('/');
          },

          render: function() {
            return (
              <h1 className="loading-text">
                Logging out...
              </h1>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';
        import auth from '../utils/auth';

        class Logout extends Component {

          componentDidMount(){
            auth.deleteToken();
            this.props.router.push('/');
          }

          render() {
            return (
              <h1 className="loading-text">
                Logging out...
              </h1>
            );
          }
        }

        Logout.propTypes = {
          router: PropTypes.object.isRequired
        };

        export default Logout;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import auth from '../utils/auth';

        class Logout extends Component {

          static propTypes = {
            router: PropTypes.object.isRequired
          };

          componentDidMount(){
            auth.deleteToken();
            this.props.router.push('/');
          }

          render() {
            return (
              <h1 className="loading-text">
                Logging out...
              </h1>
            );
          }
        }

        export default Logout;
        `}/>
      </CodeTabs>

      <h3>
        Add the /logout route
      </h3>
      <p>
        Next import your <code>Logout</code> component into <code>routes.js</code> and update the routes to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        var Logout = require('./src/components/Logout');

        module.exports = (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            ...
          </Route>
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
        import Logout from './src/components/Logout';

        export default (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            ...
          </Route>
        )
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
        import Logout from './src/components/Logout';

        export default (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            ...
          </Route>
        )
        `}/>
      </CodeTabs>

      <h3>
        Convert Logout Button to Link
      </h3>
      <p>
        Finally, we need to make it so that when the user clicks the <code>Logout</code> button in the <code>Profile</code> component they are
        redirect to the <code>/logout</code> route, which will delete their user token and redirect them to the login page.
      </p>

      <p>
        Locate the Logout button in your <code>Profile</code> component:
      </p>

      <Markdown type="html" text={`
      <button className="btn btn-primary">
        Logout
      </button>
      `}/>

      <p>
        Convert this button to a React Router <code>Link</code> and have it point to <code>/logout</code>:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var Router = require('react-router');
        ...
          render: function() {
            ...
              <Router.Link className="btn btn-primary" to="/logout">
                Logout
              </Router.Link>
            ...
          }
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        import { Link } from 'react-router';
        ...
          render() {
            ...
              <Link className="btn btn-primary" to="/logout">
                Logout
              </Link>
            ...
          }
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        import { Link } from 'react-router';
        ...
          render() {
            ...
              <Link className="btn btn-primary" to="/logout">
                Logout
              </Link>
            ...
          }
        ...
        `}/>
      </CodeTabs>

      <p>
        With this change in place, clicking the Logout button will redirect you to <code>/login</code>, and once you log in, you'll be
        redirected to the main application.
      </p>


      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/authentication/step-1.png" />


      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/components/Logout.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var auth = require('../utils/auth');

        module.exports = React.createClass({
          displayName: 'Logout',

          propTypes: {
            router: React.PropTypes.object.isRequired
          },

          componentDidMount: function(){
            auth.deleteToken();
            this.props.router.push('/');
          },

          render: function() {
            return (
              <h1 className="loading-text">
                Logging out...
              </h1>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';
        import auth from '../utils/auth';

        class Logout extends Component {

          componentDidMount(){
            auth.deleteToken();
            this.props.router.push('/');
          }

          render() {
            return (
              <h1 className="loading-text">
                Logging out...
              </h1>
            );
          }
        }

        Logout.propTypes = {
          router: PropTypes.object.isRequired
        };

        export default Logout;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import auth from '../utils/auth';

        class Logout extends Component {

          static propTypes = {
            router: PropTypes.object.isRequired
          };

          componentDidMount(){
            auth.deleteToken();
            this.props.router.push('/');
          }

          render() {
            return (
              <h1 className="loading-text">
                Logging out...
              </h1>
            );
          }
        }

        export default Logout;
        `}/>
      </CodeTabs>

      <h3>
        src/components/routes.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var Route = require('react-router').Route;
        var IndexRoute = require('react-router').IndexRoute;
        var UserIsAuthenticated = require('./src/decorators/UserIsAuthenticated');

        /**
         * Routes
         */
        var Master = require('./src/components/Master');
        var Layout = require('./src/components/Layout');
        var Feed = require('./src/components/Feed');
        var Login = require('./src/components/Login');
        var Logout = require('./src/components/Logout');

        module.exports = (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route component={UserIsAuthenticated(Master)}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Feed} />
              </Route>
            </Route>
          </Route>
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import { Route, IndexRoute, Redirect } from 'react-router';
        import UserIsAuthenticated from './src/decorators/UserIsAuthenticated';

        /**
         * Routes
         */
        import Master from './src/components/Master';
        import Layout from './src/components/Layout';
        import Feed from './src/components/Feed';
        import Login from './src/components/Login';
        import Logout from './src/components/Logout';

        export default (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route component={UserIsAuthenticated(Master)}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Feed} />
              </Route>
            </Route>
          </Route>
        );
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import { Route, IndexRoute, Redirect } from 'react-router';
        import UserIsAuthenticated from './src/decorators/UserIsAuthenticated';

        /**
         * Routes
         */
        import Master from './src/components/Master';
        import Layout from './src/components/Layout';
        import Feed from './src/components/Feed';
        import Login from './src/components/Login';
        import Logout from './src/components/Logout';

        export default (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />

            <Route component={UserIsAuthenticated(Master)}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Feed} />
              </Route>
            </Route>
          </Route>
        );
        `}/>
      </CodeTabs>

      <h3>
        src/components/Profile.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var Router = require('react-router');

        module.exports = React.createClass({
          displayName: 'Profile',

          propTypes: {
            user: React.PropTypes.object.isRequired
          },

          getDefaultProps: function() {
            return {
              user: {
                id: 1,
                data: {
                  nickname: 'marle',
                  avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027074/a37105c0-88e1-11e6-9645-3e1af37671f7.png'
                }
              }
            }
          },

          render: function() {
            var user = this.props.user;

            return (
              <div className="card profile">
                <div className="card-block">
                  <img
                    className="img-circle avatar"
                    src={user.data.avatar} />
                  <h4 className="card-title">
                    Hi {user.data.nickname}!
                  </h4>
                  <div className="card-text">
                    <p>You have permission to perform the following:</p>
                    <ul className="permissions">
                      <li>Create Tweets</li>
                      <li>Edit your own tweets</li>
                      <li>Delete your own tweets</li>
                    </ul>
                  </div>
                  <Router.Link className="btn btn-primary" to="/logout">
                    Logout
                  </Router.Link>
                </div>
              </div>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';
        import { Link } from 'react-router';

        class Profile extends Component {

          render() {
            const user = this.props.user;

            return (
              <div className="card profile">
                <div className="card-block">
                  <img
                    className="img-circle avatar"
                    src={user.data.avatar} />
                  <h4 className="card-title">
                    Hi {user.data.nickname}!
                  </h4>
                  <div className="card-text">
                    <p>You have permission to perform the following:</p>
                    <ul className="permissions">
                      <li>Create Tweets</li>
                      <li>Edit your own tweets</li>
                      <li>Delete your own tweets</li>
                    </ul>
                  </div>
                  <Link className="btn btn-primary" to="/logout">
                    Logout
                  </Link>
                </div>
              </div>
            );
          }
        }

        Profile.propTypes = {
          user: PropTypes.object.isRequired
        };

        Profile.defaultProps = {
          user: {
            id: 1,
            data: {
              nickname: 'marle',
              avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027074/a37105c0-88e1-11e6-9645-3e1af37671f7.png'
            }
          }
        };

        export default Profile;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import { Link } from 'react-router';

        class Profile extends Component {

          static propTypes = {
            user: PropTypes.object.isRequired
          };

          static defaultProps = {
            user: {
              id: 1,
              data: {
                nickname: 'marle',
                avatar: 'https://cloud.githubusercontent.com/assets/2637399/19027074/a37105c0-88e1-11e6-9645-3e1af37671f7.png'
              }
            }
          };

          render() {
            const user = this.props.user;

            return (
              <div className="card profile">
                <div className="card-block">
                  <img
                    className="img-circle avatar"
                    src={user.data.avatar} />
                  <h4 className="card-title">
                    Hi {user.data.nickname}!
                  </h4>
                  <div className="card-text">
                    <p>You have permission to perform the following:</p>
                    <ul className="permissions">
                      <li>Create Tweets</li>
                      <li>Edit your own tweets</li>
                      <li>Delete your own tweets</li>
                    </ul>
                  </div>
                  <Link className="btn btn-primary" to="/logout">
                    Logout
                  </Link>
                </div>
              </div>
            );
          }
        }

        export default Profile;
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to <Link to="../step-6/">save the user in the application's context</Link>.
      </p>
    </Template>
  )
};
