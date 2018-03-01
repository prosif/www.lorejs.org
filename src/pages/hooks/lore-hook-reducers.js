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
        lore-hook-reducers
      </h1>
      <p>
        Source code for this hook can be found on GitHub <Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-reducers">at this link</Link>.
      </p>

      <h2>
        Purpose
      </h2>
      <p>
        Loads all user defined reducers, which will override any blueprints previously created.
      </p>

      <p>
        The result is exposed on <code>lore.reducers</code>.
      </p>

      <h2>
        Config
      </h2>

      <Markdown text={`
      module.exports = {

        /****************************************************************************
         *                                                                           *
         * Specify dependencies between child reducers, which will control the order *
         * they are called in as well as what data is passed in through the third    *
         * options argument:                                                         *
         * function someReducer(state, action, options) {
         *   // 'options.nextState' will contain the results of the child
         *   // reducers you have declared a dependency on
         * }
         *                                                                           *
         ****************************************************************************/

        // This is the dependency structure for models by default,
        // using the built-in blueprints:

        // dependencies: {
        //   modelName: {
        //     byId: [],
        //     byCid: [],
        //     find: ['byId', 'byCid']
        //   }
        // }

        /**
         * Change what gets returned from the Redux store.
         *
         * This method is intended ONLY as a way to explore different solutions for addressing
         * immutability concerns that arise when components have a direct reference to
         * the data kept in the reducers.
         *
         * The default behavior in Redux is to provide components with a reference to the
         * store state returned from the reducers. This poses a problem when a component
         * tries to change that data, because it will modify the state of the store through
         * that reference.
         *
         * To address this issue, the top-level reducer will invoke this method right before
         * returning the next state, which gives you the ability to experiment with different
         * solutions for this problem.
         *
         * The default behavior is to return a copy of the store state, which will prevent any
         * component from being able to modify the "truth" kept in the reducers.
         *
         * Others solutions could be invoking 'Object.freeze(nextState)' (which will throw an
         * error if a component tries to modify the store state) or converting the store state
         * to an Immutable object using 'Immutable.map(nextState)' from Immutable.js.
         */

        // nextState: function(nextState) {
        //   return _.cloneDeep(nextState);
        // }

      };
      `}/>

      <h2>
        Example Usage
      </h2>

      <p>
        Given a project where a custom <code>tweet.count</code> reducer has been declared like so:
      </p>

      <Markdown text={`
      src
      |-reducers
        |-tweet
          |-count.js
      `}/>

      <p>
        This hook will find it and expose it on <code>lore.reducers.tweet.count</code> and make sure it's combined into the Redux store.
      </p>

      <p>
        Reducers should follow this format:
      </p>

      <Markdown text={`
      // file: src/reducers/tweet/count.js

      module.exports = function count(state, action) {
        state = state || 0;

        switch (action.type) {
          case ActionTypes.ADD_TWEET:
            return state + 1;

          default:
            return nextState
        }
      };
      `}/>

      <h1>
        reducer blueprints
      </h1>

      <h3>
        Purpose
      </h3>

      <p>
        If enabled, will create default reducers for all models that cover basic find operations - find by query, find by
        id, and find by cid.
      </p>

      <p>
        Iterates through all models in <code>lore.models</code> and creates reducers for all of them.
      </p>

      <h3>
        Example Usage
      </h3>

      <p>
        Given a model called <code>tweet</code>, this hook will create the following reducers:
      </p>

      <ul>
        <li>lore.reducers.tweet.find</li>
        <li>lore.reducers.tweet.byId</li>
        <li>lore.reducers.tweet.byCid</li>
      </ul>

      <p>
        The reducers are not meant to be accessed or used directly. Redux handles that.
      </p>


      <h4>
        byId
      </h4>

      <p>
        This reducer has a standard Redux format:
      </p>

      <Markdown text={`
      function byId(state, action) {...})
      `}/>

      <p>
        It's purpose is to listen for the standard CRUD ActionTypes (<code>ADD_TODO</code>, <code>UPDATE_TODO</code>, <code>REMOVE_TODO</code>, and
        <code>FETCH_TODOS</code>) and store the results in a dictionary where the key is the model id.  If a model doesn't have an
        id (which happens during optimistic creates) the model is not stored in the dictionary.  Keeping track of the models
        that only exist on the client side is the job of the <code>byCid</code> reducer.
      </p>

      <p>
        Here is an example of the dictionary this reducer returns:
      </p>

      <Markdown text={`
      {
        '1': {
          id: '1',
          cid: 'c1',
          data: {..some data..},
          state: "RESOLVED",
          error: {}
        },
        '2': {
          ...
        }
      }
      `}/>

      <h4>
        byCid
      </h4>

      <p>
        This reducer has a standard Redux format:
      </p>

      <Markdown text={`
      // standard reducer arguments
      function byCid(state, action) {...})
      `}/>

      <p>
        It's purpose is to listen for the standard CRUD ActionTypes (<code>ADD_TODO</code>, <code>UPDATE_TODO</code>, <code>REMOVE_TODO</code>, and
        <code>FETCH_TODOS</code>) and store the results in a dictionary where the key is the model cid.  There should never be a
        situation where a model does not have a cid.
      </p>

      <p>
        Here is an example of the dictionary this reducer returns (note the <code>c2</code> resource that has no id and is currently
        being created):
      </p>

      <Markdown text={`
      {
        'c1': {
          id: '1',
          cid: 'c1',
          data: {..some data..},
          state: "RESOLVED",
          error: {}
        },
        'c2': {
          id: null,
          cid: 'c2',
          data: {..some data..},
          state: "CREATING",
          error: {}
        }
      }
      `}/>

      <h4>
        all
      </h4>

      <p>
        This reducer has a modified Redux format as it requires an additional third 'options' arguments that includes the
        results from the <code>byId</code> and <code>byCid</code> reducers stored in a <code>nextState</code> object.
      </p>

      <Markdown text={`
      var _byId = byId(state.byId, action);
      var _byCid = byCid(state.byCid, action);
      var _all = all(state.all, action, {
        nextState: {
          byId: _byId,
          byCid: _byCid
        }
      });
      `}/>

      <p>
        It's purpose is to store collections of resources group by a common query, and listens for the ActionType
        <code>FETCH_TODOS</code>. If new data is created that matches the query criteria for one of the lists, it will also make sure
        that resource is included inside that list.
      </p>

      <p>
        Here is an example of the dictionary this reducer returns:
      </p>

      <Markdown text={`
      {
        '{}': {
          state: "RESOLVED",
          data: [
            {
              id: '1',
              cid: 'c1',
              data: {
                color: 'red'
              },
              state: "RESOLVED",
              error: {}
            },
            {
              id: '2',
              cid: 'c2',
              data: {
                color: 'blue'
              },
              state: "RESOLVED",
              error: {}
            }
          ],
          error: {}
        },
        '{"color":"blue"}': {
          state: "RESOLVED",
          data: [
            {
              id: '2',
              cid: 'c2',
              data: {
                color: 'blue'
              },
              state: "RESOLVED",
              error: {}
            }
          ],
          error: {}
        }
      }
      `}/>

      <p>
        The keys for the dictionary are the <code>JSON.stringify()</code> version of the query. For example, a called to <code>lore.connect</code>
        that looks like this:
      </p>

      <Markdown text={`
      lore.connect(function(getState, props) {
        return {
          todos: getState('todo.all', {
            where: {
              color: 'blue'
            }
          })
        }
      })
      `}/>

      <p>
        Specifies the query <code>{"{color: 'blue'}"}</code>. It's that query that gets passed to <code>JSON.stringify()</code> and stored as the
        dictionary key.  When new data shows in either the <code>byId</code> or <code>byCid</code> dictionaries that are new (don't currently exist
        in <code>todo.all</code>) they are inspected to see whether the any of the stored queries match the data, and if so that data is
        inserted into the collection in the dictionary.
      </p>
    </Template>
  )
};
