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
        Step 4: Save the Token & Redirect on Login
      </h1>

      <p>
        In this step we're going to save the user token in local storage and redirect the user after a successful login.
      </p>

      <QuickstartBranch branch="authentication.4" />

      <h3>
        Save the Token
      </h3>
      <p>
        Open up the <code>Login</code> component. Import the <code>src/utils/auth</code> utility and update the <code>onAuthentication</code> callback to look
        like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import auth from '../utils/auth';
        ...
          onAuthentication: function(authResult) {
            auth.saveToken(authResult.idToken);
          },
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        import auth from '../utils/auth';
        ...
          onAuthentication(authResult) {
            auth.saveToken(authResult.idToken);
          }
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        import auth from '../utils/auth';
        ...
          onAuthentication(authResult) {
            auth.saveToken(authResult.idToken);
          }
        ...
        `}/>
      </CodeTabs>

      <p>
        With this change in place, whenever the user logs in we will save the idToken provided by Auth0 to localStorage.
      </p>

      <h3>
        Redirect the User
      </h3>
      <p>
        With the token saved to localStorage, we can now redirect the user back to the application, and (because the token
        now exists) it won't redirect us back. Update the <code>onAuthentication</code> method to look like this (router is provided as a
        prop by React Router):
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
          onAuthentication: function(authResult) {
            auth.saveToken(authResult.idToken);
            this.props.router.push('/');
          },
        `}/>
        <CodeTab syntax="ES6" text={`
          onAuthentication(authResult) {
            auth.saveToken(authResult.idToken);
            this.props.router.push('/');
          }
        `}/>
        <CodeTab syntax="ESNext" text={`
          onAuthentication(authResult) {
            auth.saveToken(authResult.idToken);
            this.props.router.push('/');
          }
        `}/>
      </CodeTabs>

      <p>
        Finally, add a <code>componentWillUnmount</code> method to hide the lock when the <code>Login</code> component is unmounted:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
          componentWillUnmount: function() {
            this.lock.hide();
          },
        `}/>
        <CodeTab syntax="ES6" text={`
          componentWillUnmount() {
            this.lock.hide();
          }
        `}/>
        <CodeTab syntax="ESNext" text={`
          componentWillUnmount() {
            this.lock.hide();
          }
        `}/>
      </CodeTabs>

      <p>
        With that change in place, refresh the browser and navigate to <code>/login</code>. Once you login in, the application will
        redirect you to the <code>/</code> route and transition the login dialog off the page. Pretty neat!
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

          getLock: function(){
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

          showLogin: function(){
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

          getLock(){
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

          showLogin(){
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

          getLock(){
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

          showLogin(){
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
        Next we're going to <Link to="../step-5/">add a logout route</Link>.
      </p>

    </Template>
  )
};
