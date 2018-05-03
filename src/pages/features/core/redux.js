import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Features';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        Redux
      </h1>
      <p>
        Lore uses <a href="https://github.com/reactjs/redux">Redux</a> for the underlying application architecture.
      </p>
      <blockquote>
        You can learn more about how Lore uses Redux <Link to="/redux/">here</Link>.
      </blockquote>
    </Template>
  )
};
