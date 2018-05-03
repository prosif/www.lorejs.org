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
        React
      </h1>
      <p>
        Lore uses <a href="http://facebook.github.io/react/">React</a> for the presentation tier.
      </p>

      <h3>
        Links for Learning React
      </h3>
      <ul>
        <li>
          <a href="http://facebook.github.io/react/">Official Tutorial</a>
        </li>
        <li>???</li>
      </ul>
    </Template>
  )
};
