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

      <h3>
        Links for Learning Redux
      </h3>
      <ul>
        <li>
          <a href="http://redux.js.org/">Official Documentation</a>
        </li>
        <li>
          <a href="https://egghead.io/series/getting-started-with-redux">Getting Started With Redux (Video Series)</a>
        </li>
        <li>???</li>
      </ul>
    </Template>
  )
};
