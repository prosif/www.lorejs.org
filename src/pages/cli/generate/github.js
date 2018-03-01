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
        generate github
      </h1>
      <p>
        CLI command to generate a Gulp task for publishing your project to GitHub Pages.
      </p>

      <p>
        Details about this process can be found in
        the <Link to="/features/foundation/publishing/github-pages/">docs for publishing to GitHub Pages</Link>.
      </p>
    </Template>
  )
};
