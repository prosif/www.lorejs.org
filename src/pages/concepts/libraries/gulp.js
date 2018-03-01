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
        Gulp
      </h1>
      <p>
        Lore uses <a href="http://gulpjs.com/">Gulp</a> as a task runner to help with publishing.
      </p>

      <h3>
        Links for Learning Gulp
      </h3>
      <ul>
        <li>
          <a href="http://webpack.github.io/docs/tutorials/audience/">Official Documentation</a>
        </li>
        <li>
          <a href="https://www.pluralsight.com/courses/javascript-build-automation-gulpjs">Pluralsight Video Series</a>
        </li>
        <li>???</li>
      </ul>
    </Template>
  )
};
