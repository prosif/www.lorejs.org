import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/Quickstart';
import Markdown from '../../components/Markdown';
import CodeTabs from '../../components/CodeTabs';
import CodeTab from '../../components/CodeTab';
import QuickstartBranch from '../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        CLI
      </h1>
      <p>
        The CLI for Lore is intended to be a complimentary utility to the framework itself. As the CLI evolves, it will
        include the ability to write your own plugins for it, so you can extend or tailor its behavior.
      </p>

      <h2>
        Generator Categories
      </h2>

      <h3>
        New
      </h3>
      <p>
        Used to create a new project.
      </p>

      <h3>
        Generators
      </h3>
      <p>
        Generators are used to add common files (like components, actions, reducers) to your project, and include flags
        for generating those files in ES5, ES6 or ESNext style syntax. The generators can be especially useful when you
        need to override a default action or reducer.
      </p>
    </Template>
  )
};
