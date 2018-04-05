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
        Step 3: Lore Hooks / Dialog Generation
      </h1>

      <p>
        In this step we're going to create and mount a Bootstrap dialog.
      </p>

      <QuickstartBranch branch="dialogs.3" />

      <h3>
        Add Hook for Dialog Generation
      </h3>
      <p>
        While we could go through the steps of manually creating dialogs for creating, updating and deleting tweets, it's
        pretty tedious, and has little to do Lore. So instead, we're going to install a package that will generate the dialogs
        for us.
      </p>

      <p>
        While it may not be obvious, Lore is essentially a plugin engine. Most of the functionality and conventions you've
        seen so far are implemented as a series of plugins that hook into the framework. We're going to download and
        install an additional hooks that will generate our dialogs for us.
      </p>

      <p>
        Run the following command to install the package <code>lore-hook-dialogs-bootstrap</code>:
      </p>

      <Markdown type="sh" text={`
      npm install lore-hook-dialogs-bootstrap --save
      `}/>

      <p>
        Next open up <code>index.js</code> and locate the call for <code>lore.summon(...)</code>. Here you can see
        a list of all the hooks the framework includes by default. You've already seen some of these in action;
        the <code>actions</code> hook converts your models into actions, the <code>reducers</code> hook creates
        reducers for each of your models, and the <code>connect</code> hook provides the <code>connect</code> decorator
        that invokes actions to fetch data if it doesn't exist in the store.
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

      <p>
        To use the hook we just installed, simply add it to the <code>hooks</code> object like this:
      </p>

      <Markdown text={`
      ...
      import dialog from 'lore-hook-dialog';
      import dialogs from 'lore-hook-dialogs-bootstrap';
      ...

      lore.summon({
        hooks: {
          ...
          dialog,
          dialogs,
          models,
          ...
        }
      });
      `}/>

      <h3>
        [Optional] Try it Out
      </h3>
      <p>
        This hook generates Bootstrap dialogs for every model in your application, and includes experiences for creating,
        updating and deleting resources. Open up the developer console and enter the following command:
      </p>

      <Markdown text={`
      lore.dialogs.tweet.create()
      `}/>

      <p>
        You'll see it returns a React component. If you provide this component to <code>lore.dialog.show(...)</code> you'll be able to
        see the dialog be mounted onto the page:
      </p>

      <Markdown text={`
      lore.dialog.show(function() { return lore.dialogs.tweet.create(); })
      `}/>

      <p>
        Right now the result isn't very useful, because there aren't any fields. We'll fix that in the next step.
      </p>


      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/dialogs/step-3.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        index.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import lore from 'lore';
        import _ from 'lodash';

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
        import dialog from 'lore-hook-dialog-bootstrap';
        import dialogs from 'lore-hook-dialogs-bootstrap';
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
            dialogs,
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
        <CodeTab syntax="ES6" text={`
        import lore from 'lore';
        import _ from 'lodash';

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
        import dialog from 'lore-hook-dialog-bootstrap';
        import dialogs from 'lore-hook-dialogs-bootstrap';
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
            dialogs,
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
        <CodeTab syntax="ESNext" text={`
        import lore from 'lore';
        import _ from 'lodash';

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
        import dialog from 'lore-hook-dialog-bootstrap';
        import dialogs from 'lore-hook-dialogs-bootstrap';
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
            dialogs,
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
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going <Link to="../step-4/">finish adding the create dialog</Link>.
      </p>
    </Template>
  )
};
