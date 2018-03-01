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
        Fetching Data: Overview
      </h1>

      <p>
        In this section we'll be replacing our mock data with real data fetched from the API. At the end of this section
        your application will look like this:
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/fetching/step-5.png" />


      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to <Link to="../step-1/">tell Lore where our API server is located</Link>.
      </p>
    </Template>
  )
};