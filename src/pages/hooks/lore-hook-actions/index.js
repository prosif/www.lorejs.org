import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Hooks';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        lore-hook-actions
      </h1>

      <h2>
        Purpose
      </h2>
      <p>
        This hook creates the set of default actions for every model.
      </p>
      <p>
        To learn more about the behavior of this hook, see the <Link to="/actions/">Actions documentation</Link>.
      </p>

      <h2>
        Config
      </h2>
      <p>
        To learn more about the configuration options for this hook, see the documentation
        for <Link to="/anatomy/config/actions/">config/actions.js</Link>.
      </p>
    </Template>
  )
};
