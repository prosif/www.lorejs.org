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
        Optimistic Updates: Overview
      </h1>

      <p>
        In this section we'll update our application to display new tweets at the top of the feed, and highlight
        some of the challenges we need to think about when performing optimistic updates (displaying data to
        the user before the server has confirmed the desired create, update or delete action).
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
