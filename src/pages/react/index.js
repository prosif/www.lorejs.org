import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/React';
import Markdown from '../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        Introduction
      </h1>
      <p>
        Lore uses <a href="https://reactjs.org/">React</a> as the component library.
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
  );
};
