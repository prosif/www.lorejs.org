import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../../components/templates/LoreHookRedux';
import Markdown from '../../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h2>
        Example Usage
      </h2>
      <p>
        This hook essentially just breaks up the standard Redux store creation process into a single of
        functions that can be overridden on a per-environment basis, so that you don't have to override
        the <em>entire</em> store creation process.
      </p>

      <p>
        For example, in some environments (like development) you might want to override just the middleware, and
        apply apply a store enhancer to enable the <a href="https://github.com/gaearon/redux-devtools">Redux
        DevTools</a>, but leave the rest of the creation process the same.
      </p>

      <p>
        This standard Redux Store build process looks like this:
      </p>

      <Markdown text={`
      var Redux = require('redux');
      var thunk = require('redux-thunk');

      var middleware = [thunk];
      var enhancer = Redux.compose(
        Redux.applyMiddleware.apply(null, middleware)
      );
      var rootReducer = Redux.combineReducers(reducers);
      var preloadedState = {};
      var store = Redux.createStore(rootReducer, preloadedState, enhancer);

      // expose store on Lore instance
      lore.store = store;
      `}/>

      <h2>
        Overview
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
        What <a href="http://redux.js.org/docs/advanced/Middleware.html">middleware</a> you want Redux to use.
      </p>
    </Template>
  )
};
