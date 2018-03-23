import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Anatomy';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        /config/connect.js
      </h1>
      <p>
        This is the configuration file for <code>lore-hook-connect</code> and is where you define overrides
        for the default <code>connect</code> behavior.
      </p>

      <h2>
        Configuration
      </h2>

      <h3>
        blueprints
      </h3>
      <p>
        Extend or override the built-in blueprints. This is helpful if you want to change the interface for
        a <code>getState</code> method call.
      </p>
      <p>
        Each blueprint is responsible for:
      </p>
      <ol>
        <li>
          Validating the parameters passed to the getState method
        </li>
        <li>
          Extracting the desired data from the Redux Store
        </li>
        <li>
          <strong>[optional]</strong> Calling the appropriate action if that data does not exist
        </li>
      </ol>
      <p>
        Lore has seven built-in blueprints:
      </p>
      {/*
      <ul>
        <li>
          <strong>all</strong> - used for calls like getState('tweet.all')
        </li>
        <li>
          <strong>byCid</strong> - used for calls like getState('tweet.byCid')
        </li>
        <li>
          <strong>byId</strong> - used for calls like getState('tweet.byId')
        </li>
        <li>
          <strong>find</strong> - used for calls like getState('tweet.find')
        </li>
        <li>
          <strong>findAll</strong> - used for calls like getState('tweet.findAll')
        </li>
        <li>
          <strong>first</strong> - used for calls like getState('tweet.first')
        </li>
        <li>
          <strong>singleton</strong> - used for calls like getState('currentUser')
        </li>
      </ul>
      */}

      <Markdown text={`
      import all from 'lore-hook-connect/es/blueprints/all';
      import byCid from 'lore-hook-connect/es/blueprints/byCid';
      import byId from 'lore-hook-connect/es/blueprints/byId';
      import find from 'lore-hook-connect/es/blueprints/find';
      import findAll from 'lore-hook-connect/es/blueprints/findAll';
      import first from 'lore-hook-connect/es/blueprints/first';
      import singleton from 'lore-hook-connect/es/blueprints/singleton';

      blueprints: {
        all,      // used for calls like getState('tweet.all')
        byCid,    // used for calls like getState('tweet.byCid')
        byId,     // used for calls like getState('tweet.byId')
        find,     // used for calls like getState('tweet.find')
        findAll,  // used for calls like getState('tweet.findAll')
        first,    // used for calls like getState('tweet.first')
        singleton // used for calls like getState('currentUser')
      }
      `}/>

      <p>
        To illustrate how to override a blueprint, let's examine the default syntax to fetch a model by id, which
        looks like this:
      </p>

      <Markdown text={`
      getState('tweet.byId', {
        id: 1
      })
      `}/>

      <p>
        Now let's say you wanted to modify the syntax to use a 'where' clause, to make it similar to
        the <code>find</code> blueprint like this:
      </p>

      <Markdown text={`
      getState('tweet.byId', {
        where: {
          id: 1
        }
      })
      `}/>

      <p>
        You could achieve that by overriding the <code>byId</code> blueprint with the implementation below.
      </p>

      <Markdown text={`
      blueprints: {
        byId: {
          defaults: {
            where: {
              id: null
            }
          },

          verifyParams: function(params) {
            if (!params.where.id) {
              throw new Error('Missing required field: id');
            }
          },

          getPayload: function(reducerState, params) {
            const key = params.where.id;
            return reducerState[key];
          },

          callAction: function(action, params) {
            const id = params.where.id;
            return action(id).payload;
          }
        }
      }
      `}/>

      <h3>
        reducerActionMap
      </h3>
      <p>
        This map determines which reducer is inspected for data, and which action is invoked if that data doesn't
        exist. You can also use this map to override the default reducer-action mapping or associate reducers and
        actions that weren't created by the framework (such as a custom action or reducer you created).
      </p>
      <p>
        There are seven <code>getState</code> blueprints built into the framework, with mappings provided below, based
        on the actions and reducers automatically created by the conventions of the framework.
      </p>
      <p>
        The <code>*</code> in the mappings below is special syntax that means <em>"put the name of the model here"</em>.
        It allows you to say <em>"this mapping applies to all models"</em>. For example, <code>*.find</code> will
        apply to <code>tweet.find</code>, <code>user.find</code>, etc.
      </p>
      <p>
        You can reuse built-in blueprints by setting the value of blueprint to the name of the blueprint you
        want to reuse.
      </p>

      <Markdown text={`
      reducerActionMap: {
        '*.all': {
          action: null,
          reducer: '*.byCid',
          blueprint: 'all'
        },
        '*.byCid': {
          action: null,
          reducer: '*.byCid',
          blueprint: 'byCid'
        },
        '*.byId': {
          action: '*.get',
          reducer: '*.byId',
          blueprint: 'byId'
        },
        '*.find': {
          action: '*.find',
          reducer: '*.find',
          blueprint: 'find'
        },
        '*.findAll': {
          action: '*.find',
          reducer: '*.find',
          blueprint: 'findAll'
        },
        '*.first': {
          action: '*.find',
          reducer: '*.find',
          blueprint: 'first'
        }
      }
      `}/>

      <p>
        If the built-in blueprints don't work for you, you can use a custom blueprint by providing an object as
        the value of the blueprint. The code below mimics the built-in singleton blueprint, which is used by
        the <code>lore-hook-auth</code> hook to retrieve the <code>currentUser</code>.
      </p>
      <Markdown text={`
      reducerActionMap: {
        'currentUser': {
          action: 'currentUser',
          reducer: 'currentUser',
          blueprint: {
            getPayload: function(reducerState, params) {
              return reducerState;
            },
            callAction: function(action, params) {
              return action().payload;
            }
          }
        }
      }
      `}/>
    </Template>
  )
};
