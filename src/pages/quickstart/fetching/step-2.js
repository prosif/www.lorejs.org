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
        Step 2: Create a Tweet Model
      </h1>

      <p>
        In this step we're going to create a model for our tweet, and learn about the implicit functionality provided by Lore.
      </p>

      <QuickstartBranch branch="fetching.2" />

      <h3>
        Create a Tweet Model
      </h3>
      <p>
        Before you can fetch data in Lore, you first need to create a model that represents the resource you want to fetch.
        Since we want to fetch tweets, we are going to create a <code>tweet</code> model by running this command:
      </p>

      <Markdown type="sh" text={`
      lore generate model tweet
      `}/>

      <p>
        This will create a <code>tweet</code> model and place the file at <code>src/models/tweet.js</code>. Open this file and you will see comments
        showing you some of the properties you can override along with their default values. But if you ignore all the
        comments this file is essentially empty:
      </p>

      <Markdown text={`
      // src/models/tweet.js
      export default {

      };
      `}/>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this. Still the same as before :)
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/data/step-3.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/models/tweet.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        export default {

        };
        `}/>
        <CodeTab syntax="ES6" text={`
        export default {

        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        export default {

        }
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        It may not look like it, but we now have all the code required to <Link to="../step-2b/">fetch tweets from the API</Link>.
      </p>
    </Template>
  )
};
