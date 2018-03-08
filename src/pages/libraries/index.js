import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/Libraries';

export default (props) => {
  return (
    <Template>
      <h1>
        Introduction
      </h1>
      <p>
        While Lore generally strives to be flexible about it's opinions (allowing you to override them or
        add and replace behaviors via hooks) there are certain libraries and concepts that are fairly
        foundational within those opinions, and may require a high level of effort in order to break away from.
      </p>
      <p>
        The libraries listed here make up the foundation of Lore, and represent the core concepts the
        framework is built around. If you're comfortable with these libraries, and enjoy working with
        them, then the framework should generally make sense, since it's largely just patterns and
        conventions built around them.
      </p>
      <p>
        If, on the other hand, you dislike any of these libraries, it seems unlikely you will enjoy working
        with the framework.
      </p>
    </Template>
  );
};
