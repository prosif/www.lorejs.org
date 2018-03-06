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
        Step 2: Publish the Application
      </h1>

      <p>
        In this step we'll publish our production build to the web.
      </p>

      <blockquote>
        <p>
          There is no branch for this step because it does not modify any code.
        </p>
      </blockquote>

      <h3>
        Choosing a Production Host
      </h3>
      <p>
        There are a number of popular options for serving static content, with two popular ones being <Link to="http://surge.sh">Surge</Link>
        and <Link to="https://pages.github.com">GitHub Pages</Link>. Not all options have similar feature sets though, and you can see a
        comparison between Surge and GitHub Pages in the "Feature Comparison" video <Link to="/features/foundation/publishing/">at this link</Link>.
      </p>

      <p>
        For this example we're going to publishing out application to Surge, because:
      </p>

      <ul>
        <li>The process is incredibly simple</li>
        <li>It supports push state routing</li>
        <li>It provides custom domain support for free</li>
        <li>It allows you to secure custom domains with SSL</li>
        <li>It allows you to password protect your site, which can be useful when developing a project for a client</li>
      </ul>

      <h3>
        Install Surge & Login
      </h3>
      <p>
        Before you can publish to Surge, you'll first need to downloading the surge client. Run this command from the
        command line:
      </p>

      <Markdown type="sh" text={`
      npm install -g surge
      `}/>

      <p>
        Once the surge client is installed, run this command to login:
      </p>

      <Markdown type="sh" text={`
      surge login
      `}/>

      <p>
        If you already have an account, just enter your email and password when prompted. If you *don't* have an account,
        entering your email and password will *create* an account. The final experience should look like this:
      </p>

      <Markdown type="sh" text={`
        Welcome to Surge! (surge.sh)
        Please login or create an account by entering your email and password:

                  email: xyz@example.com
               password: ********

        Logged in as xyz@example.com.
      `}/>

      <h3>
        Publish the Application
      </h3>
      <p>
        Now that you're logged into surge, you can publish your application by running this command:
      </p>

      <Markdown type="sh" text={`
      surge dist
      `}/>

      <p>
        Once you do, surge will ask you to confirm your intent, and suggest a random subdomain name to publish your application
        to. If you like the domain, just hit enter to accept it, otherwise you can modify the subdomain to something like
        <code>lore-quickstart.surge.sh</code>:
      </p>

      <Markdown type="sh" text={`
        Surge - surge.sh

                  email: xyz@example.com
                  token: *****************
           project path: dist
                   size: 16 files, 15.8 MB
                 domain: lore-quickstart.surge.sh
      `}/>

      <p>
        Once you accept or modify the domain name, the publishing process will finish, and the final output will look like this:
      </p>

      <Markdown type="sh" text={`
          Surge - surge.sh

                    email: xyz@example.com
                    token: *****************
             project path: dist
                     size: 16 files, 15.8 MB
                   domain: lore-quickstart.surge.sh
                   upload: [====================] 100%, eta: 0.0s
         propagate on CDN: [====================] 100%
                     plan: Free
                    users: xyz@example.com
               IP Address: 45.55.110.124

          Success! Project is published and running at lore-quickstart.surge.sh
      `}/>

      <p>
        Finally, navigate to the domain your project was published to (like <code>lore-quickstart.surge.sh</code>), and
        you should see it load up in the browser.
      </p>

      <p>
        As a shortcut, if you know the name of the domain you want to publish to, you can enter it as part of the
        surge command like <code>surge dist lore-quickstart.surge.sh</code> and skip the prompt.
      </p>


      <h3>
        Modifying the Production Config API Server
      </h3>
      <p>
        It's important to highlight that if you look at the network requests for the application running on surge, you'll
        notice it's still making API calls to <code>localhost:1337</code>. This is important to callout because it means the application
        will ONLY work for YOU, while the <code>lore-tutorial-api</code> server is running.
      </p>

      <p>
        If you're deploying the application to production for real, it's likely using a different API server, and you'll
        want the production version of the application to behave different that when running on localhost for development.
      </p>

      <p>
        To do that, open up <code>config/env/production.js</code> and set the production server for the default
        connection. For example, let's say the production API server is located at <code>https://api.example.com</code>.
        To set that for the production build, edit your <code>production.js</code> config to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        export default {

          connections: {
            default: {
              apiRoot: 'https://api.example.com'
            }
          }

        };
        `}/>
        <CodeTab syntax="ES6" text={`
        export default {

          connections: {
            default: {
              apiRoot: 'https://api.example.com'
            }
          }

        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        export default {

          connections: {
            default: {
              apiRoot: 'https://api.example.com'
            }
          }

        }
        `}/>
      </CodeTabs>

      <p>
        With that change in place, if you run <code>npm run build:prod</code> to rebuild the application, and then
        redeploy it to surge using the shortcut command (like <code>surge dist lore-quickstart.surge.sh</code>),
        you'll see the application will automatically change with API server it tries to communicate with, but only
        in production. When running on localhost for development the API server used will still
        be <code>localhost:1337</code>.
      </p>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should still look like this (exactly the same) but will now be hosted on
        Surge and built for production!
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/filtering/step-1.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        There are no code changes required for this step.
      </p>

      <h2>
        Next Steps
      </h2>

      <p>
        In the next section <Link to="../../next-steps/overview/">we'll talk about next steps</Link>.
      </p>
    </Template>
  )
};
