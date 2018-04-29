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
        Introduction to Hooks
      </h3>
      <p>
        We've seen Lore do a lot of things up to this point, including mounting the application, setting up routing,
        generating reducers and actions, and orchestrating data fetching for components. But what we haven't talked
        about is <em>how it does that</em>, because truthfully, the framework itself doesn't have <em>any</em> of that
        functionality built into it.
      </p>
      <p>
        Lore itself isn't a framework so much as a plugin engine, and it's all the plugins that combine
        to <em>make</em> it a framework for building React applications. At it's core, Lore only does two things:
      </p>
      <ol>
        <li>
          Define the rules for how <code>config</code> files are loaded and combined
        </li>
        <li>
          Define the interface for what these plugins should look like, and how to specify dependencies between
          them, in order to determine the order they should be loaded
        </li>
      </ol>
      <p>
        These plugins are referred to as <strong>hooks</strong>, and we're going to be installing some additional
        hooks throughout this section in order to simplify the process of generating and mounting dialogs.
      </p>
      <blockquote>
        <p>
          You can learn more about how to create your own hooks <Link to="/hooks/tutorial/">here</Link>.
        </p>
      </blockquote>

      <h3>
        Install the Dialog Hook
      </h3>
      <p>
        The first hook we'll install is called <code>lore-hook-dialog</code>. Install it by running this command:
      </p>
      <Markdown type="sh" text={`
      npm install lore-hook-dialog --save
      `}/>

      <p>
        Next open <code>index.js</code> and locate the call for <code>lore.summon(...)</code>. Here you can see
        a list of all the hooks the framework includes by default.
      </p>

      <Markdown text={`
      // index.js
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
      // index.js
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
        The hook we just installed adds a utility for mounting dialogs, and it exposes this utility through the
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

      <Markdown text={`
      // src/components/CreateButton.js
      ...
        onClick() {
          lore.dialog.show(function() {
            return (
              <h1>Dialog Placeholder</h1>
            );
          });
        },
      ...
      `}/>

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
        import PropTypes from 'prop-types';

        export default createReactClass({
          displayName: 'CreateButton',

          onClick() {
            lore.dialog.show(function() {
              return (
                <h1>Dialog Placeholder</h1>
              );
            });
          },

          render() {
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
        import React from 'react';
        import PropTypes from 'prop-types';

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

      <h3>
        index.js
      </h3>
      <Markdown text={`
      /**
      * This file kicks off the build process for the application.  It also attaches
      * the Lore singleton to the window, so you can access it from the command line
      * in case you need to play with it or want to manually kick off actions or check
      * the reducer state (through \`lore.actions.xyz\`, \`lore.reducers.xyz\`,
      * \`lore.models.xyz\`, etc.)
      **/

      import lore from 'lore';
      import _ from 'lodash';

      // Import the styles for the loading screen. We're doing that here to make
      // sure they get loaded regardless of the entry point for the application.
      import './assets/css/loading-screen.css';

      // Allows you to access your lore app globally as well as from within
      // the console. Remove this line if you don't want to be able to do that.
      window.lore = lore;

      // Hooks
      import auth from 'lore-hook-auth';
      import actions from 'lore-hook-actions';
      import bindActions from 'lore-hook-bind-actions';
      import collections from 'lore-hook-collections';
      import connections from 'lore-hook-connections';
      import connect from 'lore-hook-connect';
      import dialog from 'lore-hook-dialog';
      import models from 'lore-hook-models';
      import react from 'lore-hook-react';
      import reducers from 'lore-hook-reducers';
      import redux from 'lore-hook-redux';
      import router from 'lore-hook-router';

      // Summon the app!
      lore.summon({
        hooks: {
          auth,
          actions,
          bindActions,
          collections,
          connections,
          connect,
          dialog,
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

      <h3>
        package.json
      </h3>
      <Markdown text={`
      {
        "name": "lore-quickstart",
        "private": true,
        "version": "0.0.0",
        "description": "A Lore application",
        "keywords": [],
        "scripts": {
          "build": "npm run build:development",
          "build:development": "npm run clean && webpack --env.webpack=production --env.lore=development",
          "build:production": "npm run clean && webpack --env.webpack=production --env.lore=production -p",
          "deploy": "npm run now:copy && now dist",
          "deploy:production": "npm run build:production && npm run deploy",
          "clean": "rimraf dist",
          "now:copy": "cp .now/package.json dist/package.json",
          "server": "json-server --watch db.json --port=1337",
          "start": "webpack-dev-server --hot --env.webpack=development --env.lore=development",
          "stats": "npm run stats:development",
          "stats:development": "webpack --json --env=development > stats.json",
          "stats:production": "webpack --json --env=production -p > stats.json",
          "test": "echo \\"Error: no test specified\\" && exit 1"
        },
        "dependencies": {
          "auth0-js": "^9.5.0",
          "create-react-class": "^15.6.2",
          "lodash": "^4.0.0",
          "lore": "~0.13.0-beta",
          "lore-auth": "~0.13.0-beta",
          "lore-hook-actions": "~0.13.0-beta",
          "lore-hook-auth": "~0.13.0-beta",
          "lore-hook-bind-actions": "~0.13.0-beta",
          "lore-hook-collections": "~0.13.0-beta",
          "lore-hook-connect": "~0.13.0-beta",
          "lore-hook-connections": "~0.13.0-beta",
          "lore-hook-dialog": "~0.13.0-beta",
          "lore-hook-models": "~0.13.0-beta",
          "lore-hook-react": "~0.13.0-beta",
          "lore-hook-reducers": "~0.13.0-beta",
          "lore-hook-redux": "~0.13.0-beta",
          "lore-hook-router": "~0.13.0-beta",
          "lore-utils": "~0.13.0-beta",
          "moment": "^2.22.1",
          "prop-types": "^15.6.0",
          "react": "^16.1.1",
          "react-dom": "^16.0.0",
          "react-redux": "^4.4.1",
          "react-router": "^3.0.0",
          "redux": "^3.0.2",
          "redux-batched-subscribe": "^0.1.6",
          "redux-thunk": "^2.0.1"
        },
        "devDependencies": {
          "babel-cli": "^6.4.5",
          "babel-core": "^6.2.1",
          "babel-loader": "^7.0.0",
          "babel-preset-es2015": "^6.5.0",
          "babel-preset-react": "^6.5.0",
          "copy-webpack-plugin": "^4.0.1",
          "css-loader": "^0.26.2",
          "extract-text-webpack-plugin": "^3.0.2",
          "favicons-webpack-plugin": "~0.0.7",
          "file-loader": "^0.10.1",
          "html-webpack-plugin": "^2.28.0",
          "json-loader": "^0.5.4",
          "json-server": "~0.12.1",
          "less": "2.5.1",
          "less-loader": "^2.2.0",
          "node-sass": "^4.1.1",
          "now": "^11.1.4",
          "postcss-loader": "^1.3.3",
          "progress-bar-webpack-plugin": "^1.9.3",
          "redux-devtools": "^3.4.1",
          "redux-devtools-dock-monitor": "^1.1.3",
          "redux-devtools-log-monitor": "^1.4.0",
          "rimraf": "^2.6.1",
          "sass-loader": "^6.0.3",
          "style-loader": "^0.13.2",
          "url-loader": "^0.5.8",
          "webpack": "^3.11.0",
          "webpack-config-utils": "^2.3.0",
          "webpack-dev-server": "^2.4.1",
          "webpack-manifest-plugin": "^1.1.0"
        }
      }
      `}/>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to <Link to="../step-3/">create and mount a dialog</Link>.
      </p>
    </Template>
  )
};
