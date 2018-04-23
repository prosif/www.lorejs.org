import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/LoreHookConnections';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        lore-hook-connections
      </h1>
      <p>
        Source code for this hook can be found on GitHub <a href="https://github.com/lore/lore/tree/master/packages/lore-hook-connections">at this link</a>.
      </p>

      <h2>
        Purpose
      </h2>

      <p>
        A lore hook that stores connection information to support communicating with multiple APIs.
      </p>

      <h2>
        Config
      </h2>

      <Markdown text={`
      module.exports = {

        default: {

          /**
           * The URL of the API server.
           *
           * If your API is behind server route like '/api', then make sure to include
           * that in url in the apiRoot (e.g. 'https://www.example.com/api')
           */

          // apiRoot: 'https://api.example.com',

          /**
           * Pluralization setting used by the framework when composing API endpoints.
           *
           * Model names in Lore are singular, but many APIs used a plural convention
           * when making requests. Use this setting to tell the framework whether it
           * should convert your model names to a plural form when making API calls.
           *
           * Here is an example of how this setting would affect the endpoints for
           * a model named 'book':
           *
           * pluralize | endpoint
           * ---------------------------
           *   true    |  /books
           *   false   |  /book
           */

          // pluralize: true,

          /**
           * Casing style used by the framework when composing API endpoints.
           *
           * Since models are camelCased in Lore, the framework assumed the server uses
           * camelCasing as well. For example, if you have a model called <code>bookAuthor</code>,
           * and pluralization is turned off, the framework will assume the endpoint is
           * located at '/bookAuthor'. If the endpoint is something else, like '/book_author'
           * you will need to tell the framework to modify its convention.
           *
           * casingStyle |  endpoint
           * ---------------------------
           *   camel     |  /book_author
           *   kebab     |  /book-author
           *   pascal    |  /bookAuthor
           *   snake     |  /BookAuthor
           */

          // casingStyle: 'camel',

          /**
           * Headers that should be applied to all network requests.
           *
           * This function will be called before every network request, and any
           * keys you provide will be added as a header in the network request.
           *
           * A common use would be sending an authorization token with each request:
           *
           * headers: function() {
           *   return {
           *     Authorization: 'JWT <token>'
           *   };
           * }
           */

          // headers: function() {
          //   return {};
          // },


          /**
           * Define properties that should apply to all models here.
           * You can override all of these methods on a per-model basis.
           */

          models: {

            properties: {

              /**
               * Use this function to control how the client id (cid) of each model
               * is generated.
               *
               * By default all models have a cid that looks like 'c1', 'c2', etc.
               * This cid is required to support optimistic updates against a REST API,
               * and the format is intentionally concise in order to make it easy for
               * developers to read and remember (mostly for debugging purposes).
               *
               * When your application integrates support for WebSockets though, this
               * cid format is no longer sufficient, as supporting optimistic updates
               * requires sending the cid to the API server, which requires it to be
               * globally unique.
               *
               * This function exists so that you can modify the unique id and convert
               * it to a UUID when required. A good library to do that can be found here:
               * https://github.com/kelektiv/node-uuid
               */

              // generateCid: function() {
              //   return _.uniqueId('c');
              // },

              /**
               * Use this function to transform the server response before using it
               * in the application (such as adding, removing or modifying properties)
               */

              // parse: function(attributes) {
              //   return attributes;
              // }

            }

          },

          /**
           * Define properties that should apply to all collections here.
           * You can override all of these methods on a per-collection basis.
           */

          collections: {

            properties: {

              /**
               * Use this function to transform the server response before using it
               * in the application (such as adding, removing or modifying properties)
               *
               * This method only gets called when making a request to a collection endpoint
               * like '/books'. Once it completes, each resource in the response will
               * automatically be processed by the parse method of the corresponding model.
               */

              // parse: function(attributes) {
              //   return attributes;
              // }

            }

          }

        }

      };
      `}/>

      <h2>
        Example Usage
      </h2>

      <p>
        Connections basically provide a way to store settings that should be applied to all models that communicate with a
        given endpoint. By default this connection is called <code>default</code> but you can rename it to whatever you want.
      </p>

      <p>
        With this approach supporting multiple APIs is easy, as you can add additional connections and map them to models.
        For example, let's say we have an app developed using the default connection, and the API started migrating to v2.
        In this case, we could rename our default connection to <code>v1</code> and add a second connection for <code>v2</code> like this:
      </p>

      <Markdown text={`
      // config/connections.js
      {
        v1: {...},
        v2: {...}
      }
      `}/>

      <p>
        Then in <code>config/models.js</code> we rename the default connection and provide a map of which models use the non-default
        connection like this:
      </p>

      <Markdown text={`
      // config/models.js
      {
        defaultConnection: 'v1',
        connectionModelMap: {
          // v1: [...optional...],
          v2: [
            'post',
            'comment',
            'modelThree'
          ]
        }
      }
      `}/>

      <p>
        If you want to be explicit you can map all models, but models are assumed to be associated with the defaultConnection
        unless otherwise declared. This also gives a single location in the project to view which models are connected to
        which API endpoints.
      </p>

      <h4>
        Specify casing style of API servers
      </h4>

      <p>
        Currently the project assumes the API server uses a camelCase casing style, such as <code>/api/userComments</code> or
        <code>/api/bookAuthors</code>. But some APIs (like Django and Rails) use a snake_case style, like <code>/api/user_comments</code>, and others
        use a kebab-case style like <code>/api/user-comments</code>.
      </p>

      <Markdown text={`
      {
        camel: '/api/userComments',
        kebab: '/api/user-comments',
        snake: '/api/user_comments',
        pascal: '/api/UserComments'
      }
      `}/>

      <p>
        Generally speaking, camel and pascal are the same thing, as URLs are case-insensitive, but the user way to prefer to
        see networks requests in one style of the other, so both are supported.
      </p>
    </Template>
  )
};
