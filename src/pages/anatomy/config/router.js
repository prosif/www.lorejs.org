import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Anatomy';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        config/router.js
      </h1>

      <p>
        This file is used by Lore core and overrides the default router behaviors.
      </p>

      <blockquote>
        <p>
          The routing behavior will likely be broken out of Lore core and moved to <code>lore-hook-router</code> to match the conventions
          of the other config files and continue to externalize more of Lore's behaviors into overridable hooks.
        </p>
      </blockquote>

      <h2>
        Example Config File
      </h2>

      <Markdown text={`
      var browserHistory = require('react-router').browserHistory;

      module.exports = {
        history: browserHistory
      };
      `}/>

      <h2>
        Configuration Options
      </h2>
      <h4>
        history
      </h4>
      <p>
        The <Link to="https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md">type of router history</Link> you
        want to use in your application. Typically <code>browserHistory</code> if you want to use pushState routes like
        <code>https://www.myapp.com/posts/1</code> or <code>hashHistory</code> if you want to use hash-bang (#) style routes like
        <code>https://www.myapp.com/#/posts/1</code>.
      </p>
    </Template>
  )
};
