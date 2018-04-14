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
        real web server hosted by <a href="https://zeit.co/now">Now</a>:
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
