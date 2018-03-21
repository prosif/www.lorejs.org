import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Concepts';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

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
    </Template>
  )
};
