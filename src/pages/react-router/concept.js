import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/ReactRouter';
import Markdown from '../../components/Markdown';
import Video from '../../components/Video';
import CodeTabs from '../../components/CodeTabs';
import CodeTab from '../../components/CodeTab';
import QuickstartBranch from '../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        Routing
      </h1>
      <p>
        Lore uses <a href="https://github.com/reactjs/react-router">React-Router</a> for the routing tier. There isn't
        much the framework can do to make it easier to use (it's pretty straight forward) but this page will be filled
        with common examples overtime.
      </p>

      <h3>
        Modifying your Routes
      </h3>
      <p>
        All routes for Lore should be placed in the <code>routes.js</code> file at the root of your project.
      </p>

      <Markdown text={`
      import React from 'react';
      import { Route, IndexRoute, Redirect } from 'react-router';

      var Master = require('./src/components/Master');
      var Home = require('./src/components/Home');

      module.exports = (
        <Route>
          <Redirect from="/" to="/todos" query={{filter: 'all'}} />
          <Route path="/" component={Master}>
            <Route path="todos" component={Home} />
          </Route>
        </Route>
      );
      `}/>

      <h3>
        Using Routing
      </h3>
      <p>
        Will fill this out with examples overtime, but for now please see
        the <Link to="/architecture/libraries/react-router/">section discussing react-router</Link> for links to
        learning resources.
      </p>

      <h1>
        Routing
      </h1>
      <p>
        This section documents the parts of Lore that are directly relevant to React-Router. For now that means how to
        specify your routes and change the default config settings for React-Router.
      </p>

      <p>
        The video below is an excerpt from the full <Link to="/audience/introduction-to-lore/">Introduction to Lore</Link>
        video and provides a summary of how Lore helps with routing.
      </p>

      <br/>

      <Video videoId="RmaSTBaPNb8" />

      <h2>
        Relevant Files
      </h2>
      <p>
        The files below are worth calling out as especially relevant to React-Router in terms of where the routes are
        specified and how to change the router's default configuration settings.
      </p>

      <h3>
        routes.js
      </h3>
      <p>
        This file is where you specify your route hierarchy. <code>Master</code> should always be the root component unless
        you really know what you're doing. <code>Layout</code> is a recommended pattern, but can be renamed or deleted
        without affecting the application (it's not special).
      </p>

      <Markdown text={`
      import React from 'react';
      import { Route, IndexRoute, Redirect } from 'react-router';

      var Master = require('./src/components/Master');
      var Layout = require('./src/components/Layout');

      module.exports = (
        <Route component={Master}>
          <Route path="/" component={Layout} />
        </Route>
      );
      `}/>

      <h3>
        config/router.js
      </h3>
      <p>
        This file is where you define overrides for the default routing behavior. Currently the only option here is how you
        want your routing displayed; using hash history or push state. You can find more information about these options
        on the <a href="https://github.com/ReactJSTraining/history">GitHub page for the <code>history</code> library</a>.
      </p>

      <blockquote>
        <p>
          This config file will change as soon as Lore updates to using the v2 version of React-Router.
        </p>
      </blockquote>

      <Markdown text={`
      var createBrowserHistory = require('history/lib/createBrowserHistory');

      module.exports = {

        /****************************************************************************
        *                                                                           *
        * Whether browser should use pushState or hash to keep track of routes      *
        * See: https://github.com/ReactJSTraining/history                           *
        *                                                                           *
        ****************************************************************************/

        history: createBrowserHistory()

      };
      `}/>
    </Template>
  )
};
