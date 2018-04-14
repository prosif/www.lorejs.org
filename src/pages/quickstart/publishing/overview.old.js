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
        Publishing: Overview
      </h1>

      <p>
        In this section we'll be create a production build of our application and publish it to the web.
      </p>

      <p>
        At the end of this section your application will look like this (visually identical) but will be running on a
        real web server hosted by <a href="https://zeit.co/now">now.sh</a>:
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/filtering/step-1.png" />

      <p>
        <strong>Environment-specific Configurations</strong>
      </p>
      <p>
        If you look inside the <code>/config</code> folder, you'll another folder named <code>/env</code>.
      </p>
      <p>
        Lore is designed to support multiple environments. The files in <code>/config</code> are meant to be your
        defaults, the settings that make most sense in development. But at some point you're going to need to
        publish your application to other environments like <strong>staging</strong> and <strong>production</strong>,
        and those environments will need different settings. A different API, different feature flags, different
        rules about error reporting. The <code>/env</code> folder is where you set them.
      </p>
      <p>
        To illustrate, open <code>config/env/production.js</code>. If you ignore the comments, the file is empty,
        and looks like this:
      </p>
      <Markdown type="jsx" text={`
      export default {

      }
      `}/>

      <p>
        During the build process, the <code>/config</code> folder is compiled into a single object, and made
        accessible through <code>lore.config</code>. Values you specify in the relevant file
        in <code>config/env</code> will <em>override</em> those settings.
      </p>

      
      <p>
        It also means you can change the values in your custom config files on a per-environment basis as well,
        simply by redefining them in the appropriate environment-specific config file in
        the <code>/env</code> directory.
      </p>

      <p>
        You may notice a <code>/env</code> folder in <code>/config</code> that contains files
        called <code>development.js</code> and <code>production.js</code>. These files allow you to customize the
        config on a per-environment basis.
      </p>
      <p>
        For example, when deploying to <code>production</code>, the final configuration will be all of the
        files located in <code>/config</code>, overridden by any settings you've specified
        in <code>/config/production.js</code>.
      </p>
      <p>
        The <code>/config/local.js</code> file <strong>ONLY</strong> applies to your local environment, and is
        included in the <code>.gitignore</code> by default so that it will never be checked in.
      </p>

      <blockquote>
        <p>
          The <code>/config</code> folder in Lore is compiled into a single object, which you can access
          from <code>lore.config</code>. This means you can add your own files to the <code>/config</code> folder
          and access their values from <code>lore.config</code>.
        </p>
        <p>
          It also means you can change the values in your custom config files on a per-environment basis as well,
          simply by redefining them in the appropriate environment-specific config file in
          the <code>/env</code> directory.
        </p>
      </blockquote>

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

      <h2>
        Next Steps
      </h2>

      <p>
        Ready? Let's <Link to="../step-1/">get started</Link>!
      </p>
    </Template>
  )
};
