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
        Lore is a Plugin Engine
      </h3>
      <p>
        While it may not be obvious, <strong>Lore is essentially a plugin engine</strong>, and in fact most of
        the functionality and conventions you've seen so far are implemented as a series of plugins that hook
        into the framework.
      </p>
      <p>
        Because of that, these plugins are referred to as <strong>hooks</strong>, and we're going to be installing
        some additional hooks throughout this section in order to simplify the process of generating and mounting
        dialogs.
      </p>

      <h3>
        Install the Dialog Hook
      </h3>
      <p>
        The first hook we'll install is called <code>lore-hook-dialog</code>, and provides a utility for mounting
        dialogs. Install it by running this command:
      </p>
      <Markdown type="sh" text={`
      npm install lore-hook-dialog --save
      `}/>

      <p>
        Next open up <code>index.js</code> and locate the call for <code>lore.summon(...)</code>. Here you can see
        a list of all the hooks the framework includes by default.
      </p>

      <Markdown text={`
      lore.summon({
        hooks: {
          auth,
          actions,
          bindActions,
          collections,
          connections,
          connect,
          models,
          react,
          reducers,
          redux: _.extend(redux, {
            dependencies: ['reducers', 'auth']
          }),
          router
        }
      });
      `}/>

      <blockquote>
        <p>
          You've already seen some of these hooks in action:
        </p>
        <ul>
          <li>
            The <code>actions</code> hook converts your models into actions
          </li>
          <li>
            The <code>reducers</code> hook creates reducers for each of your models
          </li>
          <li>
            The <code>connect</code> hook provides the <code>connect</code> decorator that invokes actions to fetch
            data if it doesn't exist in the store
          </li>
        </ul>
      </blockquote>

      <p>
        To use the hook we just installed, simply add it to the <code>hooks</code> object like this:
      </p>

      <Markdown text={`
      ...
      import dialog from 'lore-hook-dialog';
      ...

      lore.summon({
        hooks: {
          ...
          connect,
          dialog,
          models,
          ...
        }
      });
      `}/>

      <h3>
        The Dialog Utility
      </h3>
      <p>
        The hook we just installed adds a utility for mounting dialogs, and exposes this utility through the
        method <code>lore.dialog.show()</code>.
      </p>
      <p>
        To understand what this method does, open the <code>index.html</code> at the root of your project, and find
        the element in the body with an id of <code>dialog</code>:
      </p>

      <Markdown type="html" text={`
      <body>
        <div id="loading-screen">
          ...
        </div>
        <div id="root">
          ...
        </div>
        <div id="dialog"></div>
        ...
      </body>
      `}/>

      <p>
        After Lore builds your application, it mounts it to the <code>root</code> element. But rendering
        dialogs <em>inside</em> that element can be problematic, as it allows other components in your application
        to unintentionally affect the styling and behavior of your dialogs.
      </p>

      <blockquote>
        <p>
          Examples where this can show up:
        </p>
        <ul>
          <li>
            Classes applies to parent elements affecting the styling of your dialogs
          </li>
          <li>
            Parent components cancelling click events in your dialogs.
          </li>
        </ul>
      </blockquote>

      <p>
        The <code>dialog</code> element is intended to be used as target for mounting dialogs, in order to avoid
        those issues, and the <code>lore.dialog.show()</code> method is a helper that renders a React component to
        that element.
      </p>

      <h3>
        Update Create Button
      </h3>
      <p>
        To demonstrate this utility, replace the <code>onClick</code> behavior of
        our <code>CreateButton</code> component with this code:
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
        If you refresh the browser and click the button, you should see the text <em>"Dialog Placeholder"</em> appear
        at the bottom of the screen (you may have to scroll down to see it). You can also inspect
        the <code>dialog</code> element to confirm the component was mounted inside of it.
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
        import React from 'react';
        import createReactClass from 'create-react-class';

        export default createReactClass({
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

        class CreateButton extends React.Component {

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

        class CreateButton extends React.Component {

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
