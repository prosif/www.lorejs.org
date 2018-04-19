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
        This ...
      </p>

      <h3>
        Default Implementation
      </h3>
      <p>
        The default implementation looks like this:
      </p>
      <Markdown type="jsx" text={`
      // Initialize is an empty function by default. Override it with your own
      // initialization logic.
      initialize: function() {},
      `}/>
    </Template>
  );
};
