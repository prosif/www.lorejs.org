import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/LoreHookAuth';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        lore-hook-auth
      </h1>
      <p>
        Source code for this hook can be found on
        GitHub <a href="https://github.com/lore/lore/tree/master/packages/lore-hook-auth">at this link</a>.
      </p>

      <h2>
        Purpose
      </h2>

      <p>
        Generates actions for retrieving and updating the current user, along with a reducer for storing the
        current user.
      </p>

      <h2>
        Config
      </h2>

      <Markdown text={`
      module.exports = {

        /**
         * The name of the model with a URL property set to the endpoint
         * that can return the current user.
         */
        modelName: 'currentUser'

        /**
         * The name of the reducer that should be created that is responsible
         * for storing the current user. This defaults to the name of the
         * model.
         */
        // reducerName: 'currentUser'

        /**
         * The name of the action that should be created at this responsible
         * for fetching the current user. This defaults to the name of the
         * model.
         */
        // actionName: 'currentUser'

      };
      `}/>

      <p>
        When using this hook you should also modify the dependencies array of the
        <code>redux</code> hook in <code>index.js</code> to make sure it runs <em>after</em> this hook:
      </p>

      <Markdown text={`
      // index.js
      lore.summon({
        hooks: {
          auth: require('lore-hook-auth'),
          actions: require('lore-hook-actions'),
          bindActions: require('lore-hook-bind-actions'),
          collections: require('lore-hook-collections'),
          connections: require('lore-hook-connections'),
          connect: require('lore-hook-connect'),
          dialog: require('lore-hook-dialog'),
          models: require('lore-hook-models'),
          react: require('lore-hook-react'),
          reducers: require('lore-hook-reducers'),
          redux: _.extend(require('lore-hook-redux'), {
            dependencies: ['reducers', 'auth']
          }),
          router: require('lore-hook-router')
        }
      });
      `}/>

      <h2>
        Example Usage
      </h2>

      <p>
        Let's say you're building an application that consumes an API that returns information about the current user from
        the endpoint <code>/user</code>.
      </p>

      <p>
        In order to retrieve the current user, we need three things in place; a model representing that endpoint, an action
        we can invoke the fetch the user, and a reducer to store that user. Unlike the build-in blueprints, this flow is
        special in that the action will <strong>always</strong> community with the same endpoint (<code>/user</code>) and the reducer will only store
        a <em>single</em> object, as opposed to a <em>set</em> of objects like the built-in <code>find</code>, <code>byId</code> and <code>byCid</code> reducers.
      </p>

      <p>
        To fetch the current user, we then need three files in our project that look like this:
      </p>

      <Markdown text={`
      src
      |-actions
        |-currentUser.js
      |-models
        |-currentUser.js
      |-reducers
        |-currentUser.js
      `}/>

      <p>
        This hook prevents you from needing to create the custom <code>action</code> and <code>reducer</code>. Instead, you only need to create the
        model and specify what endpoint the action should fetch the current user from. Here is an example <code>currentUser</code> model,
        that sets the endpoint to be <code>/user</code> (matching out API):
      </p>

      <Markdown text={`
      module.exports = {
        endpoint: 'user'
      }
      `}/>

      <p>
        Once this model exists (and assuming the <code>modelName</code> field in the config matches the name of this model) you can
        fetch the current user through a <code>lore.connect</code> call like this:
      </p>

      <Markdown text={`
      lore.connect(function(getState, props) {
        return {
          user: getState('currentUser')
        };
      })
      `}/>
    </Template>
  )
};
