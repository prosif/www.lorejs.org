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
        Step 1: Add Create Button
      </h1>

      <p>
        In this step we're going to add a button to our application that will launch a dialog when the user clicks
        on it.
      </p>

      <QuickstartBranch branch="dialogs.1" />

      <h3>
        Add Create Button
      </h3>
      <p>
        Run this command to generate our <code>CreateButton</code> component:
      </p>

      <Markdown type="sh" text={`
      lore generate component CreateButton
      `}/>

      <p>
        Modify the component to look like this. We're going to add some styling and an <code>onClick</code> callback
        that will launch the create dialog. For now we'll just have the callback write a log to the console saying
        it was clicked.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';

        export default createReactClass({
          displayName: 'CreateButton',

          onClick: function() {
            console.log('Create tweet!');
          },

          render: function() {
            return (
              <button
                type="button"
                className="btn btn-primary btn-lg create-button"
                onClick={this.onClick}>
                +
              </button>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';

        class CreateButton extends React.Component {

          onClick() {
            console.log('Create tweet!');
          }

          render () {
            return (
              <button
                type="button"
                className="btn btn-primary btn-lg create-button"
                onClick={this.onClick}>
                +
              </button>
            );
          }

        }

        export default CreateButton;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';

        class CreateButton extends React.Component {

          onClick() {
            console.log('Create tweet!');
          }

          render () {
            return (
              <button
                type="button"
                className="btn btn-primary btn-lg create-button"
                onClick={this.onClick}>
                +
              </button>
            );
          }

        }

        export default CreateButton;
        `}/>
      </CodeTabs>

      <h3>
        Add Button to Header
      </h3>
      <p>
        Next open the <code>Header</code> component. Then import the <code>CreateButton</code> component and insert it
        into the render method:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import { Link } from 'react-router';
        import CreateButton from './CreateButton';

        export default createReactClass({
          displayName: 'Header',

          render: function() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to="/">
                      Lore Quickstart
                    </Link>
                  </div>
                  <CreateButton/>
                </div>
              </nav>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { Link } from 'react-router';
        import CreateButton from './CreateButton';

        class Header extends React.Component {

          render() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to="/">
                      Lore Quickstart
                    </Link>
                  </div>
                  <CreateButton/>
                </div>
              </nav>
            );
          }

        }

        export default Header;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { Link } from 'react-router';
        import CreateButton from './CreateButton';

        class Header extends React.Component {

          render() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to="/">
                      Lore Quickstart
                    </Link>
                  </div>
                  <CreateButton/>
                </div>
              </nav>
            );
          }

        }

        export default Header;
        `}/>
      </CodeTabs>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/dialogs/step-1.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/components/CreateButton.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';

        export default createReactClass({
          displayName: 'CreateButton',

          onClick: function() {
            console.log('Create tweet!');
          },

          render: function() {
            return (
              <button
                type="button"
                className="btn btn-primary btn-lg create-button"
                onClick={this.onClick}>
                +
              </button>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';

        class CreateButton extends React.Component {

          onClick() {
            console.log('Create tweet!');
          }

          render () {
            return (
              <button
                type="button"
                className="btn btn-primary btn-lg create-button"
                onClick={this.onClick}>
                +
              </button>
            );
          }

        }

        export default CreateButton;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component } from 'react';

        class CreateButton extends React.Component {

          onClick() {
            console.log('Create tweet!');
          }

          render () {
            return (
              <button
                type="button"
                className="btn btn-primary btn-lg create-button"
                onClick={this.onClick}>
                +
              </button>
            );
          }

        }

        export default CreateButton;
        `}/>
      </CodeTabs>

      <h3>
        src/components/Header.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import { Link } from 'react-router';
        import CreateButton from './CreateButton';

        export default createReactClass({
          displayName: 'Header',

          render: function() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to="/">
                      Lore Quickstart
                    </Link>
                  </div>
                  <CreateButton/>
                </div>
              </nav>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { Link } from 'react-router';
        import CreateButton from './CreateButton';

        class Header extends React.Component {

          render() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to="/">
                      Lore Quickstart
                    </Link>
                  </div>
                  <CreateButton/>
                </div>
              </nav>
            );
          }

        }

        export default Header;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { Link } from 'react-router';
        import CreateButton from './CreateButton';

        class Header extends React.Component {

          render() {
            return (
              <nav className="navbar navbar-default navbar-static-top header">
                <div className="container">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to="/">
                      Lore Quickstart
                    </Link>
                  </div>
                  <CreateButton/>
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
        Next we're going to <Link to="../step-2/">learn how to mount dialogs</Link>.
      </p>
    </Template>
  )
};
