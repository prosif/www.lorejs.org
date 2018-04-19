import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        get
      </h1>
      <p>
        This ...
      </p>

      <h3>
        Default Implementation
      </h3>
      <p>
        The default implementation looks like this:
      </p>
      <Markdown type="jsx" text={`
      // The default model for a collection is just a **Backbone.Model**.
      // This should be overridden in most cases.
      model: Model,
      `}/>
    </Template>
  );
};
