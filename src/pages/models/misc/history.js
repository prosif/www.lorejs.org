import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        History
      </h1>
      <p>
        The interface for Models is <em>heavily</em> inspired by <a href="http://backbonejs.org">Backbone</a>, and
        largely mirrors the implementation of <a href="http://backbonejs.org/#Model">Backbone.Model</a> with the
        following exceptions:
      </p>

      <ul>
        <li>
          This library should not be used to pass data through your application. It is intended solely as an AJX
          abstraction tier. JSON data goes in, a request in made, and the response is serialized back into JSON
          and <em>then</em> emitted from an action for the reducers to pick up.
        </li>
        <li>
          All event emitters have been removed.  Again, this is purely an abstraction tier, not a way to store
          your data.
        </li>
        <li>
          The jQuery.ajax has been removed in favor of Axios, which also facilitates testing in a non-browser
          environment (i.e. Node).
        </li>
      </ul>
    </Template>
  );
};
