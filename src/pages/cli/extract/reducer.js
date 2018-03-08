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
        extract reducer
      </h1>
      <p>
        CLI command to add an <Link to="/architecture/actions/">Action</Link> to your project.
      </p>

      <h3>
        Usage
      </h3>

      <Markdown text={`
      lore extract reducer [action-name]
      `}/>
    </Template>
  )
};
