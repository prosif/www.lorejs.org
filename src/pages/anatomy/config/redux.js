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
        config/redux.js
      </h1>

      <p>
        This file is connected to the <code>lore-hook-redux</code> hook and overrides the default redux behaviors.
      </p>

      <h2>
        Purpose
      </h2>
      <p>
        This config file allows you to modify how Redux is constructed.
      </p>

      <h2>
        Example Config File
      </h2>

      <Markdown text={`
      var Redux = require('redux');
      var applyMiddleware = Redux.applyMiddleware;
      var thunk = require('redux-thunk');

      module.exports = {
        middleware: [
          applyMiddleware(thunk)
        ]
      };
      `}/>

      <h3>
        Configuration Options
      </h3>
      <h4>
        middleware
      </h4>
      <p>
        What <Link to="http://redux.js.org/docs/advanced/Middleware.html">middleware</Link> you want Redux to use.
      </p>
    </Template>
  )
};
