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
        Behavior: Overview
      </h1>

      <p>
        In this section we're going to fix the behavior of our application, so that new tweets we create
        are displayed immediately, and appear at the top of the Feed.
      </p>
      <p>
        At the end of this section your application will look like this:
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/dialogs/step-1.png" />

      <h2>
        Next Steps
      </h2>

      <p>
        Ready? Let's <Link to="../step-1/">get started</Link>!
      </p>
    </Template>
  )
};
