import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Quickstart';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        extract action
      </h1>
      <p>
        CLI command to add an <Link to="/architecture/actions/">Action</Link> to your project.
      </p>

      <h3>
        Usage
      </h3>

      <Markdown type="sh" text={`
      lore extract action [action-name]
      `}/>

      <h4>
        Create
      </h4>

      <Markdown type="sh" text={`
      lore extract action post/create
      `}/>

      <Markdown text={`
      var ActionTypes = require('lore-utils').ActionTypes;
      var PayloadStates = require('lore-utils').PayloadStates;
      var payload = require('lore-utils').payload;

      module.exports = function create(params) {
        return function(dispatch) {
          var Model = lore.models.post;
          var model = new Model(params);

          model.save().then(function() {
            dispatch({
              type: ActionTypes.update('post'),
              payload: payload(model, PayloadStates.RESOLVED)
            });
          }).catch(function(response) {
            var error = response.data;

            dispatch({
              type: ActionTypes.remove('post'),
              payload: payload(model, PayloadStates.ERROR_CREATING, error)
            });
          });

          return dispatch({
            type: ActionTypes.add('post'),
            payload: payload(model, PayloadStates.CREATING)
          });
        };
      };
      `}/>

      <h4>
        Destroy
      </h4>

      <Markdown type="sh" text={`
      lore extract action post/destroy
      `}/>

      <Markdown text={`
      var _ = require('lodash');
      var ActionTypes = require('lore-utils').ActionTypes;
      var PayloadStates = require('lore-utils').PayloadStates;

      module.exports = function destroy(model) {
        return function(dispatch) {
          var Model = lore.models.post;
          var proxyModel = new Model(model.data);

          proxyModel.destroy().then(function() {
            dispatch({
              type: ActionTypes.remove('post'),
              payload: _.merge(model, {
                state: PayloadStates.RESOLVED
              })
            });
          }).catch(function(response) {
            var error = response.data;

            if (response.status === 404) {
              dispatch({
                type: ActionTypes.update('post'),
                payload: _.merge(model, {
                  state: PayloadStates.NOT_FOUND,
                  error: error
                })
              });
            } else {
              dispatch({
                type: ActionTypes.update('post'),
                payload: _.merge(model, {
                  state: PayloadStates.ERROR_DELETING,
                  error: error
                })
              });
            }
          });

          return dispatch({
            type: ActionTypes.update('post'),
            payload: _.merge(model, {
              state: PayloadStates.DELETING
            })
          });
        };
      };
      `}/>

      <h4>
        Find
      </h4>

      <Markdown type="sh" text={`
      lore extract action post/find
      `}/>

      <Markdown text={`
      var _ = require('lodash');
      var ActionTypes = require('lore-utils').ActionTypes;
      var PayloadStates = require('lore-utils').PayloadStates;
      var payloadCollection = require('lore-utils').payloadCollection;

      /*
       * Blueprint for Find method
       */

      module.exports = function find(query = {}, pagination) {
        return function(dispatch) {
          var Collection = lore.models.post;
          var collection = new Collection();

          var queryParameters = _.extend({}, query, pagination);

          var combinedQuery = {
            where: query,
            pagination: pagination
          };

          collection.fetch({
            data: queryParameters
          }).then(function() {
            dispatch({
              type: ActionTypes.fetchPlural('post'),
              payload: payloadCollection(collection, PayloadStates.RESOLVED, null, combinedQuery),
              query: combinedQuery
            });
          }).catch(function(response) {
            var error = response.data;

            dispatch({
              type: ActionTypes.fetchPlural('post'),
              payload: payloadCollection(collection, PayloadStates.ERROR_FETCHING, error, combinedQuery),
              query: combinedQuery
            });
          });

          return dispatch({
            type: ActionTypes.fetchPlural('post'),
            payload: payloadCollection(collection, PayloadStates.FETCHING, null, combinedQuery),
            query: combinedQuery
          });
        };
      };
      `}/>

      <h4>
        Get
      </h4>

      <Markdown type="sh" text={`
      lore extract action post/get
      `}/>

      <Markdown text={`
      var _ = require('lodash');
      var ActionTypes = require('lore-utils').ActionTypes;
      var PayloadStates = require('lore-utils').PayloadStates;
      var payload = require('lore-utils').payload;

      /*
       * Blueprint for Get method
       */
      module.exports = function get(modelId) {
        return function(dispatch) {
          var Model = lore.models.post;
          var model = new Model({
            id: modelId
          });

          model.fetch().then(function() {
            dispatch({
              type: ActionTypes.update('post'),
              payload: payload(model, PayloadStates.RESOLVED)
            });
          }).catch(function(response) {
            var error = response.data;

            if (response.status === 404) {
              dispatch({
                type: ActionTypes.update('post'),
                payload: _.merge(payload(model), {
                  state: PayloadStates.NOT_FOUND,
                  error: error
                })
              });
            } else {
              dispatch({
                type: ActionTypes.update('post'),
                payload: payload(model, PayloadStates.ERROR_FETCHING, error)
              });
            }
          });

          return dispatch({
            type: ActionTypes.add('post'),
            payload: payload(model, PayloadStates.FETCHING)
          });
        };
      };
      `}/>

      <h4>
        Update
      </h4>

      <Markdown type="sh" text={`
      lore extract action post/update
      `}/>

      <Markdown text={`
      var _ = require('lodash');
      var ActionTypes = require('lore-utils').ActionTypes;
      var PayloadStates = require('lore-utils').PayloadStates;

      /*
       * Blueprint for Update method
       */
      module.exports = function update(model, params) {
        return function(dispatch) {
          var Model = lore.models.post;
          var proxyModel = new Model(model.data);
          proxyModel.set(params);

          proxyModel.save().then(function() {
            dispatch({
              type: ActionTypes.update('post'),
              payload: _.merge(model, {
                data: proxyModel.toJSON(),
                state: PayloadStates.RESOLVED
              })
            });
          }).catch(function(response) {
            var error = response.data;

            if (response.status === 404) {
              dispatch({
                type: ActionTypes.update('post'),
                payload: _.merge(model, {
                  state: PayloadStates.NOT_FOUND,
                  error: error
                })
              });
            } else {
              dispatch({
                type: ActionTypes.update('post'),
                payload: _.merge(model, {
                  data: proxyModel.toJSON(),
                  state: PayloadStates.ERROR_UPDATING,
                  error: error
                })
              });
            }
          });

          return dispatch({
            type: ActionTypes.update('post'),
            payload: _.merge(model, {
              data: proxyModel.toJSON(),
              state: PayloadStates.UPDATING
            })
          });
        };
      };
      `}/>

      <h4>
        All Actions
      </h4>

      <Markdown type="sh" text={`
      lore extract action post
      `}/>

      <Markdown type="sh" text={`
      src
        actions
          post
            create
            destroy
            find
            get
            update
      `}/>


    </Template>
  )
};
