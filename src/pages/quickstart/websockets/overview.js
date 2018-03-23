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
        Websockets: Overview
      </h1>

      <p>
        In this section we'll add support for WebSockets, which will enable real-time communication for our
        application; changes will be displayed across browsers withou the need for users to refresh the page to
        see changes made by other users.
      </p>

      <p>
        At the end of this section your application will look like this (visually identical):
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/filtering/step-1.png" />

      <h2>
        Next Steps
      </h2>

      <p>
        Ready? Let's <Link to="../step-1/">get started</Link>!
      </p>
    </Template>
  )
};
