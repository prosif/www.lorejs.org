import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Hooks';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';
import QuickstartBranch from '../../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        Step 2: Generate the Hook
      </h1>

      <p>
        In this step we're going to generate the custom hook.
      </p>

      <blockquote>
        <p>
          You can view the finished code for this step by checking out the <code>step-2</code> branch.
        </p>
      </blockquote>

      <h3>
        Run the Generator
      </h3>
      <p>
        The Lore CLI includes a number of commands that can generate files. Among them is a command that will generate starter
        code for a custom hook. Run this command to create a hook called <code>polling-hook</code>:
      </p>

      <Markdown type="sh" text={`
      lore generate hook polling-hook
      `}/>

      <p>
        This command will create a folder called <code>polling-hook</code> at the root of your project, and place the
        starter code for a hook inside that folder. The structure should look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        polling-hook
        |-- src
        |   |--index.js
        |-- test
        |   |-- test.spec.js
        |-- package.json
        |-- README.md
        `}/>
        <CodeTab syntax="ES6" text={`
        polling-hook
        |-- src
        |   |--index.js
        |-- test
        |   |-- test.spec.js
        |-- .babelrc
        |-- package.json
        |-- README.md
        `}/>
        <CodeTab syntax="ESNext" text={`
        polling-hook
        |-- src
        |   |--index.js
        |-- test
        |   |-- test.spec.js
        |-- .babelrc
        |-- package.json
        |-- README.md
        `}/>
      </CodeTabs>

      <h3>
        Add the Hook
      </h3>
      <p>
        Now that we've generated the hook, let's add it to the project so it gets loaded when the application boots up.
      </p>

      <p>
        Open up <code>index.js</code> file at the root of your project and insert the <code>polling-hook</code> into
        the list of hooks. Note that we're using a relative path, since the hook is located within our project
        and <em>not</em> installed as an npm module.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        lore.summon({
          hooks: {
            ...
            models: require('lore-hook-models'),
            polling: require('./polling-hook'),
            reducers: require('lore-hook-reducers'),
            ...
          }
        });
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
        lore.summon({
          hooks: {
            ...
            models: require('lore-hook-models'),
            polling: require('./polling-hook').default,
            reducers: require('lore-hook-reducers'),
            ...
          }
        });
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
        lore.summon({
          hooks: {
            ...
            models: require('lore-hook-models'),
            polling: require('./polling-hook').default,
            reducers: require('lore-hook-reducers'),
            ...
          }
        });
        `}/>
      </CodeTabs>

      <blockquote>
        <p>
          NOTE: If you're using ES6 or ESNext, you need to append <code>.default</code> to
          the <code>require</code> statement because of the mismatch between the
          ES5-style <code>require</code> statement and the ES6-style <code>export default</code> statement used
          by <code>src/index.js</code>.
        </p>
        <p>
          We'll fix that later in Step 7 (once we build the hook to prepare for publishing), but if you want to remove it
          now you can modify the <code>index.js</code> to load the hook at the top of the file
          using <code>import polling from './polling-hook'</code> and then provide that to the list of hooks.
        </p>
      </blockquote>

      <p>
        With this change in place, the hook will now be loaded as the application boots up. To prove that, open up the
        file <code>polling-hook/src/index.js</code>. It currently it looks like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        module.exports = {

          dependencies: [],

          defaults: {},

          load: function(lore) {
            // do something
          }

        };
        `}/>
        <CodeTab syntax="ES6" text={`
        export default {

          dependencies: [],

          defaults: {},

          load: (lore) => {
            // do something
          }

        };
        `}/>
        <CodeTab syntax="ESNext" text={`
        export default {

          dependencies: [],

          defaults: {},

          load: (lore) => {
            // do something
          }

        };
        `}/>
      </CodeTabs>

      <p>
        Modify the <code>load</code> function to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
          load: function(lore) {
            console.log('polling-hook loading!');
          }
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
          load: (lore) => {
            console.log('polling-hook loading!');
          }
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
          load: (lore) => {
            console.log('polling-hook loading!');
          }
        ...
        `}/>
      </CodeTabs>

      <p>
        Now open the developer tools in the browser and refresh the page. If you examine the console, you should see
        the phrase <code>polling-hook loading!</code> printed out.
      </p>

      <h2>
        Next Steps
      </h2>
      <p>
        Next we're going to <Link to="../step-3/">specify our hook dependencies</Link>.
      </p>
    </Template>
  )
};
