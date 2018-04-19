import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        fetch
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
      // Fetch the default set of models for this collection, resetting the
      // collection when they arrive.
      fetch: function(options) {
        options = _.extend({ parse: true }, options);

        // Reset the default models
        const collection = this;
        options.success = function(attributes) {
          collection.reset(attributes, options);
        };

        return this.sync('read', this, options);
      },
      `}/>
    </Template>
  );
};
