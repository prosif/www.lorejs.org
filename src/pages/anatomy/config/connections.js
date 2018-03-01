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
        config/connections.js
      </h1>

      <p>
        This file is connected to the <code>lore-hook-connections</code> hook and overrides the default action behaviors.
      </p>

      <h2>
        Purpose
      </h2>
      <p>
        Lore is designed with the intention of consuming multiple API endpoints. But since APIs can vary drastically in
        terms of their conventions and behavior, there needs to be a way to describe the interface for each API. Lore calls
        these descriptions <code>connections</code>.
      </p>

      <h2>
        Example Config File
      </h2>
      <p>
        New projects include a single connection named <code>default</code>, and the default config for new projects looks roughly like this:
      </p>

      <Markdown text={`
      module.exports = {

        default: {

          apiRoot: 'https://api.example.com',
          pluralize: true,
          casingStyle: 'camel',
          headers: function() {
            return {};
          },

          models: {
            properties: {
              parse: function(attributes) {
                return attributes;
              }
            }
          },

          collections: {
            properties: {
              parse: function(attributes) {
                return attributes;
              }
            }
          }

        }

      };
      `}/>

      <p>
        The name for the connection (<code>default</code>) comes from the name of the key, and the config translates to this statement:
      </p>

      <blockquote>
        <p>
          The API for the default connection is located at <code>https://api.example.com</code>. The names of the endpoints follow a
          camelCasing strategy and are pluralized. There are no default headers that need to be sent, and there is no need
          to parse the server response for any endpoints before we consume those resources in the application.
        </p>
      </blockquote>

      <p>
        If you were interacting with a second API, such as GitHub's API, then you would create a second config for GitHub like
        this:
      </p>

      <Markdown text={`
      module.exports = {

        default: {
          // ...config options...
        },

        github: {

          apiRoot: 'https://api.github.com',
          pluralize: true,
          casingStyle: 'camel',

          collections: {
            properties: {
              parse: function(attributes) {
                return attributes.items;
              }
            }
          }

        }

      };
      `}/>

      <p>
        Once again, the name for the connection (<code>github</code>) comes from the name of the key, and the config translates to this
        statement:
      </p>

      <p>
        The GitHub API is located at <code>https://api.github.com</code>. The names of the endpoints follow a camelCasing strategy
        and are pluralized. When making requests to "collection" endpoints (like <code>/repositories</code>) the resources we want
        are stored inside the <code>items</code> attributes of the response.
      </p>

      <h2>
        Configuration Options
      </h2>
      <h4>
        apiRoot
      </h4>
      <p>
        The URL of the API server.
      </p>

      <p>
        If your API is behind a server route like <code>/api</code>, then make sure to include
        that in url in the apiRoot, e.g. <code>https://www.example.com/api</code>
      </p>

      <h4>
        pluralize
      </h4>
      <p>
        Pluralization setting used by the framework when composing API endpoints.
      </p>

      <p>
        Model names in Lore are singular, but many APIs used a plural convention
        when making requests. Use this setting to tell the framework whether it
        should convert your model names to a plural form when making API calls.
      </p>

      <p>
        Here is an example of how this setting would affect the endpoints for
        a model named 'book':
      </p>

      <Markdown type="sh" text={`
      pluralize | endpoint
      ---------------------
        true    |  /books
        false   |  /book
      `}/>

      <h4>
        casingStyle
      </h4>
      <p>
        Casing style used by the framework when composing API endpoints.
      </p>

      <p>
        Since models are camelCased in Lore, the framework assumed the server uses
        camelCasing as well. For example, if you have a model called <code>bookAuthor</code>,
        and pluralization is turned off, the framework will assume the endpoint is
        located at <code>/bookAuthor</code>. If the endpoint is something else, like <code>/book_author</code>
        you will need to tell the framework to modify its convention.
      </p>

      <Markdown type="sh" text={`
      casingStyle |  endpoint
      ---------------------------
        camel     |  /book_author
        kebab     |  /book-author
        pascal    |  /bookAuthor
        snake     |  /BookAuthor
      `}/>

      <h4>
        headers
      </h4>
      <p>
        Headers that should be applied to all network requests. This function will be called before every network request,
        and any keys you provide will be added as a header in the network request.
      </p>

      <p>
        A common use would be sending an authorization token with each request:
      </p>

      <h4>
        models
      </h4>
      <p>
        This establishes the default configuration for all <code>models</code> that use this connection. You can pass in any options that
        are supported by <code>models</code>. For a list of options, see the <Link to="/architecture/models/">model documentation</Link>.
      </p>

      <h4>
        collections
      </h4>
      <p>
        This establishes the default configuration for all <code>collections</code> that use this connection. You can pass in any options that
        are supported by <code>collections</code>. For a list of options, see the <Link to="/architecture/collections/">collection documentation</Link>.
      </p>

    </Template>
  )
};
