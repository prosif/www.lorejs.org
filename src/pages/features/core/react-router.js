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
        React-Router
      </h1>
      <p>
        Lore uses <a href="https://github.com/reactjs/react-router">React Router</a> for the routing tier.
      </p>
      <blockquote>
        You can learn more about how Lore uses React Router <Link to="/react-router/">here</Link>.
      </blockquote>
    </Template>
  )
};
