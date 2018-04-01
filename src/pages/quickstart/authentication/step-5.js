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
        Step 5: Add Callback Route
      </h1>

      <p>
        In this step we're going to add the redirect route that Auth0 needs, so that we can accept the user token
        and log the user into the application.
      </p>

      <QuickstartBranch branch="authentication.5" />

      <h3>
        Auth0 Callback
      </h3>
      <p>
        After you login, Auth0 redirects you to the URL <code>https://localhost:300/auth/callback</code>, but
        more importantly, it includes a number of important query parameters that look like this:
      </p>
      <Markdown text={`
        access_token=...&expires_in=...&token_type=...&state=...&id_token=...
      `}/>

      <p>
        What we need to do next is build a component that can extract the JWT token we need from those query
        parameters, and log the user into the application.
      </p>

      <h3>
        Create the AuthCallback Component
      </h3>
      <p>
        To do that, we're going to create a component called <code>AuthCallback</code>:
      </p>

      <Markdown type="sh" text={`
      lore generate component AuthCallback
      `}/>

      <p>
        Update the <code>AuthCallback</code> component to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import Auth0 from 'auth0-js';
        import ShowLoadingScreen from './ShowLoadingScreen';
        import auth from '../utils/auth';

        export default createReactClass({
          displayName: 'AuthCallback',

          propTypes: {
            router: PropTypes.object.isRequired
          },

          componentDidMount: function() {
            const { router } = this.props;
            const auth0 = new Auth0.WebAuth(lore.config.auth0);

            auth0.parseHash((err, authResult) => {
              if (authResult && authResult.accessToken && authResult.idToken) {
                auth.saveToken(authResult.idToken);
                router.push('/');
              } else if (err) {
                console.log(err);
                alert('An error occurred. See the console for more information.');
              }
            });
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
        import Auth0 from 'auth0-js';
        import ShowLoadingScreen from './ShowLoadingScreen';
        import auth from '../utils/auth';

        class AuthCallback extends React.Component {

          componentDidMount() {
            const { router } = this.props;
            const auth0 = new Auth0.WebAuth(lore.config.auth0);

            auth0.parseHash((err, authResult) => {
              if (authResult && authResult.accessToken && authResult.idToken) {
                auth.saveToken(authResult.idToken);
                router.push('/');
              } else if (err) {
                console.log(err);
                alert('An error occurred. See the console for more information.');
              }
            });
          }

          render() {
            return (
              <ShowLoadingScreen/>
            );
          }

        };

        AuthCallback.propTypes = {
          router: PropTypes.object.isRequired
        };

        export default AuthCallback;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import Auth0 from 'auth0-js';
        import ShowLoadingScreen from './ShowLoadingScreen';
        import auth from '../utils/auth';

        export default class AuthCallback extends React.Component {

          static propTypes = {
            router: PropTypes.object.isRequired
          };

          componentDidMount() {
            const { router } = this.props;
            const auth0 = new Auth0.WebAuth(lore.config.auth0);

            auth0.parseHash((err, authResult) => {
              if (authResult && authResult.accessToken && authResult.idToken) {
                auth.saveToken(authResult.idToken);
                router.push('/');
              } else if (err) {
                console.log(err);
                alert('An error occurred. See the console for more information.');
              }
            });
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
        When this component gets mounted, we're going to once again create the <code>Auth0.WebAuth</code> object
        and provide it with our <code>auth0</code> config at <code>lore.config.auth0</code>. Then we're going
        to call <code>auth0.parseHash()</code>, which will extract the query parameters we need from the callback,
        and provide them through an object called <code>authResult</code>.
      </p>
      <p>
        If all the query parameters we need exist, then we'll save the <code>idToken</code> to localStorage
        using our <code>auth.saveToken()</code> helper. After that, we'll redirect the user to the home route
        at <code>/</code>.
      </p>

      <h3>
        Create the /auth/callback route
      </h3>
      <p>
        Now that the component exists, let's create the corresponding route to display it. Import
        your <code>AuthCallback</code> component into <code>routes.js</code> and update the routes to look like this:
      </p>


      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        import AuthCallback from './src/components/AuthCallback';

        export default (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/auth/callback" component={AuthCallback} />

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
        import AuthCallback from './src/components/AuthCallback';

        export default (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/auth/callback" component={AuthCallback} />

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
        import AuthCallback from './src/components/AuthCallback';

        export default (
          <Route>
            <Route path="/login" component={Login} />
            <Route path="/auth/callback" component={AuthCallback} />

            <Route component={UserIsAuthenticated(Master)}>
              <Route path="/" component={Layout}>
                <IndexRoute component={Feed} />
              </Route>
            </Route>
          </Route>
        )
        `}/>
      </CodeTabs>

      <p>
        With that change in place, refresh the browser and navigate to <code>/login</code>. Once you log in, Auth0
        will redirect you to the <code>/auth/callback</code> route, which will store the token we need, and redirect
        you back to the home route.
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
        src/components/Login.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import { Auth0Lock } from 'auth0-lock';
        import auth from '../utils/auth';

        export default createReactClass({
          displayName: 'Login',

          componentDidMount: function() {
            this.lock = this.getLock();
            this.showLogin();
          },

          componentWillUnmount: function() {
            this.lock.hide();
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
            auth.saveToken(authResult.idToken);
            this.props.router.push('/');
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
        import auth from '../utils/auth';

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

          componentWillUnmount() {
            this.lock.hide();
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
            auth.saveToken(authResult.idToken);
            this.props.router.push('/');
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

        Login.propTypes = {
          router: PropTypes.object.isRequired
        };

        export default Login;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import Auth0Lock from 'auth0-lock';
        import auth from '../utils/auth';

        class Login extends React.Component {

          static propTypes = {
            router: PropTypes.object.isRequired
          };

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

          componentWillUnmount() {
            this.lock.hide();
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
            auth.saveToken(authResult.idToken);
            this.props.router.push('/');
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

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to <Link to="../step-6/">add a logout route</Link>.
      </p>

    </Template>
  )
};
