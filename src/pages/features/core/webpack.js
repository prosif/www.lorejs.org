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
        Webpack
      </h1>
      <p>
        Lore uses <a href="https://webpack.github.io/">Webpack</a> for the build system.
      </p>
      <blockquote>
        You can learn more about how Lore uses Webpack <Link to="/webpack/">here</Link>.
      </blockquote>
    </Template>
  )
};
