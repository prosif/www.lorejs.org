import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/CLI';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        generate surge
      </h1>
      <p>
        CLI command to generate a Gulp task for publishing your project to Surge.
      </p>

      <p>
        Details about this process can be found in
        the <Link to="/publishing/providers/surge/">docs for publishing to Surge</Link>.
      </p>
    </Template>
  )
};
