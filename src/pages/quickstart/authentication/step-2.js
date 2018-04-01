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
        Step 2: Add Auth0 Config
      </h1>

      <p>
        In this step we're going to configure <a href="https://auth0.com/">Auth0</a>, which we'll be using as
        the authentication service for this Quickstart.
      </p>

      <QuickstartBranch branch="authentication.2" />

      <h3>
        Install Auth0 Package
      </h3>
      <p>
        Run this command to install <code>auth0-js</code>, a library we'll be using to manage the authentication
        flow for our application.
      </p>

      <Markdown type="sh" text={`
      npm install auth0-js --save
      `}/>

      <h3>
        Add Auth0 Config
      </h3>
      <p>
        In order to use Auth0 as the authentication server, our application needs to know a few things first:
      </p>

      <ol>
        <li>The domain where the authentication server is located</li>
        <li>The client ID for the application we want to authenticate against</li>
        <li>The URL the user should be redirected to after they login</li>
      </ol>

      <p>
        We're going to add these values to the project configuration, but instead of adding them to an existing
        config file, we're going to create a new one just for Auth0.
      </p>

      <blockquote>
        <p>
          The <code>/config</code> folder in Lore is actually compiled into a single object, which you can access
          from <code>lore.config</code>. This means you can add your own files to the <code>/config</code> folder
          and access their values from <code>lore.config</code>.
        </p>
        <p>
          It also means you can change the values in your custom config files on a per-environment basis as well,
          simply by redefining them in the appropriate environment-specific config file in
          the <code>/env</code> directory.
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
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this. Exactly the same : )
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
          domain: 'lorejs.auth0.com',
          clientID: 'XFcYHKv1NXCVrbtSaf0JZPRLtYj5UZ7E',
          redirectUri: 'http://localhost:3000/auth/callback',
          audience: 'https://lorejs.auth0.com/userinfo',
          responseType: 'token id_token',
          scope: 'openid'
        };
        `}/>
        <CodeTab syntax="ES6" text={`
        export default {
          domain: 'lorejs.auth0.com',
          clientID: 'XFcYHKv1NXCVrbtSaf0JZPRLtYj5UZ7E',
          redirectUri: 'http://localhost:3000/auth/callback',
          audience: 'https://lorejs.auth0.com/userinfo',
          responseType: 'token id_token',
          scope: 'openid'
        };
        `}/>
        <CodeTab syntax="ESNext" text={`
        export default {
          domain: 'lorejs.auth0.com',
          clientID: 'XFcYHKv1NXCVrbtSaf0JZPRLtYj5UZ7E',
          redirectUri: 'http://localhost:3000/auth/callback',
          audience: 'https://lorejs.auth0.com/userinfo',
          responseType: 'token id_token',
          scope: 'openid'
        };
        `}/>
      </CodeTabs>

      <h3>
        Next Steps
      </h3>

      <p>
        Next we're going to <Link to="../step-3/">add a login experience</Link>.
      </p>

    </Template>
  )
};
