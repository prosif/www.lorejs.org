import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Quickstart';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        Step 1: Convert Header Title to Link
      </h1>

      <p>
        In this step we'll use <code>react-router</code> to convert the title in the header to a clickable link that will always take the
        user back to the homepage. We won't make use of the functionality in this quickstart, but it's a good practice to follow.
      </p>

      <QuickstartBranch branch="routing.1" />

      <h3>
        Update the Header
      </h3>
      <p>
        Open the <code>Header</code> component and find this line:
      </p>

      <Markdown type="html" text={`
      <div className="navbar-brand">
        Lore Quickstart
      </div>
      `} />

      <p>
        Next import <code>react-router</code>, and change the <code>div</code> tag to a React Router <code>Link</code> tag. Finally, add a <code>to</code> property and
        provide the root url <code>/</code>.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var Router = require('react-router');
        ...
        <Router.Link className="navbar-brand" to="/">
          Lore Quickstart
        </Router.Link>
        `} />
        <CodeTab syntax="ES6" text={`
        import { Link } from 'react-router';
        ...
        <Link className="navbar-brand" to="/">
          Lore Quickstart
        </Link>
        `} />
        <CodeTab syntax="ESNext" text={`
        import { Link } from 'react-router';
        ...
        <Link className="navbar-brand" to="/">
          Lore Quickstart
        </Link>
        `} />
      </CodeTabs>

      <h3>
        Visual Check-in
      </h3>
      <p>
        If everything went well, your application will look the same visually, but now the title in the header will be a
        clickable link that takes the user back to the homepage.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/routing/step-1.png" />

      <h2>
        Code Changes
      </h2>
      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/components/Header.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var Router = require('react-router');

        module.exports = React.createClass({
          displayName: 'Header',

          render: function() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <Router.Link className="navbar-brand" to="/">
                      Lore Quickstart
                    </Router.Link>
                  </div>
                </div>
              </nav>
            );
          }
        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component } from 'react';
        import { Link } from 'react-router';

        class Header extends Component {

          render() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to="/">
                      Lore Quickstart
                    </Link>
                  </div>
                </div>
              </nav>
            );
          }

        }

        export default Header;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component } from 'react';
        import { Link } from 'react-router';

        class Header extends Component {

          render() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to="/">
                      Lore Quickstart
                    </Link>
                  </div>
                </div>
              </nav>
            );
          }

        }

        export default Header;
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>
      <p>
        Next we're going to create a <code>Feed</code> component for displaying tweets and <Link to="../step-2/">add it to the routes</Link>.
      </p>
    </Template>
  )
};