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
        Step 2: Mounting Dialogs
      </h1>

      <p>
        In this step we're going to learn how to mount dialogs.
      </p>

      <QuickstartBranch branch="dialogs.2" />

      <h3>
        The Dialog Utility
      </h3>
      <p>
        Lore includes a utility for mounting dialogs found through the method <code>lore.dialog.show(...)</code>. To explain what this
        method does, open up <code>index.html</code> and find the element in the body with the id of <code>dialog</code>:
      </p>

      <Markdown type="html" text={`
      <body>
        <div id="root">
          ...
        </div>
        <div id="dialog"></div>
        ...
      </body>
      `}/>

      <p>
        When your application runs in the browser, Lore mounts it to the <code>root</code> element. The <code>dialog</code> element is the default
        target for mounting dialogs, and the <code>lore.dialog.show(...)</code> method is a helper that renders a React component to
        that element.
      </p>

      <blockquote>
        <p>
          Why have two separate mounting targets?
        </p>
        <p>
          Lore renders dialogs outside the main application in order to prevent them from being nested inside other DOM
          elements. If you nest dialogs inside other components those components can unintentionally affect the styling of
          your dialogs (through classes applied to parent elements) or the behavior (such as parent components cancelling the
          click events in your dialogs).
        </p>
      </blockquote>

      <h3>
        Mounting a Component
      </h3>
      <p>
        To demonstrate this utility, replace the <code>onClick</code> behavior of our <code>CreateButton</code> component with this code:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
          onClick: function() {
            lore.dialog.show(function() {
              return (
                <h1>Dialog Placeholder</h1>
              );
            });
          },
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
          onClick() {
            lore.dialog.show(() => {
              return (
                <h1>Dialog Placeholder</h1>
              );
            });
          }
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
          onClick() {
            lore.dialog.show(() => {
              return (
                <h1>Dialog Placeholder</h1>
              );
            });
          }
        ...
        `}/>
      </CodeTabs>

      <p>
        Now if you refresh the browser and click the button, you should see the text <em>"Dialog Placeholder"</em> appears at the
        bottom of the screen (you may have to scroll down to see it). You can also inspect the <code>dialog</code> element to confirm
        the component was mounted within the <code>dialog</code> element.
      </p>

      <p>
        In the next section we'll replace this placeholder text with a real dialog.
      </p>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/dialogs/step-2.png" />

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
        var React = require('react');

        module.exports = React.createClass({
          displayName: 'CreateButton',

          onClick: function() {
            lore.dialog.show(function() {
              return (
                <h1>Dialog Placeholder</h1>
              );
            });
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
        import React, { Component } from 'react';

        class CreateButton extends Component {

          onClick() {
            lore.dialog.show(() => {
              return (
                <h1>Dialog Placeholder</h1>
              );
            });
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

        class CreateButton extends Component {

          onClick() {
            lore.dialog.show(() => {
              return (
                <h1>Dialog Placeholder</h1>
              );
            });
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

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to <Link to="../step-3/">create and mount a dialog</Link>.
      </p>
    </Template>
  )
};
