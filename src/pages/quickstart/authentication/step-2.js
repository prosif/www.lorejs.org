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
        Step 2: Add Login Page
      </h1>

      <p>
        In this step we're going to display a login experience.
      </p>

      <QuickstartBranch branch="authentication.2" />

      <h3>
        Install Auth0 Package
      </h3>
      <p>
        We're going to be using Auth0 as the authentication service for this quickstart. Run this command to install
        <code>auth0-js</code>, a library we'll be using to log in to the application:
      </p>

      <Markdown type="sh" text={`
      npm install auth0-js --save
      `}/>

      <h3>
        Add Auth0 Config
      </h3>
      <p>
        In order to use Auth0 as the authentication server, our application needs to know a few values:
      </p>

      <ol>
        <li>The URL (domain) of the authentication server</li>
        <li>The client ID of the application we want to authenticate with</li>
        <li>The URL the user should be redirected to after they login</li>
      </ol>

      <p>
        We're going to add these values to the lore config. But instead of adding them to existing config file,
        we're going to create a new config file just for Auth0.
      </p>

      <blockquote>
        <p>
          The /config folder in Lore is actually compiled into a single object, which you can access
          from <code>lore.config</code>. This means you can add your own files to the /config folder and access
          their values from <code>lore.config</code>. It also means you can change those values on a
          per-environment basis by redefining them in the <code>/env</code> directory.
        </p>
      </blockquote>

      <p>
        Create a new file in <code>/config</code> called <code>auth0.js</code> and paste in this content:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        // config/auth0.js
        export default {
          domain: 'lorejs.auth0.com',
          clientID: 'XFcYHKv1NXCVrbtSaf0JZPRLtYj5UZ7E',
          redirectUri: 'http://localhost:3000/auth/callback',
          audience: 'https://lorejs.auth0.com/userinfo',
          responseType: 'token id_token',
          scope: 'openid'
        };
        `}/>
        <CodeTab syntax="ES6" text={`
        // config/auth0.js
        export default {
          domain: 'lorejs.auth0.com',
          clientID: 'XFcYHKv1NXCVrbtSaf0JZPRLtYj5UZ7E',
          redirectUri: 'http://localhost:3000/auth/callback',
          audience: 'https://lorejs.auth0.com/userinfo',
          responseType: 'token id_token',
          scope: 'openid'
        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        // config/auth0.js
        export default {
          domain: 'lorejs.auth0.com',
          clientID: 'XFcYHKv1NXCVrbtSaf0JZPRLtYj5UZ7E',
          redirectUri: 'http://localhost:3000/auth/callback',
          audience: 'https://lorejs.auth0.com/userinfo',
          responseType: 'token id_token',
          scope: 'openid'
        }
        `}/>
      </CodeTabs>

      <p>
        You'll now be able to access these values from the <code>lore.config.auth0</code> object.
      </p>


      <h3>
        Create the Login Page
      </h3>
      <p>
        Next create a Login component we'll be using as the login page:
      </p>

      <Markdown type="sh" text={`
      lore generate component Login
      `}/>

      <p>
        This component will be responsible for redirecting the user to the Auth0 website to login:
      </p>

      <ol>
        <li>Show the Auth0 login dialog when the component is mounted to the page</li>
        <li>After successful login, save the user token (that Auth0 will provide) to localStorage</li>
        <li>Redirect the user to the homepage at the root route (/)</li>
      </ol>

      <p>
        For now, we're only going to focus on the first goal. Update your <code>Login</code> component to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import Auth0 from 'auth0-js';
        import ShowLoadingScreen from './ShowLoadingScreen';

        export default createReactClass({
          displayName: 'Login',

          componentDidMount: function() {
            const auth0 = new Auth0.WebAuth(lore.config.auth0);
            auth0.authorize();
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
        import Auth0 from 'auth0-js';
        import ShowLoadingScreen from './ShowLoadingScreen';

        export default class Login extends React.Component {

          componentDidMount() {
            const auth0 = new Auth0.WebAuth(lore.config.auth0);
            auth0.authorize();
          }

          render() {
            return (
              <ShowLoadingScreen/>
            );
          }

        };
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import Auth0 from 'auth0-js';
        import ShowLoadingScreen from './ShowLoadingScreen';

        export default class Login extends React.Component {

          componentDidMount() {
            const auth0 = new Auth0.WebAuth(lore.config.auth0);
            auth0.authorize();
          }

          render() {
            return (
              <ShowLoadingScreen/>
            );
          }

        };
        `}/>
      </CodeTabs>

      <p>
        When this component is mounted, we extract the <code>auth0</code> config object
        from <code>lore.config.auth0</code> and pass it to the <code>Auth0.WebAuth</code> function, which will
        automatically redirect the user to Auth0 when we call <code>auth0.authorize()</code>.
      </p>

      <h3>
        Create the /login route
      </h3>
      <p>
        Now that the component exists, let's create the corresponding route to display it. Import
        your <code>Login</code> component into <code>routes.js</code> and update the routes to look like this:
      </p>


      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        import Login from './src/components/Login';

        export default (
          <Route>
            <Route path="/login" component={Login} />

            <Route component={UserIsAuthenticated(Master)}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Feed} />
              </Route>
            </Route>
          </Route>
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
        import Login from './src/components/Login';

        export default (
          <Route>
            <Route path="/login" component={Login} />

            <Route component={UserIsAuthenticated(Master)}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Feed} />
              </Route>
            </Route>
          </Route>
        )
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
        import Login from './src/components/Login';

        export default (
          <Route>
            <Route path="/login" component={Login} />

            <Route component={UserIsAuthenticated(Master)}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Feed} />
              </Route>
            </Route>
          </Route>
        )
        `}/>
      </CodeTabs>

      <h3>
        Login as one of the Characters
      </h3>
      <p>
        With the routing done, let's test out our Login component. Navigate to <code>/login</code> and you should see
        a login dialog displayed on screen. While you can't create a new account, you <em>can</em> login as any of
        the characters below:
      </p>

      <ul>
        <li>ayla</li>
        <li>crono</li>
        <li>frog</li>
        <li>lucca</li>
        <li>magus</li>
        <li>marle</li>
        <li>robo</li>
      </ul>

      <p>
        The email format is <code>{"{name}@example.com"}</code>, and the password for all of them
        is <code>password</code>. So if you wanted to login as <code>marle</code>, you would
        enter <code>marle@example.com</code> for the email and <code>password</code> for the password.
      </p>

      <h3>
        Redirect Error after Login
      </h3>

      <p>
        After you login, you'll be taken back to the application, where you'll see the loading screen, but
        it won't ever go away. If you look at the developer console, you'll see an error that looks like this:
      </p>

      <Markdown text={`
      Warning: [react-router]
      Location "/auth/callback ... did not match any routes
      `}/>

      <p>
        This occurs because Auth0 tried to redirect us back to <code>http://localhost:3000/auth/callback</code>,
        but that route doesn't exist yet. We'll create it soon, but for now, navigate back to the homepage
        at <code>http://localhost:3000</code>.
      </p>


      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/authentication/step-2.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        config/auth0.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        export default {
          clientId: 'jiY0oBzEEpJuEX738eNl050YAJbPZjbh',
          domain: 'lorejs.auth0.com'
        };
        `}/>
        <CodeTab syntax="ES6" text={`
        export default {
          clientId: 'jiY0oBzEEpJuEX738eNl050YAJbPZjbh',
          domain: 'lorejs.auth0.com'
        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        export default {
          clientId: 'jiY0oBzEEpJuEX738eNl050YAJbPZjbh',
          domain: 'lorejs.auth0.com'
        }
        `}/>
      </CodeTabs>

      <h3>
        src/components/Login.js
      </h3>


      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import { Auth0Lock } from 'auth0-lock';

        export default createReactClass({
          displayName: 'Login',

          componentDidMount: function() {
            this.lock = this.getLock();
            this.showLogin();
          },

          getLock: function() {
            const {
              clientId,
              domain
            } = lore.config.auth0;

            return new Auth0Lock(clientId, domain, {
              auth: {
                redirect: false,
                sso: false
              },
              languageDictionary: {
                title: "Lore Quickstart"
              }
            });
          },

          onAuthentication: function(authResult) {
            // save user token to localStorage
          },

          showLogin: function() {
            this.lock.on('authenticated', this.onAuthentication);
            this.lock.show();
          },

          render: function() {
            return (
              <div/>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import Auth0Lock from 'auth0-lock';

        class Login extends React.Component {

          constructor(props) {
            super(props);

            // Bind your custom methods so you can access the expected 'this'
            this.getLock = this.getLock.bind(this);
            this.onAuthentication = this.onAuthentication.bind(this);
            this.showLogin = this.showLogin.bind(this);
          }

          componentDidMount() {
            this.lock = this.getLock();
            this.showLogin();
          }

          getLock() {
            const {
              clientId,
              domain
            } = lore.config.auth0;

            return new Auth0Lock(clientId, domain, {
              auth: {
                redirect: false,
                sso: false
              },
              languageDictionary: {
                title: "Lore Quickstart"
              }
            });
          }

          onAuthentication(authResult) {
            // save user token to localStorage
          }

          showLogin() {
            this.lock.on('authenticated', this.onAuthentication);
            this.lock.show();
          }

          render() {
            return (
              <div/>
            );
          }

        }

        Login.propTypes = {};

        export default Login;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import Auth0Lock from 'auth0-lock';

        class Login extends React.Component {

          constructor(props) {
            super(props);

            // Bind your custom methods so you can access the expected 'this'
            this.getLock = this.getLock.bind(this);
            this.onAuthentication = this.onAuthentication.bind(this);
            this.showLogin = this.showLogin.bind(this);
          }

          componentDidMount() {
            this.lock = this.getLock();
            this.showLogin();
          }

          getLock() {
            const {
              clientId,
              domain
            } = lore.config.auth0;

            return new Auth0Lock(clientId, domain, {
              auth: {
                redirect: false,
                sso: false
              },
              languageDictionary: {
                title: "Lore Quickstart"
              }
            });
          }

          onAuthentication(authResult) {
            // save user token to localStorage
          }

          showLogin() {
            this.lock.on('authenticated', this.onAuthentication);
            this.lock.show();
          }

          render() {
            return (
              <div/>
            );
          }

        }

        export default Login;
        `}/>
      </CodeTabs>

      <h3>
        routes.js
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

        export default (
          <Route>
            <Route path="/login" component={Login} />

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

        export default (
          <Route>
            <Route path="/login" component={Login} />

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

        export default (
          <Route>
            <Route path="/login" component={Login} />

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
        Next Steps
      </h3>

      <p>
        Next we're going to <Link to="../step-3/">redirect the user to login page</Link> if they aren't logged in.
      </p>

    </Template>
  )
};
