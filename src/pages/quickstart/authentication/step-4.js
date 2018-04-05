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
        Step 4: Redirect to Login
      </h1>

      <p>
        In this step we're going to redirect the user to the <code>/login</code> route if they aren't authenticated.
      </p>

      <QuickstartBranch branch="authentication.4" />

      <h3>
        Local Storage & User Tokens
      </h3>
      <p>
        While our API does not currently require the user be authenticated, we will be replacing it with a real API
        later that will. That API is going to require users to be authenticated before they can create, update or
        delete tweets.
      </p>
      <p>
        In order to authenticate the user, we will need to send an authentication token in the header of every
        API request. The token that we will be sending will be provided to us by Auth0 when the user logs in.
      </p>
      <p>
        Additionally, in order to prevent requiring the user from needing to login every time they refresh the
        page (or navigate away from the site), we are also going to store this token in the browser's localStorage,
        and only redirect the user to the login page if they have no token.
      </p>

      <h3>
        Auth Utility
      </h3>
      <p>
        If you look inside <code>src/utils</code> you'll find a file called <code>auth.js</code> that contains some
        helper methods for saving and retrieving a user token from localStorage. For example, when the application
        loads, we're going to check if a <code>userToken</code> exists in localStorage by
        calling <code>auth.hasToken()</code>. And once we do have a token, we'll be able to save it
        to <code>localStorage</code> by calling <code>auth.saveToken(token)</code>.
      </p>

      <h3>
        Redirecting the User
      </h3>
      <p>
        Open up <code>routes.js</code> and find the route that renders the <code>Master</code> component. It should
        look like this:
      </p>

      <Markdown text={`
        <Route component={UserIsAuthenticated(Master)}>
          ...
        </Route>
        `}/>

      <p>
        The <code>UserIsAuthenticated()</code> function that wraps <code>Master</code> is a higher order component that
        can block access to the application if the user isn't authenticated. Currently this component isn't doing
        anything because the blocking behavior is turned off. Let's turn it on.
      </p>

      <p>
        Open up <code>src/decorators/UserIsAuthenticated.js</code> and take a look at
        the <code>isAuthenticated()</code> method:
      </p>

      <Markdown type="jsx" text={`
      import PropTypes from 'prop-types';
      import AuthenticationGenerator from './_common/AuthenticationGenerator';

      export default AuthenticationGenerator({

        propTypes: {
          router: PropTypes.object.isRequired
        },

        redirect() {
          const { router } = this.props;
          router.push('/login');
        },

        isAuthenticated() {
          return true;
        }

      });
      `}/>

      <p>
        This <code>isAuthenticated()</code> method gets called when the route is rendered, and is responsible for
        determining whether or not the user is logged in. Since this function currently returns <code>true</code>,
        the application never redirects the user to <code>/login</code> (the default redirect url).
      </p>

      <p>
        To get the behavior we want, import <code>src/utils/auth.js</code> into this decorator and update
        the <code>isAuthenticated()</code> method to look like this:
      </p>


      <Markdown type="jsx" text={`
      import auth from '../utils/auth';
      ...
        isAuthenticated: function() {
          return auth.hasToken();
        }
      ...
      `}/>

      <p>
        With that change in place, if you now try to navigate to root route (such
        as <code>https://localhost:3000</code>) the application will automatically redirect you to <code>/login</code>.
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
        src/decorators/UserIsAuthenticated.js
      </h3>

      <Markdown type="jsx" text={`
      import PropTypes from 'prop-types';
      import AuthenticationGenerator from './_common/AuthenticationGenerator';
      import auth from '../utils/auth';

      export default AuthenticationGenerator({

        propTypes: {
          router: PropTypes.object.isRequired
        },

        redirect() {
          const { router } = this.props;
          router.push('/login');
        },

        isAuthenticated() {
          return auth.hasToken();
        }

      });
      `}/>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to <Link to="../step-5/">add a callback route and save the token</Link>.
      </p>
    </Template>
  );
};
