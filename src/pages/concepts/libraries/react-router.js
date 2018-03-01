import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Concepts';
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
        Lore uses <a href="https://github.com/reactjs/react-router">React-Router</a> for the routing tier.
      </p>

      <h3>
        Links for Learning React-Router
      </h3>
      <ul>
        <li>
          <a href="https://github.com/reactjs/react-router-tutorial">Official Tutorial</a>
        </li>
        <li>
          <a href="https://github.com/reactjs/react-router/tree/master/examples">Official Examples</a>
        </li>
        <li>???</li>
      </ul>
    </Template>
  )
};
