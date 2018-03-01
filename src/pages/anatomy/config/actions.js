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
        config/actions.js
      </h1>

      <p>
        This file is connected to the <code>lore-hook-actions</code> hook and overrides the default action behaviors.
      </p>

      <h2>
        Purpose
      </h2>
      <p>
        This config is currently only relevant if your app requires the use of WebSockets while performing optimistic updates,
        as this use case requires sending a unique client-side generated ID to the server.
      </p>

      <p>
        In addition to the configuration options below, there are also plans to support disabling the blueprints and allowing
        you to provide a custom override for each blueprint without having to override the entire <code>lore-hook-actions</code> hook.
      </p>

      <h2>
        Example Config File
      </h2>

      <Markdown text={`
      module.exports = {
        addCidToBody: false,
        cidBodyAttributeName: 'cid'
      };
      `}/>

      <h2>
        Configuration Options
      </h2>
      <h4>
        addCidToBody
      </h4>
      <p>
        Determines whether the client-side id (the cid attribute in a model) is sent to the server when creating data. This
        is not necessary when interacting with REST APIs as the actions can associate the associate the request and response,
        but when performing optimistic updates using WebSockets it is necessary to send a client-generated ID to the server
        in order to associate the data created on the client side with the data broadcasted by the server.
      </p>

      <h4>
        cidBodyAttributeName
      </h4>
      <p>
        This field let's you change the name of the cid field sent to the server when performing optimistic updates through
        WebSockets. By default the property send to the server is called <code>cid</code>, matching the name of the attribute on the
        client-side, but you can change if you need to to match the API.
      </p>
    </Template>
  )
};
