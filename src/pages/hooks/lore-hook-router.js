import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/Hooks';
import Markdown from '../../components/Markdown';
import CodeTabs from '../../components/CodeTabs';
import CodeTab from '../../components/CodeTab';
import QuickstartBranch from '../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        lore-hook-router
      </h1>
      <p>
        Source code for this hook can be found on GitHub <Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-router">at this link</Link>.
      </p>

      <h2>
        Purpose
      </h2>

      <p>
        A hook for generating the routes for React Router and specifying the type of history that should be
        used (hash or browser). The actual inclusion of React Router is handled by <code>lore-hook-react</code> since the <code>Router</code> needs
        to wrap the application, and that's part of the mounting process.
      </p>

      <h2>
        Config
      </h2>

      <Markdown text={`
      // var browserHistory = require('react-router').browserHistory;

      module.exports = {

        /**
         * Whether browser should use pushState or hash to keep track of routes
         * See: https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md
         **/

        // history: browserHistory,

        /**
         * Returns the routes used by the application.
         *
         * The 'lore.loader' object is a way of lazy-loading files and directories the framework
         * doesn't have control over such as the models, config directory, and in this case the
         * routes.js file at the root of the project.
         *
         * The reason the loader is used here is because the routes <em>must</em> to be lazy-loaded,
         * since loading the routes will pull in the components, which may be using the
         * 'lore.connect' decorator that won't exist until the 'connect' hooks loads.
         *
         * Trying to load the routes directly in this config file will throw an error during
         * build, because lore loads the config file <em>before</em> any of the hooks, since they
         * need information in the config to determine their behavior.
         */

        // routes: function(lore) {
        //   return lore.loader.loadRoutes();
        // }

      };
      `}/>
    </Template>
  )
};
