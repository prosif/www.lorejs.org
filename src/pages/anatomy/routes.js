import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/Anatomy';
import Markdown from '../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        routes.js
      </h1>
      <p>
        This file contains the route hierarchy for the application, which is a description of what should be rendered
        based on the URL in the web browser.
      </p>
      <p>
        These routes are passed directly to <code>react-router</code>, which is the routing library used by Lore.
      </p>
      <p>
        To learn more about routes, see the <a href="https://github.com/ReactTraining/react-router/blob/v3.2.1/docs/API.md">react-router documentation</a>.
      </p>
      <blockquote>
        Note that the link above goes to the documentation for v3 of <code>react-router</code>, which is the version
        included with new projects by default. The documentation for v4 can be
        found <a href="https://reacttraining.com/react-router/web/guides/philosophy">on the React Router
        website</a>, though it won't apply to your project by default install v4 and override the configuration
        for <code>lore-hook-router</code> in <code>config/router.js</code>.
      </blockquote>

      <h3>
        Defaults
      </h3>

      <Markdown text={`
      import React from 'react';
      import { Route, IndexRoute, Redirect } from 'react-router';

      /**
       * Wrapping the Master component with this decorator provides an easy way
       * to redirect the user to a login experience if we don't know who they are.
       */
      import UserIsAuthenticated from './src/decorators/UserIsAuthenticated';

      /**
       * Routes are used to declare your view hierarchy
       * See: https://github.com/ReactTraining/react-router/blob/v3.2.1/docs/API.md
       */
      import Master from './src/components/Master';
      import Layout from './src/components/Layout';
      import Feed from './src/components/Feed';

      export default (
        <Route component={UserIsAuthenticated(Master)}>
          <Route path="/" component={Layout}>
            <IndexRoute component={Feed} />
          </Route>
        </Route>
      );

      `}/>
    </Template>
  );
};
