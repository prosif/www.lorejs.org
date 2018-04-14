import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/Redux';
import Markdown from '../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        Introduction
      </h1>
      <p>
        The architectural foundation for Lore is built around <a href="https://redux.js.org">Redux</a>.
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
  );
};
