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
        Step 7: Publishing the Hook
      </h1>

      <p>
        If you plan on <a href="https://docs.npmjs.com/audience/publishing-npm-packages">publishing your hook to npm</a>, and
        your hook was generated inside an ES6 or ESNext project, you'll need to make a small change to
        the <code>package.json</code> before doing so.
      </p>

      <blockquote>
        <p>
          You can view the finished code for this step by checking out the <code>step-7</code> branch.
        </p>
      </blockquote>

      <blockquote>
        <p>
          NOTE: This step does NOT apply to hooks built using ES5.
        </p>
      </blockquote>


      <h3>
        Build the Hook
      </h3>
      <p>
        If you're using ES6 or ESNext, the hook will include a <code>.babelrc</code> file at the root to transpile the code into ES5.
        Before you publish, you should run <code>npm install</code> inside the hook to make sure it builds properly. The transpiled code
        will be placed in a <code>lib/</code> directory, and the final project structure will look like this:
      </p>

      <Markdown text={`
      polling-hook
      |-- lib
      |   |--index.js
      |-- src
      |   |--index.js
      |-- test
      |   |-- test.spec.js
      |-- .babelrc
      |-- package.json
      |-- README.md
      `}/>

      <h3>
        Modify the <code>package.json</code> to use <code>lib/index.js</code>
      </h3>
      <p>
        Because it can be convenient to first develop hooks inside a project, the <code>main</code> attribute of the <code>package.json</code> file
        points to <code>src/index.js</code> as the file that should be loaded when consuming the hook. When the hook exists inside your
        project, this isn't a problem, as the babel loader used by your project will transpile it as part of the build.
      </p>

      <p>
        But if you plan on <a href="https://docs.npmjs.com/audience/publishing-npm-packages">publishing your hook to npm</a>, this
        may cause problems with projects that consume the code if those projects aren't configured with the same babel presets
        and plugins as your project. In order to make sure your hook works well with any project, it's recommended that you
        modify the <code>main</code> property of your <code>package.json</code> to point to <code>lib/index.js</code> before publishing, so that projects will
        load the transpiled version of your hook.
      </p>

      <Markdown type="json" text={`
      {
        ...
        "main": "lib/index.js",
        ...
      }
      `}/>

      <h3>
        Remove <code>.default</code> from <code>require</code> statement in <code>/index.js</code>
      </h3>
      <p>
        Now that we're using the transpiled code in <code>lib/index.js</code> in our project, we no longer need
        the <code>.default</code> extension to load the hook in file <code>index.js</code> file at the root of the project.
      </p>

      <p>
        Update your <code>index.js</code> file to remove the <code>.default</code> extension from
        the <code>require('./polling-hook').default</code> line:
      </p>

      <Markdown text={`
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

      <h3>
        Next Steps
      </h3>
      <p>
        That's all for this tutorial. If you want to see a more full-featured version of this hook, check out the official
        <a href="https://github.com/lore/lore/tree/master/packages/lore-hook-polling">lore-hook-polling</a> hook.
      </p>
    </Template>
  )
};
