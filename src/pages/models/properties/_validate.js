import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        _validate
      </h1>

      <h3>
        Default
      </h3>

      <Markdown type="jsx" text={`
      // Run validation against the next complete set of model attributes,
      // returning \`true\` if all is well. Otherwise, fire an \`"invalid"\` event.
      _validate: function(attrs, options) {
        if (!options.validate || !this.validate) return true;
        attrs = _.extend({}, this.attributes, attrs);
        const error = this.validationError = this.validate(attrs, options) || null;
        if (!error) return true;
        return false;
      }
      `}/>
    </Template>
  );
};
