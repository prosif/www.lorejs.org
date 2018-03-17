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
        /config/connect.js
      </h1>
      <p>
        This is the configuration file for <code>lore-hook-connect</code> and is where you define overrides
        for the default <code>connect</code> behavior.
      </p>

      <h2>
        Purpose
      </h2>
      <p>
        Whenever you create a model in Lore, the conventions will automatically create a set of actions and
        reducers to support basic CRUD operations and lazy-loading of data from the server.  For example, if
        you create a model called <code>tweet</code>, the default map is as follows:
      </p>

      <table style={{ marginLeft: '24px', marginBottom: '16px', marginTop: '16px' }}>
        <thead>
        <tr>
          <th style={{ textAlign: 'left' }}>Action</th>
          <th style={{ textAlign: 'left' }}>ActionType</th>
          <th style={{ textAlign: 'left' }}>Reducer</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td style={{ textAlign: 'left', paddingRight: '24px' }}>tweet.find</td>
          <td style={{ textAlign: 'left', paddingRight: '24px' }}>FETCH_TWEETS</td>
          <td style={{ textAlign: 'left' }}>tweet.find</td>
        </tr>
        <tr>
          <td style={{ textAlign: 'left', paddingRight: '24px' }}>tweet.get</td>
          <td style={{ textAlign: 'left', paddingRight: '24px' }}>FETCH_TWEET</td>
          <td style={{ textAlign: 'left' }}>tweet.byId</td>
        </tr>
        </tbody>
      </table>

      <p>
        To better understand the map, it helps to take a look at the typical usage for <code>lore.connect</code>.  Here we want to
        retrieve all the posts that have been created.
      </p>

      <Markdown text={`
      import { connect } from 'lore-hook-connect';

      connect(function(getState, props) {
        return {
          posts: getState('post.find')
        }
      })
      `}/>

      <p>
        What happens when <code>getState()</code> is called, is that it looks at the <code>post.find</code> string, which represents the reducer
        that you want the data for. Lore then looks at the state of that reducer at the time of the function call. If the
        state for that reducer hasn't been initialized yet (no data has been fetched from the server) it will execute the
        action on the other side of the map.
      </p>

      <p>
        So the first time you call <code>getState('post.find')</code> the reducer won't have any data in it. So the connect decorator will
        invoke the <code>post.find</code> action to retrieve the list of posts. Once the data comes back from the server (passing through
        whatever parse methods you've specified to transform the data), the action will package up the data and emit an
        action with an ActionType of <code>FETCH_POSTS</code>.
      </p>

      <p>
        This ActionType is something the <code>post.find</code> reducer is configured to look for, and will then store the data, and the
        app will be notified that there is new data in the store. The app will update, and your component will call
        <code>getState('post.find')</code> again. But this time Lore will see there *is* data in the reducer state, and so it will
        return it *without* calling the action this time.
      </p>

      <h3>
        Problems This Map Helps Address
      </h3>

      <h4>
        1. Duplicate AJAX Calls
      </h4>
      <p>
        If components declare the data they want, and an AJAX call is executed to fetch that data if it doesn't exist, then
        every time the component renders there's the potential to make an AJAX request. If guards aren't in place to know when
        an AJAX request is or isn't in flight, you can end up making multiple AJAX requests for the same data. Depending on
        the number of requests and the rate that components update, this has the potential to severely degrade the usability
        of your application and apply unnecessary load to the API server.
      </p>

      <h4>
        2. Infinite Loop + Browser Crash
      </h4>
      <p>
        A big motivation for establishing conventions around reducers and actions was due to how easy it can be to accidentally
        end up in an infinite loop in React/Redux in a lazy-loading setup like <code>lore.connect</code> is configured for (a setup where
        components declare the data they want and something else is responsible for fetching if it doesn't exist).
      </p>

      <p>
        If a component requests state, like <code>post.find</code>, and that state doesn't exist, an action will be triggered and the
        store will be updated to reflect the fact that data is being fetching, and the component will get updated because
        the reducer state changed. Which will give it another opportunity to request <code>post.find</code>. At this point, there are
        3 pieces that need to have been linked up properly in order to form a proper guard to prevent duplicate AJAX calls.
      </p>

      <ol>
        <li>First, there needs to be a reducer called <code>post.find</code></li>
        <li>Second there needs to be an action called <code>post.find</code>,</li>
        <li>Third there needs to be an ActionType called <code>FETCH_POSTS</code> that the action creator emits and the reducer processes.</li>
      </ol>

      <p>
        Without conventions, there's a lot of files that need to be copy/pasted to enable that data flow for every
        model/endpoint you need in your application. If you accidentally <code>require()</code> the wrong file, or forget to make all the
        necessary changes in your copy/pasted files, or forget to create the ActionType, or forget to make sure the correct
        ActionType is being emitted and listened for, the component may end up accessing the store again, finding no data,
        making a request, and updating the store, and getting called again, and accessing the store again, and finding no
        data, and making a request, and so on.
      </p>

      <p>
        It's a conceptually simple bug to solve if you know what to look for, but it can be incredibly time consuming to track
        down the first time you see if it you don't know what to look for, and you have to manually force-quit the browser tab
        when it happens.
      </p>

      <p>
        This "little" problem can be draining, a huge blocker, and incredibly frustrating for other people working in your
        project. So a big reason for creating conventions around reducer and actions and setting up a map between them was to
        solve this problem. This way the framework has the ability to guard against and limit certain situations (at least
        until you override the conventions).
      </p>

      <h2>
        Example Config File
      </h2>

      <Markdown text={`
      module.exports = {

        reducerActionMap: {
          'post.find': {
            action: 'post.find',
            reducer: 'post.find',
            blueprint: 'find'
          },

          'post.byId': {
            action: 'post.get',
            reducer: 'post.byId',
            blueprint: 'byId'
          },

          'currentUser': {
            action: 'currentUser',
            reducer: 'currentUser',
            blueprint: 'singleton'
          }
        }

      };
      `}/>

      <h2>
        Configuration Options
      </h2>
      <h4>
        reducerActionMap
      </h4>
      <p>
        Used to override the default reducer-action mapping or associate reducers and actions that weren't created by the
        framework (i.e. a custom action or reducer you created).
      </p>

      <p>
        Each map between an reducer and an action requires a blueprint to specify it's behavior. There are three blueprints
        provided within the framework; <code>find</code>, <code>byId</code> and <code>singleton</code>. If you want to understand how they work see the
        <Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-connect/src/blueprints">source code for the blueprints</Link>.
      </p>

      <p>
        If the built-in blueprints don't work for you, you can use a custom blueprint by providing an object as the
        value of the blueprint. The code below mimics the built-in singleton blueprint, which assumes there is only
        one resource provided by the API endpoint (and therefore does not pass arguments to the action creator when
        invoking it) and also assumes the reducer only stores a single resource (so we don't need to do a lookup to find
        what we're looking for).
      </p>

      <Markdown text={`
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
      `}/>
    </Template>
  )
};
