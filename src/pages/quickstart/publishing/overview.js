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
        At the end of this section your application will look like this (visually identical) but will be running on a real
        web server hosted by <a href="http://surge.sh">surge.sh</a>:
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/filtering/step-1.png" />

      <blockquote>
        <p>
          <strong>Environment-specific Configurations</strong>
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
      </blockquote>

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

      <h2>
        Next Steps
      </h2>

      <p>
        Ready? Let's <Link to="../step-1/">get started</Link>!
      </p>
    </Template>
  )
};
