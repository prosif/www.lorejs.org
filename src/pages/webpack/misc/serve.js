import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Webpack';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        Testing Production Build Locally
      </h1>
      <p>
        It is often useful to be able to test the production build locally, before deploying it to the remote
        server. One simple way to do this is by install the <a href="https://github.com/tj/serve">serve</a> library,
        using <code>npm install -g serve</code>.
      </p>
      <p>
        Once it's installed, you can simply run <code>serve dist --port 3000</code> and then you can navigate
        to <code>localhost:3000</code> to view the production version of the application.
      </p>
    </Template>
  );
};
