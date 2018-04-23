import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/LoreHookRedux';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        lore-hook-redux
      </h1>
      <p>
        Source code for this hook can be found on GitHub <a href="https://github.com/lore/lore/tree/master/packages/lore-hook-redux">at this link</a>.
      </p>

      <h2>
        Purpose
      </h2>
      <p>
        This hooks is responsible for creating the <a href="http://redux.js.org/docs/basics/Store.html">Redux Store</a> and applying
        any desired middleware.
      </p>

      <h2>
        Config
      </h2>

      <Markdown text={`
      // var Redux = require('redux');
      // var thunk = require('redux-thunk').default;
      // var batchedSubscribe = require('redux-batched-subscribe').batchedSubscribe;
      // var _ = require('lodash');

      module.exports = {

        /**
         * Middleware injected into the dispatch flow, placed at the point between
         * dispatching an action, and the moment it reaches the reducer.
         *
         * http://redux.js.org/docs/advanced/Middleware.html
         */

        // middleware: [thunk],

        /**
         * Length of time (in milliseconds) that needs to exist between updates
         * to the Redux store before React is notified the store has changed.
         * A value of zero corresponds to "one tick".
         *
         * https://lodash.com/docs/4.17.4#debounce
         */

        // debounceWait: 0,

        /**
         * Enhance the store with third-party capabilities such as middleware,
         * time travel, persistence, etc.
         *
         * http://redux.js.org/docs/api/compose.html
         *
         * Note about the batchedSubscribe enhancer:
         *
         * When normalization is configured and enabled, action creators can end up
         * firing multiple actions back-to-back. By default, these actions do not
         * get batched by Redux (it notifies React that the store changed after every
         * action), which means every action will cause React to re-render the application.
         * When this occurs back-to-back over a very short period of time, the responsiveness
         * (and usability) of the application can drop noticeably.
         *
         * The batchedSubscribe enhancer, combined with the use of the _.debounce function,
         * is a way of preventing this behavior, by preventing Redux from notifying React
         * about changes to the Store until at least X time has passed between updates.
         *
         * Lore sets this value to 0 by default, which translates to "one tick". This delay
         * should be undetectable to users, but just long enough to make sure that all actions
         * from a normalized response are processed before React is notified of the change.
         */

        // enhancer: function(middleware, config) {
        //   return Redux.compose(
        //     Redux.applyMiddleware.apply(null, middleware),
        //     batchedSubscribe(_.debounce(function(notify) {
        //       notify();
        //     }, config.redux.debounceWait))
        //   );
        // },

        /**
         * Combine all reducers into a single reducer function, which will be used
         * by the Redux store. If there are no reducers, returns an empty function
         * to prevent Redux from throwing an error.
         *
         * http://redux.js.org/docs/api/combineReducers.html
         */

        // rootReducer: function(reducers) {
        //   var hasReducers = Object.keys(reducers).length > 0;
        //   return hasReducers ? Redux.combineReducers(reducers) : function() {};
        // },

        /**
         * Initial state of the Redux store. Any data you specify here will
         * be in the store when the application starts.
         *
         * http://redux.js.org/docs/api/createStore.html
         */

        // preloadedState: function() {
        //   return {};
        // },

        /**
         * Configure the Store used by the application
         *
         * http://redux.js.org/docs/api/createStore.html
         */

        // configureStore: function(rootReducer, preloadedState, enhancer) {
        //   return Redux.createStore(rootReducer, preloadedState, enhancer);
        // }

      };
      `}/>

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
    </Template>
  )
};