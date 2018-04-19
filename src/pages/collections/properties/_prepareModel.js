import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        _prepareModel
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
      // Prepare a hash of attributes (or other model) to be added to this
      // collection.
      _prepareModel: function(attrs, options) {
        options = options ? _.clone(options) : {};
        options.collection = this;
        const model = new this.model(attrs, options);
        return model;
      }
      `}/>
    </Template>
  );
};


