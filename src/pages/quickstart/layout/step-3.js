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
        Step 3: Add the Header
      </h1>

      <p>
        In this step we're going to layout the application and add a Header at the top of the page.
      </p>

      <QuickstartBranch branch="layout.3" />

      <h1>
        Generate the Header Component
      </h1>

      <p>
        The Lore CLI includes a number of commands to create various types of project files. One of those commands is
        <code>generate</code>, and we'll be using it to generate the <code>Header</code> component.
      </p>

      <p>
        Run the following command from the CLI:
      </p>

      <Markdown type="sh" text={`
      lore generate component Header
      `}/>

      <p>
        This will generate a component called <code>Header</code> and place it at <code>src/components/Header.js</code>. The syntax of this file
        will match whichever version of JavaScript you specified when you created the project (ES5, ES6 or ESNext) and will look
        like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');

        module.exports = React.createClass({
          displayName: 'Header',

          propTypes: {},

          render: function() {
            return (
              <div></div>
            );
          }
        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';

        class Header extends Component {

          constructor(props) {
            super(props);

            // Set your initial state here
            // this.setState = {};

            // Bind your custom methods so you can access the expected 'this'
            // this.myCustomMethod = this.myCustomMethod.bind(this);
          }

          render() {
            return (
              <div></div>
            )
          }
        }

        Header.propTypes = {};

        export default Header;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';

        class Header extends Component {

          static propTypes = {}

          render() {
            return (
              <div></div>
            );
          }
        }

        export default Header;
        `}/>
      </CodeTabs>

      <blockquote>
        <p>
          If you're interested in learning more about the <code>generate</code> command see <Link to="/cli/generate/component/">the docs for the CLI</Link>.
        </p>
      </blockquote>

      <h3>
        Modify the Header Component
      </h3>

      <p>
        Now that we've created the skeleton for the Header component, modify the render function to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        // src/components/Header.js
        ...
          render: function() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <div className="navbar-brand">
                      Lore Quickstart
                    </div>
                  </div>
                </div>
              </nav>
            );
          }
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        // src/components/Header.js
        ...
          render() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <div className="navbar-brand">
                      Lore Quickstart
                    </div>
                  </div>
                </div>
              </nav>
            );
          }
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        // src/components/Header.js
        ...
          render() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <div className="navbar-brand">
                      Lore Quickstart
                    </div>
                  </div>
                </div>
              </nav>
            );
          }
        ...
        `}/>
      </CodeTabs>


      <h3>
        Add the Header to the Layout
      </h3>

      <p>
        Finally we need to modify the output of the <code>Layout</code> component so the Header gets rendered to the browser. Import the
        <code>Header</code> component into <code>Layout</code> and update the render function for <code>Layout</code> to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        // src/components/Layout.js
        var Header = require('./Header');
        ...
          render: function() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-offset-3 col-md-6">
                      {/* Feed will go here */}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        // src/components/Layout.js
        import Header from './Header';
        ...
          render() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-offset-3 col-md-6">
                      {/* Feed will go here */}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        // src/components/Layout.js
        import Header from './Header';
        ...
          render() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-offset-3 col-md-6">
                      {/* Feed will go here */}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        ...
        `}/>
      </CodeTabs>


      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/layout/step-3.png" />

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

        module.exports = React.createClass({
          displayName: 'Header',

          render: function() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <div className="navbar-brand">
                      Lore Tutorial
                    </div>
                  </div>
                </div>
              </nav>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';

        class Header extends Component {

          render() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <div className="navbar-brand">
                      Lore Quickstart
                    </div>
                  </div>
                </div>
              </nav>
            );
          }

        }

        export default Header;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';

        class Header extends Component {

          render() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <div className="navbar-brand">
                      Lore Quickstart
                    </div>
                  </div>
                </div>
              </nav>
            );
          }

        }

        export default Header;
        `}/>
      </CodeTabs>

      <h3>
        src/components/Layout.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var Header = require('./Header');

        module.exports = React.createClass({
          displayName: 'Layout',

          render: function() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-offset-3 col-md-6">
                      {/* Feed will go here */}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';
        import Header from './Header';

        class Layout extends Component {

          render() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-offset-3 col-md-6">
                      {/* Feed will go here */}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        }

        export default Layout;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import Header from './Header';

        class Layout extends Component {

          render() {
            return (
              <div>
                <Header />
                <div className="container">
                  <div className="row">
                    <div className="col-md-offset-3 col-md-6">
                      {/* Feed will go here */}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

        }

        export default Layout;
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to <Link to="../../routing/overview/">setup routing</Link>.
      </p>
    </Template>
  );
};