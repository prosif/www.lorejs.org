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
        config/auth.js
      </h1>

      <p>
        This file is connected to the <code>lore-hook-auth</code> hook and overrides the default action behaviors.
      </p>

      <h2>
        Purpose
      </h2>
      <p>
        This config file let's you control the name of the model, action and reducer used for fetching and storing the
        current user.
      </p>

      <p>
        New projects include a <code>currentUser</code> model, and the <code>lore-hook-auth</code> hook will generate an action called <code>currentUser</code>
        that will fetch the user, and a reducer called <code>currentUser</code> that will store the result of that action.
      </p>

      <h2>
        Example Config File
      </h2>

      <Markdown text={`
      module.exports = {
        modelName: 'currentUser'
        reducerName: 'currentUser'
        actionName: 'currentUser'
      };
      `}/>

      <h2>
        Configuration Options
      </h2>
      <h4>
        modelName
      </h4>
      <p>
        The name of the model with a URL property set to the endpoint that can return the current user.
      </p>

      <h4>
        reducerName
      </h4>
      <p>
        The name of the reducer that should be created that is responsible for storing the current user. This defaults to
        the name of the model.
      </p>

      <h4>
        actionName
      </h4>
      <p>
        The name of the action that should be created that is responsible for fetching the current user. This defaults to
        the name of the model.
      </p>
    </Template>
  )
};
