import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        url
      </h1>
      <p>
        url() is used to build the url for the request if the API follows simple/flat conventions, there's rarely a
        need to override it but for APIs without clear conventions, this function is quite useful. The code below is
        Backbone's default implementation (for reference)
      </p>

      <h3>
        Default
      </h3>

      <Markdown type="jsx" text={`
      // Default URL for the model's representation on the server -- if you're
      // using Backbone's restful methods, override this to change the endpoint
      // that will be called.
      url: function() {
        const base =
          _.result(this, 'urlRoot') ||
          _.result(this.collection, 'url') ||
          urlError();
        if (this.isNew()) return base;
        const id = this.get(this.idAttribute);
        return base.replace(/[^\\/]$/, '$&/') + encodeURIComponent(id);
      },
      `}/>
    </Template>
  );
};
