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
        lore-hook-actions
      </h1>
      <p>
        Source code for this hook can be found on GitHub <Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-actions">at this link</Link>.
      </p>


      <h2>
        Purpose
      </h2>

      <p>
        This hook creates the set of default actions for every model, using the built in blueprints for <code>create</code>, <code>destroy</code>,
        <code>get</code>, <code>find</code>, and <code>update</code>.
      </p>

      <p>
        If you have defined custom actions within the <code>src/actions</code> directory, it will merge those blueprints into the default
        actions, overwriting any default actions that have the same name.
      </p>


      <h2>
        Config
      </h2>

      <Markdown text={`
      module.exports = {

        /**
         * Specify whether models should be normalized.
         */

        // normalize: true,

        /**
         * Blueprints are used to provide models with a default set of actions for
         * interacting with a REST API. If you want to modify the behavior of those
         * actions you can provide your own implementation here.
         */

        // blueprints: {
        //   create: function() {...},
        //   destroy: function() {...},
        //   find: function() {...},
        //   get: function() {...},
        //   update: function() {...},
        // },

        /**
         * Determines whether the client-side id (the cid attribute in a model)
         * is sent to the server when creating data. This is not necessary when
         * interacting with REST APIs as the actions can associate the associate
         * the request and response, but when performing optimistic updates using
         * WebSockets it is necessary to send a client-generated ID to the server
         * in order to associate the data created on the client side with the data
         * broadcasted by the server.
         */

        // addCidToBody: false,

        /**
         * This field let's you change the name of the cid field sent to the server
         * when performing optimistic updates through WebSockets. By default the
         * property send to the server is called 'cid', matching the name of the attribute
         * on the client-side, but you can change it if you need it to match the API.
         */

        // cidBodyAttributeName: 'cid'

      };
      `}/>

      <h2>
        Example Usage
      </h2>

      <p>
        Let's say you create a <code>tweet</code> model, similar to the Quickstart:
      </p>

      <Markdown text={`
      src
      |-models
        |-tweet.js
      `}/>

      <p>
        This hook will automatically create 5 actions associated with that model that cover common CRUD operations. The
        signatures for those actions look like this:
      </p>

      <Markdown text={`
      lore.actions.tweet.create
      lore.actions.tweet.destroy
      lore.actions.tweet.get
      lore.actions.tweet.find
      lore.actions.tweet.update
      `}/>

      <p>
        Example usage for each action is provided below:
      </p>

      <h4>
        Create
      </h4>
      <p>
        This action is used to create a new tweet. The signature looks like <code>create(params)</code> and is invoked like this:
      </p>

      <Markdown text={`
      lore.actions.tweet.create({
        text: 'Some message to tweet'
      });
      `}/>

      <h4>
        Destroy
      </h4>
      <p>
        This action is used to delete a new tweet. The signature looks like <code>destroy(model)</code> and is invoked like this:
      </p>

      <Markdown text={`
      var tweet = this.props.tweet;

      lore.actions.tweet.destroy(tweet);
      `}/>

      <h4>
        Get
      </h4>
      <p>
        This action is used to fetch a specific tweet, and can optionally include query parameters to be sent in the request.
        The signature looks like <code>get(id, query)</code> and is invoked like this:
      </p>

      <Markdown text={`
      var tweetId = this.props.params.tweetId;

      lore.actions.tweet.get(tweetId);
      `}/>

      <p>
        The second <code>query</code> argument is helpful when you need to provide additional query parameters to the API server such as
        when asking it to nest resources:
      </p>

      <Markdown text={`
      var tweetId = this.props.params.tweetId;

      lore.actions.tweet.get(tweetId, {
        _embed: 'user'
      });
      `}/>

      <h4>
        Find
      </h4>
      <p>
        This action is used to fetch a set of tweets. The signature looks like <code>find(query, pagination)</code> and is invoked like this:
      </p>

      <Markdown text={`
      var userId = this.props.params.userId;

      lore.actions.tweet.find({
        user: userId
      },{
        page: 1,
        pageSize: 20
      });
      `}/>

      <h4>
        Update
      </h4>
      <p>
        This action is used to update a tweet. The signature looks like <code>update(model, params)</code> and is invoked like this:
      </p>

      <Markdown text={`
      var tweet = this.props.tweet;

      lore.actions.tweet.update(tweet, {
        text: 'Modified tweet message'
      });
      `}/>

      <h2>
        Extending and Overriding Actions
      </h2>
      <p>
        Sometimes you may need to add new actions, or overwrite the blueprints for a specific model. You can do that by
        creating a custom action inside the <code>src/actions</code> directory. For example, if you wanted to override the <code>create</code>
        action for the <code>tweet</code> model, you would create a custom action for <code>tweet/create</code> like this:
      </p>

      <Markdown text={`
      src
      |-actions
        |-tweet
          |-create.js
      `}/>

      <p>
        When this hook executes, the blueprints for each model are created first, and then the user-defined actions are loaded
        and merged. This means user-defined actions will always take priority over any actions created by the Lore.
      </p>

      <p>
        The easiest way to create a new action is often to <Link to="/cli/extract/action/">extract one of the existing actions</Link> and
        then modify the code.
      </p>

      <h2>
        Custom Actions
      </h2>

      <p>
        Custom actions can take two forms; a config object or a function.
      </p>

      <h4>
        Function
      </h4>

      <p>
        The function form is the "norm", and is what is generated when you execute commands like
        <code>lore extract action tweet/create</code>. A custom action in that form might look like this:
      </p>

      <Markdown text={`
      // file: src/actions/tweet/create.js

      module.exports = function create(params) {
        return function(dispatch) {
          const model = new lore.models.tweet(params);

          model.save().done(function() {
            dispatch({
              type: ActionTypes.UPDATE_TWEET,
              payload: payload(model, PayloadStates.RESOLVED)
            });
          }).fail(function(response) {
            const error = response.responseJSON;
            dispatch({
              type: ActionTypes.UPDATE_TWEET,
              payload: payload(model, PayloadStates.ERROR_CREATING, error)
            });
          });

          return dispatch({
            type: ActionTypes.ADD_TWEET,
            payload: payload(model, PayloadStates.CREATING)
          });
        };
      };
      `}/>

      <h4>
        Config Object
      </h4>

      <p>
        In practice, the config object probably isn't that useful, but it does allow you to tailor blueprint behavior for
        a specific model. For example, when you invoke <code>lore.actions.tweet.create(params)</code> and the API call fails, an
        <code>UPDATE_TWEET</code>action is emitted to the Redux store to update the state of the <code>tweet</code> from <code>CREATING</code> to
        <code>ERROR_CREATING</code>.
      </p>

      <p>
        This flows means that data that failed to be created will still show up in the application. This can be useful if you
        want to the provide the user with the ability to edit the data and try again, but for some applications you might want
        any tweets that fail creation to be REMOVED from the Redux store, and disappear from the application.
      </p>

      <p>
        If you want to do that, the config approach could be a useful approach, and you could use to to change the action
        emitted on failure from <code>UPDATE_TWEET</code> to <code>REMOVE_TWEET</code> like this:
      </p>

      <Markdown text={`
      // file: src/actions/tweet/create.js

      module.exports = {
        blueprint: 'create',

        model: lore.models.tweet,

        optimistic: {
          actionType: ActionTypes.ADD_TWEET,
          payloadState: PayloadStates.CREATING
        },

        onSuccess: {
          actionType: ActionTypes.UPDATE_TWEET,
          payloadState: PayloadStates.RESOLVED
        },

        onError: {
          actionType: ActionTypes.REMOVE_TWEET,
          payloadState: PayloadStates.ERROR_CREATING,
          beforeDispatch: function(response, args){
            lore.log.error('Oh no! The create called failed. Deleting tweet.')
          }
        }
      };
      `}/>

    </Template>
  )
};
