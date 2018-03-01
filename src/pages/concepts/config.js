import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/Concepts';
import Markdown from '../../components/Markdown';
import CodeTabs from '../../components/CodeTabs';
import CodeTab from '../../components/CodeTab';
import QuickstartBranch from '../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        Config
      </h1>
      <p>
        An explanation of all config files, their options, and their role.
      </p>

      <blockquote>
        <p>
          This section is currently very empty, but will be filled in gradually as the related features of Lore are
          better supported and/or documented. In the meantime, each config file is somewhat self-documented, so feel free
          to explore and <Link to="https://github.com/lore/lore/issues">file an issue</Link> if you have any questions.
        </p>
      </blockquote>
    </Template>
  )
};
