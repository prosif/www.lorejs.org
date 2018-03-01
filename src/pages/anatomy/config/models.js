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
        config/models.js
      </h1>

      <p>
        This file is connected to the <code>lore-hook-models</code> hook and allows you to map models to connections.
      </p>

      <h2>
        Purpose
      </h2>
      <p>
        If you're only consuming data from a single API, you'll never need to modify this file. But once you start consuming
        data from multiple APIs, you'll need to tell Lore which models are associated with each connection.
      </p>

      <h2>
        Example Config File
      </h2>

      <Markdown text={`
      module.exports = {

        defaultConnection: 'default'

        connectionModelMap: {
          default: [],
          v1: [
            'currentUser',
            'author'
          ],
          v2: [
            'book',
            'publisher'
          ]
        }

      };
      `}/>

      <h2>
        Configuration Options
      </h2>
      <h4>
        defaultConnection
      </h4>
      <p>
        The default API connection that models should use if they have no explicit mapping.
      </p>

      <h4>
        connectionModelMap
      </h4>
      <p>
        If your application interacts with multiple APIs, create a connection for each API and then define which models
        are associated with each connection here.
      </p>

      <p>
        In the example above, the models <code>currentUser</code> and <code>author</code> use the <code>v1</code> connection, while the <code>book</code> and <code>publisher</code>
        models use the <code>v2</code> connection. All other models use the <code>default</code> connection.
      </p>
    </Template>
  )
};
