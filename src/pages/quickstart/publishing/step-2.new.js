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
        Step 2: Deploy to Production
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
        The Deploy Host
      </h3>
      <p>
        We'll be deploying our project to <a href="https://zeit.co/now">Now</a>, which is a hosting service provided
        by <a href="https://zeit.co/now">zeit.co</a>.
      </p>
      <p>
        This particular service is being used for several reasons:
      </p>
      <ul>
        <li>
          Very easy deploy process
        </li>
        <li>
          Free SSL certificates for custom domains
        </li>
        <li>
          Zero-downtime deploys
        </li>
        <li>
          Ability to roll-back to previous deploys
        </li>
        <li>
          Useful web dashboard
        </li>
      </ul>

      <h3>
        Create Account
      </h3>
      <p>
        To create an account, first install the Now CLI by running this command:
      </p>
      <Markdown type="jsx" text={`
      npm install -g now
      `}/>

      <p>
        Next, deploy the <code>/dist</code> folder to Now by running this command:
      </p>
      <Markdown type="jsx" text={`
      npm run deploy:production
      `}/>

      <blockquote>
        <p>
          This command runs a special command to build the app for production, copy over a special package.json
          file that Now will need, and then publish the app to Now.
        </p>
      </blockquote>

      <p>
        If you don't have any account with Now, then it will prompt you to create one, and you will see a screen
        like this:
      </p>

      <Markdown type="jsx" text={`
      No existing credentials found. Please log in:
      [email address]

      We sent an email to [email address]. Please follow the steps provided
      inside it and make sure the security code matches Proud Galapagos Penguin.
      `}/>

      <p>
        Check your email, and you see one shortly with a link. Click the link, and Now will verify your identity,
        and the CLI will finish logging you in and deploying your application.
      </p>

      <Markdown type="jsx" text={`
      ./node_modules/.bin/now list

      No existing credentials found. Please log in:
      jason_hansen@outlook.com

      We sent an email to jason_hansen@outlook.com. Please follow the steps provided
      inside it and make sure the security code matches Proud Galapagos Penguin.

      ✔ Email confirmed
      ✔ Fetched your personal details
      > Ready! Authentication token and personal details saved in "~/.now"

      now alias https://my-web-app-avvuiuuwto.now.sh my-web-app.com

      After signup, click email, and then see this screen:

      https://zeit.co/notifications/email-confirmed
      `}/>

      <p>
        Now will assign your application a unique URL that looks like <code>lore-quickstart-zdwepyrdkj.now.sh</code>.
      </p>
      <p>
        If you navigate to that URL, you'll be able to login, but you'll notice the application redirects you
        to <code>localhost:3000/auth/callback</code>, but we need it to redirect us
        to <code>lore-quickstart-zdwepyrdkj.now.sh</code>.
      </p>

      <p>
        Every time you deploy to Now, it's going to give your application a unique URL, but we need a dependable
        URL like <code>lore-quickstart.now.sh</code>. You can do that by creating an <code>alias</code>.
      </p>
      <p>
        Now this command to generate an alias, after choosing one you like (and that is hopefully available).
      </p>
      <Markdown type="jsx" text={`
      now alias lore-quickstart-zdwepyrdkj.now.sh lore-quickstart.now.sh
      `}/>
      <p>
        If the alias you selected is available, you'll see this notice
      </p>
      <Markdown type="jsx" text={`
      SOMETHING HAPPENS
      `}/>

      <h1>
        Test
      </h1>

      <h3>
        Choosing a Production Host
      </h3>
      <p>
        There are a number of popular options for serving static content, with two popular ones being <a href="http://surge.sh">Surge</a>
        and <a href="https://pages.github.com">GitHub Pages</a>. Not all options have similar feature sets though, and you can see a
        comparison between Surge and GitHub Pages in the "Feature Comparison" video <Link to="/publishing/">at this link</Link>.
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
        Before you can publish to Surge, you'll first need to install the surge client. Run this command from the
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
        If you already have an account, just enter your email and password when prompted. If you <em>don't</em> have
        an account, entering your email and password will <em>create</em> an account. The final experience should
        look like this:
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
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should still look like this (exactly the same).
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
        In the next section we'll <Link to="../step-3/">publish the application to the web</Link>.
      </p>
    </Template>
  )
};
