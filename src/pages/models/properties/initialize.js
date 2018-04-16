import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        initialize
      </h1>
      <p>
        initialize() is  especially useful for API endpoints with deeply nested URLs to help build the url later.
        It's called once, during construction of the model
      </p>

      <h3>
        Default
      </h3>

      <Markdown type="jsx" text={`
      // Initialize is an empty function by default. Override it with your own
      // initialization logic.
      initialize: function() {},
      `}/>
    </Template>
  );
};
