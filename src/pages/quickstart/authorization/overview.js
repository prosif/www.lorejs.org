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
        Authorization: Overview
      </h1>

      <p>
        In this section we'll learn how to hide components the user doesn't have permission to view or interact with. At the
        end of this section your application will look like this:
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/authorization/step-2.png" />

      <h2>
        Next Steps
      </h2>

      <p>
        Ready? Let's <Link to="../step-1/">get started</Link>!
      </p>
    </Template>
  )
};
