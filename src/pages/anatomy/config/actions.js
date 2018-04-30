import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Anatomy';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        /config/actions.js
      </h1>
      <p>
        This is the configuration file for <code>lore-hook-actions</code> and is where you define overrides
        for the default action behaviors.
      </p>
      <p>
        You can learn more about the configuration options <Link to="/hooks/lore-hook-actions/">here</Link>.
      </p>

      <h2>
        Default Config
      </h2>
      <p>
        The default config is shown below.
      </p>
      <Markdown text={`
      export default {

        /**
         * Specify whether models should be normalized.
         */

        normalize: true,

        /**
         * Blueprints are used to provide models with a default set of actions for
         * interacting with a REST API. If you want to modify the behavior of those
         * actions you can provide your own implementation here.
         */

        blueprints: {
          create: function() { /*...*/ },
          destroy: function() { /*...*/ },
          find: function() { /*...*/ },
          get: function() { /*...*/ },
          update: function() { /*...*/ }
        },

        /**
         * Determines whether the client-side id (the cid attribute in a model)
         * is sent to the server when creating data. This is not necessary when
         * interacting with REST APIs as the actions can associate the associate
         * the request and response, but when performing optimistic updates using
         * WebSockets it is necessary to send a client-generated ID to the server
         * in order to associate the data created on the client side with the data
         * broadcasted by the server.
         */

        addCidToBody: false,

        /**
         * This field let's you change the name of the cid field sent to the server
         * when performing optimistic updates through WebSockets. By default the
         * property send to the server is called \`cid\`, matching the name of the attribute
         * on the client-side, but you can change it if you need it to match the API.
         */

        cidBodyAttributeName: 'cid'

      }
      `}/>
    </Template>
  )
};
