import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Models';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        parse
      </h1>
      <p>
        // parse is called whenever a model's data is returned by the server, in fetch,
        // and save. The function is passed the raw response object, and should return
        // the attributes hash to be set on the model.
      </p>

      <h3>
        Default
      </h3>

      <Markdown type="jsx" text={`
      // **parse** converts a response into the hash of attributes to be \`set\` on
      // the model. The default implementation is just to pass the response along.
      parse: function(resp, options) {
        return resp;
      },
      `}/>

      <Markdown type="jsx" text={`
      // parse() is called whenever a model's data is returned by the server, in fetch,
      // and save. The function is passed the raw response object, and should return
      // an object of values to be set on the model.
      // Example: if your server response looks like this:
      //
      // {
      //   id: "123",
      //   title: 'Bacon is yummy"
      // }
      //
      // then you don't need to override this function. But if your server response
      // looks like this:
      //
      // {
      //   data: {
      //     id: "123"
      //     title: "Bacon is yummy"
      //   }
      // }
      //
      // then you'll need to override parse() to extract the values from data. This
      // method is also extremely useful as a way to absorb breaking API changes and
      // prevent them from rippling through all the components in your application.
      `}/>
    </Template>
  );
};
