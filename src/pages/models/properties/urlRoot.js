import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        urlRoot
      </h1>

      <p>
        The endpoint used for CRUD operations.  The real url is build from this urlRoot + information like "if
        calling model.save() and there's already a model.id property, the model must already exist, so we should
        make a call to `PUT http://localhost:3000/api/todos/:id` to update the model. If no model.id exists, then
        we should make a call to `POST http://localhost:3000/api/todos` to create the model.
      </p>
      <p>
        // The endpoint used for CRUD operations. The final url used when making AJAX
        // requests is "apiRoot + urlRoot". Lore sets this value automatically based
        // on the models name and the pluralization setting, but you can override if
        // if your endpoint does not match your model name.
      </p>

      <h3>
        Default
      </h3>

      <Markdown type="jsx" text={`
      urlRoot: '',
      `}/>

      <Markdown type="jsx" text={`
      // The endpoint used for CRUD operations. The final url used when making AJAX
      // requests is "apiRoot + urlRoot". Lore sets this value automatically based
      // on the models name and the pluralization setting, but you can override if
      // if your endpoint does not match your model name.
      urlRoot: '/posts',

      // This property can also be a function, which is necessary when your API endpoints
      // use nested urls like "/authors/:authorId/posts/123", since it needs to be calculated
      // before the AJAX request goes out
      urlRoot: function() {
        return "/authors/" + this.author.id + "/posts/123";
      },
      `}/>
    </Template>
  );
};
