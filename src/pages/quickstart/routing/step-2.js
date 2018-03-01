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
        Step 2: Add Feed to Routes
      </h1>

      <p>
        In this step we're going to create a Feed component to display the tweets and add it to the routes.
      </p>

      <QuickstartBranch branch="routing.2" />

      <h3>
        Create the Feed Component
      </h3>
      <p>
        Run this CLI command to generate the <code>Feed</code> component:
      </p>

      <Markdown type="sh" text={`
      lore generate component Feed
      `}/>

      <p>
        Next modify the <code>render</code> method to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`

        `}/>
        <CodeTab syntax="ES6" text={`

        `}/>
        <CodeTab syntax="ESNext" text={`

        `}/>
      </CodeTabs>

      <h3>
        Add Feed to Routes.js
      </h3>
      <p>
        Next open <code>routes.js</code> and import the Feed component. Then add an IndexRoute within the root route that renders the
        Feed. This setup will give us the flexibility to change content displayed within the main page later, but defaults what
        is displayed to the Feed.
      </p>

      <p>
        Here are the changes you need to make to <code>routes.js</code>:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`

        `}/>
        <CodeTab syntax="ES6" text={`

        `}/>
        <CodeTab syntax="ESNext" text={`

        `}/>
      </CodeTabs>

      <h3>
        Render Route Children in Layout
      </h3>
      <p>
        If you refresh the application right now, you'll notice the Feed component isn't being displayed. And that's because
        we haven't told the Layout where to render it yet.
      </p>

      <p>
        To fix this, open <code>Layout</code> and look in the render method for the code that looks like this:
      </p>

      <Markdown text={`
      <div className="col-md-offset-3 col-md-6">
        {/* Feed goes here */}
      </div>
      `} />

      <p>
        Modify that code to look like this:
      </p>

      <Markdown text={`
      <div className="col-md-offset-3 col-md-6">
        {React.cloneElement(this.props.children)}
      </div>
      `} />

      <blockquote>
        <p>
          When we added <code>Feed</code> to <code>routes.js</code> we listed it as a child of <code>Layout</code>. This code we just pasted says "clone my
          children and render them here". With this change in place, refresh the application and you should now see "Feed"
          displayed in the middle of the page.
        </p>
      </blockquote>

      <h3>
        Visual Check-in
      </h3>
      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/routing/step-2.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/components/Feed.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`

        `}/>
        <CodeTab syntax="ES6" text={`

        `}/>
        <CodeTab syntax="ESNext" text={`

        `}/>
      </CodeTabs>


      <h3>
        routes.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`

        `}/>
        <CodeTab syntax="ES6" text={`

        `}/>
        <CodeTab syntax="ESNext" text={`

        `}/>
      </CodeTabs>


      <h3>
        src/components/Layout.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`

        `}/>
        <CodeTab syntax="ES6" text={`

        `}/>
        <CodeTab syntax="ESNext" text={`

        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to learn about the data structure Lore uses and <Link to="../../data/overview/">add some mock data to our application </Link>.
      </p>
    </Template>
  )
};
