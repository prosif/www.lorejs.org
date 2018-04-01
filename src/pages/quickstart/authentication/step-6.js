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
        Step 6: Add Logout Page
      </h1>

      <p>
        In this step we're going to add a logout experience.
      </p>

      <QuickstartBranch branch="authentication.6" />

      <h3>
        Create the Logout Component
      </h3>
      <p>
        While we don't have a "logout page" in a visual sense, we still have behavior that we want executed when
        the user logs out, such as removing their user token and redirecting them to the login page. We're going
        to store this behavior in a component so that we can have it occur when the user navigates to
        the <code>/logout</code> route.
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
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import auth from '../utils/auth';
        import ShowLoadingScreen from './ShowLoadingScreen';

        export default createReactClass({
          displayName: 'Logout',

          propTypes: {
            router: PropTypes.object.isRequired
          },

          componentDidMount: function() {
            const { router } = this.props;

            auth.deleteToken();
            router.push('/');
          },

          render: function() {
            return (
              <ShowLoadingScreen/>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import auth from '../utils/auth';
        import ShowLoadingScreen from './ShowLoadingScreen';

        class Logout extends React.Component {

          componentDidMount() {
            const { router } = this.props;

            auth.deleteToken();
            router.push('/');
          },

          render() {
            return (
              <ShowLoadingScreen/>
            );
          }

        };

        Logout.propTypes = {
          router: PropTypes.object.isRequired
        };

        export default Logout;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import auth from '../utils/auth';
        import ShowLoadingScreen from './ShowLoadingScreen';

        export default class Logout extends React.Component {

          static propTypes = {
            router: PropTypes.object.isRequired
          };

          componentDidMount() {
            const { router } = this.props;

            auth.deleteToken();
            router.push('/');
          },

          render() {
            return (
              <ShowLoadingScreen/>
            );
          }

        };
        `}/>
      </CodeTabs>

      <h3>
        Add the /logout route
      </h3>
      <p>
        Next import your <code>Logout</code> component into <code>routes.js</code> and update the routes to
        look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        import Logout from './src/components/Logout';

        export default (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth/callback" component={AuthCallback} />

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
            <Route path="/auth/callback" component={AuthCallback} />

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
            <Route path="/auth/callback" component={AuthCallback} />

            ...
          </Route>
        )
        `}/>
      </CodeTabs>

      <h3>
        Convert Logout Button to Link
      </h3>
      <p>
        Finally, we need to make it so that when the user clicks the <code>Logout</code> button in
        the <code>Profile</code> component they are redirected to the <code>/logout</code> route, which will
        delete their user token and redirect them to the login page.
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
        import { Link } from 'react-router';
        ...
          render: function() {
            ...
              <Link className="btn btn-primary" to="/logout">
                Logout
              </Link>
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
        With this change in place, clicking the Logout button will redirect you to <code>/logout</code>, and once
        you log in, you'll be redirected to the main application.
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
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import auth from '../utils/auth';

        export default createReactClass({
          displayName: 'Logout',

          propTypes: {
            router: PropTypes.object.isRequired
          },

          componentDidMount: function() {
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
        import React from 'react';
        import PropTypes from 'prop-types';
        import auth from '../utils/auth';

        class Logout extends React.Component {

          componentDidMount() {
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
        import React from 'react';
        import PropTypes from 'prop-types';
        import auth from '../utils/auth';

        class Logout extends React.Component {

          static propTypes = {
            router: PropTypes.object.isRequired
          };

          componentDidMount() {
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
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import { Link } from 'react-router';

        export default createReactClass({
          displayName: 'Profile',

          propTypes: {
            user: PropTypes.object.isRequired
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
            const { user } = this.props;

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

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { Link } from 'react-router';

        class Profile extends React.Component {

          render() {
            const { user } = this.props;

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
        import React from 'react';
        import PropTypes from 'prop-types';
        import { Link } from 'react-router';

        class Profile extends React.Component {

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
            const { user } = this.props;

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
        Next we're going to <Link to="../step-7/">add an endpoint to the mock API that we can use to retrieve
        the current user</Link>.
      </p>
    </Template>
  )
};
