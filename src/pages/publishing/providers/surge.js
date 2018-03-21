import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Publishing';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        Publishing to Surge
      </h1>
      <p>
        Instructions for publishing to <a href="https://surge.sh">Surge</a>.
      </p>

      <h3>
        Video Demonstration
      </h3>
      <p>
        This will be added in the future.
      </p>

      <h3>
        Install the Gulp Task
      </h3>
      <p>
        To publish your project to GitHub Pages first install the gulp task to do so:
      </p>

      <Markdown type="sh" text={`
      lore generate surge
      `}/>

      <p>
        This task will automatically install any dependencies and add them to the <code>devDependencies</code> in your
        <code>package.json</code>.
      </p>

      <h3>
        Publish Your Project
      </h3>
      <p>
        Next you'll need to run the gulp task to publish your project:
      </p>

      <Markdown type="sh" text={`
      gulp surge
      `}/>

      <p>
        This task will build your project for production and push your code to Surge. If you don't pass in a domain,
        Surge will generate a random one for you and you'll need to confirm it during the build. If you already have a
        domain in mind you want to use, you can pass that to the task and it will use it instead:
      </p>

      <Markdown type="sh" text={`
      gulp surge --domain=my-app.surge.sh
      `}/>
    </Template>
  )
};
