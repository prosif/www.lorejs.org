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

      <h3>
        Links for Learning Webpack
      </h3>
      <ul>
        <li>
          <a href="http://webpack.github.io/docs/tutorials/audience/">Official Tutorial</a>
        </li>
        <li>???</li>
      </ul>
    </Template>
  )
};
