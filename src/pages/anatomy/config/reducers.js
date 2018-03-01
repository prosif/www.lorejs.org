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
        config/reducers.js
      </h1>

      <p>
        This file is connected to the <code>lore-hook-reducers</code> hook and overrides the default reducer behaviors.
      </p>

      <h2>
        Purpose
      </h2>
      <p>
        Sometimes child reducers need to execute in a specific order, which is the case with the default Lore reducers. There
        are some edge cases when caching optimistic data, and others that occur during routing and page loading, that require
        the <code>find</code> reducer to use the information just calculated by the <code>byId</code> and <code>byCid</code> reducers. So the execution cycle
        with the parent <code>post</code> reducer looks something like this:
      </p>

      <Markdown text={`
      // virtual reducer: src/reducers/post.js
      module.exports = function(state, action) {
        var _byId = byId(state.byId, action);
        var _byCid = byCid(state.byId, action);
        var _find = find(state.byId, action, {
          nextState: {
            byId: _byId,
            byCid: _byCid
          }
        });

        return {
          byId: _byId,
          byCid: _byCid,
          find: _find,
        }
      }
      `}/>

      <p>
        In order to properly keep track of the query and pagination information and prevent duplicates related to optimistic
        updates and page load order, the <code>find</code> reducer uses the information from the other two. So basically, it has a
        dependency on the first two reducers, which are passed in as a third <code>options</code> argument.
      </p>

      <p>
        If you find yourself creating reducers that need information from other reducers (and you don't want to take full
        control of the parent reducer) you can specify those dependencies in the <code>config/reducers.js</code> file. The explicit
        representation of the scenario above looks like this:
      </p>

      <Markdown text={`
      // config/reducers.js

      module.exports = {
        dependencies: {
          post: {
            find: ['byId', 'byCid']
          }
        }
      }
      `}/>

      <p>
        That object structure says "the post.find reducer needs byId and byCid to execute first and needs the result of those
        two reducers passed to it in the third options argument".
      </p>

      <p>
        So if you need to create a custom reducer and place it alongside the blueprints, but also need information from the
        blueprints, you can simple declare it and lore will make sure everything is called in the right order.
      </p>

      <h2>
        Example Config File
      </h2>

      <Markdown text={`
      module.exports = {
        dependencies: {
          post: {
            byId: [],
            byCid: [],
            find: ['byId', 'byCid']
          }
        }
      };
      `}/>

      <h2>
        Configuration Options
      </h2>
      <h4>
        dependencies
      </h4>
      <p>
        The dependency map between a top-level parent reducer like <code>post</code> and it's child reducers that determines execution
        order and whether (if any) data about the next state should be passed between them.
      </p>
    </Template>
  )
};
