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
        Next Steps
      </h1>

      <p>
        Congratulations! You've reached the end of the Quickstart. One of the challenges with using a somewhat realistic
        application for a walkthrough is that you get some realistic challenges that pop up during the course of building
        it. I want to call out some of these challenges now, partly just to recognize they exist, and partly to discuss a
        solution (which will be added as another section at a later date).
      </p>

      <h3>
        What about real-time, e.g. WebSockets?
      </h3>
      <p>
        WebSockets is absolutely a focus area for Lore, and beta support is already integrated, which you can see in the
        <a href="https://github.com/lore/lore/tree/master/examples/websockets">websockets example</a> if you're curious. In time the
        Quickstart be expanded to demonstrate it as well. But for now, it lives "behind the scenes" until some higher priority
        features are finished (like an elegant solution for creating forms and handling form validation).
      </p>

      <h2>
        That's all for now
      </h2>
      <p>
        That's all for now. If you have any questions, issues, features requests, ideas to improve the user experience, or
        just want additional thoughts about how to solve a front-end challenge with Lore, don't hesitate to
        <a href="https://github.com/lore/lore/issues">submit an issue</a> with your thoughts!
      </p>

    </Template>
  )
};
