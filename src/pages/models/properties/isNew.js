import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        isNew
      </h1>
      <p>
        This method returns or false depending on whether or not the model has an <code>id</code>, which is
        determined by whether there is an attribute with a name that matches the <code>idAttribute</code>.
      </p>
      <blockquote>
        <p>
          This method is used by <code>save()</code> to determine whether
          to <code>create</code> or <code>update</code> the resource.
        </p>
      </blockquote>

      <h3>
        Default Implementation
      </h3>
      <p>
        The default implementation looks like this:
      </p>
      <Markdown type="jsx" text={`
      isNew: function() {
        return !this.has(this.idAttribute);
      },
      `}/>
    </Template>
  );
};
