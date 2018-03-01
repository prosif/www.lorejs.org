import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Quickstart';

export default (props) => {
  return (
    <Template>
      <h1>
        Setup: Overview
      </h1>

      <p>
        In this section we'll learn how to create a new application, build it, and serve it in the browser for viewing.
      </p>

      <p>
        At the end of this section your application will look like this:
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/setup/step-3.png" />

      <h2>
        Next Steps
      </h2>

      <p>
        Ready? Let's <Link to="/quickstart/setup/step-1/">get started</Link>!
      </p>

    </Template>
  )
};
