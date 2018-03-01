import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/Quickstart';
import LanguagePreference from '../../components/LanguagePreference';
import tutorialImage from '../../assets/images/quickstart/lore-tutorial-twitter.png';

export default (props) => {
  return (
    <Template>
      <h1>
        Introduction
      </h1>
      <p>
        This quickstart is intended to provide a fast-paced introduction to Lore, to give you a sense of what the
        framework feels like and whether it's something you want to invest more time in. Explanations for the
        opinions expressed in the framework will be left for elsewhere in the documentation.
      </p>

      <LanguagePreference />

      <h3>
        What You'll Build
      </h3>
      <p>
        This is the application we'll be building. It is a Twitter-like app, pre-populated with characters and
        quotes from <a href="https://en.wikipedia.org/wiki/Chrono_Trigger">Chrono Trigger</a>.
      </p>

      <br />

      <img className="drop-shadow" src={tutorialImage} alt="Lore Tutorial" />

      <h3>
        Concepts Covered
      </h3>
      <p>
        This quickstart will cover the following concepts:
      </p>
      <ul>
        <li>Creating and building a React application</li>
        <li>Layout out your application visuals with mock data</li>
        <li>Routing</li>
        <li>Fetching data from an API server</li>
        <li>Populating your application with real data</li>
        <li>Launching dialogs</li>
        <li>Authentication (logging users in)</li>
        <li>Authorization (restricting what users see)</li>
        <li>Resolving breaking API changes</li>
        <li>Pagination</li>
        <li>Infinite Scrolling</li>
        <li>Filtering</li>
      </ul>

      <h3>
        Questions/Issues
      </h3>
      <p>
        If you have any questions or concerns while navigating through the quickstart,
        please <a href="https://github.com/lore/lore/issues">submit an issue on GitHub</a>. Your
        feedback is appreciated as a way to make the quickstart better.
      </p>

      <h2>
        Next Steps
      </h2>
      <p>
        Ready? Let's <Link to="/quickstart/setup/overview/">get started</Link>!
      </p>
    </Template>
  );
};
