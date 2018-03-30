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
        Filtering: Overview
      </h1>

      <p>
        In this section we'll add support for filtering, and update the UI so you can view all tweets or just
        those you created.
      </p>

      <p>
        At the end of this section your application will look like this:
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/filtering/step-2.png" />

      <h2>
        Next Steps
      </h2>

      <p>
        Ready? Let's <Link to="../step-1/">get started</Link>!
      </p>
    </Template>
  )
};
