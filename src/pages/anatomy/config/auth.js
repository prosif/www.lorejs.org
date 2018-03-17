import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Anatomy';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        /config/auth.js
      </h1>

      <p>
        This is the configuration file for <code>lore-hook-auth</code> and is where you define overrides
        for the default authentication behaviors.
      </p>
      <p>
        New projects include a <code>currentUser</code> model, and the <code>lore-hook-auth</code> hook will
        generate an action called <code>currentUser</code> that will fetch the user, and a reducer
        called <code>currentUser</code> that will store the result of that action.
      </p>
      <p>
        This file let's you control the name of the model, action and reducer used for fetching and storing the
        current user.
      </p>

      <h2>
        Configuration
      </h2>

      <h3>
        modelName
      </h3>
      <p>
        The name of the model with a URL property set to the endpoint that can return the current user.
      </p>
      <Markdown text={`
      modelName: 'currentUser'
      `}/>

      <h3>
        reducerName
      </h3>
      <p>
        The name of the reducer that should be created that is responsible for storing the current user. This
        defaults to the name of the model.
      </p>
      <Markdown text={`
      reducerName: 'currentUser'
      `}/>

      <h3>
        actionName
      </h3>
      <p>
        The name of the action that should be created that is responsible for fetching the current user. This
        defaults to the name of the model.
      </p>
      <Markdown text={`
      actionName: 'currentUser'
      `}/>
    </Template>
  )
};
