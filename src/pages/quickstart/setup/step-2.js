import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Quickstart';
import Markdown from '../../../components/Markdown';
import CodeTabs from '../../../components/CodeTabs';
import CodeTab from '../../../components/CodeTab';

export default (props) => {
  return (
    <Template>
      <h1>
        Step 2: Create the Application
      </h1>

      <p>
        To create a new application, type <code>lore new</code> into the command line followed the by name of your
        application. For this example we are going to call our application <code>lore-quickstart</code>.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" type="sh" text={`
        $ lore new lore-quickstart
        `} />
        <CodeTab syntax="ES6" type="sh" text={`
        $ lore new lore-quickstart --es6
        `} />
        <CodeTab syntax="ESNext" type="sh" text={`
        $ lore new lore-quickstart --esnext
        `} />
      </CodeTabs>

      <p>
        This will create a new directory called <code>lore-quickstart</code>, and place all the application files inside. You should see
        this message when the task completes.
      </p>

      <Markdown type="sh" text={`
      info:  Created a new Lore application 'lore-quickstart'
      `}/>

      <blockquote>
        <p>
          When you create an application using the --es6 or --esnext flags, your language preference is recorded
          to the <code>language</code> property in the <code>.lorerc</code> file at the root of the project. The
          CLI examines this property before executing commands, which means this is the only time you'll need to
          declare the JavaScript version. Any files you generate from this point forward will be created using
          your preference automatically.
        </p>
      </blockquote>

      <h3>
        Install Dependencies
      </h3>
      <p>
        Once the project is created, navigate into the project directory and install the dependencies.
      </p>

      <Markdown type="markdown" text={`
      $ cd lore-quickstart
      $ npm install
      `}/>

      <p>
        Depending on your network connection, it may take 2-4 minutes for this step to complete.
      </p>

      <h2>
        Next Steps
      </h2>

      <p>
        Now that we've created our project and installed the dependencies,
        let's <Link to="/quickstart/setup/step-3/">build the application</Link>.
      </p>

    </Template>
  )
};
