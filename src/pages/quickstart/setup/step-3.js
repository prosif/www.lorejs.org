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
        Step 3: Run the Application
      </h1>
      <p>
        With the dependencies installed, run the application by typing <code>npm start</code>.
      </p>

      <Markdown type="sh" text={`
      $ npm start
      `}/>

      <p>
        A successful execution will produce output similar to this:
      </p>

      <Markdown type="sh" text={`
      webpack-dev-server --history-api-fallback --hot --env=development --port=3000

      build [==                  ] 10%
      Project is running at http://localhost:3000/

      webpack output is served from /
      404s will fallback to /index.html

      Build completed in 11.5s

      Hash: d4d5293a11f211db7080
      Version: webpack 2.4.1
      Time: 11504ms

      Asset   Size       Chunks                    Chunk Names
      favicons/favicon.ico   33.3 kB            [emitted]
      favicon-manifest.json   877 bytes          [emitted]
      assets/images/logo.png   27.7 kB            [emitted]
      bundle.main.js   4.9 MB          0  [emitted]  [big]  main
      bundle.vendor.js   1.44 MB         1  [emitted]  [big]  vendor
      index.html   4.88 kB            [emitted]

      ...

      webpack: Compiled successfully.
      `} />

      <p>
        This step invokes <a href="https://webpack.github.io/">Webpack</a> to build the application and starts a
        development server so you can view it in the browser.
      </p>

      <h3>
        View the Application
      </h3>

      <p>
        Once the application is built, you can view it by navigating to <code>http://localhost:3000</code>. Once you
        do, you should see this:
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/setup/step-3.png" />

      <h3>
        Changing the Port (optional)
      </h3>

      <p>
        If you want to change the port the server runs on, you can do that by modifying the <code>start</code> script in the
        <code>package.json</code> file. Just update the <code>--port=3000</code> argument to something like <code>--port=3001</code>.
      </p>

      <Markdown type="json" text={`
      "scripts": {
      ...
        "start": "webpack-dev-server --history-api-fallback --hot --env=development --port=3000",
      ...
      },
      `} />

      <h2>
        Next Steps
      </h2>
      <p>
        Next we're going to <Link to="../step-4/">setup the mock API server</Link> we'll be using for this quickstart.
      </p>
    </Template>
  )
};
