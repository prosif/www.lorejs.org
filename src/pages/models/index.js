import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/Models';
import Markdown from '../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        Introduction
      </h1>
      <p>
        Models are an abstraction for interacting with a REST API endpoint that make it easier to create, update,
        destroy or retrieve a resource.
      </p>
      <p>
        The functionality is provided by
        the <a href="https://github.com/lore/lore/tree/master/packages/lore-models">lore-models</a> package.
      </p>

      <blockquote>
        <p>
          The interface and behavior for Models is <em>heavily</em> inspired
          by <a href="http://backbonejs.org/#Model">Backbone.Model</a>, and you can learn more the reasons
          why <Link to="/models/misc/history">here</Link>.
        </p>
      </blockquote>
    </Template>
  );
};
