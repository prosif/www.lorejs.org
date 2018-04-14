import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/ReactRouter';
import Markdown from '../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        Introduction
      </h1>
      <p>
        Lore uses <a href="https://reacttraining.com/react-router/">React Router</a> as the default routing library.
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
  );
};
