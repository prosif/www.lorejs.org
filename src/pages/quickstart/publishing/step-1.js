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
        Step 1: Create Production Build
      </h1>

      <p>
        In this step we'll learn how to build the application for production.
      </p>

      <blockquote>
        <p>
          There is no branch for this step because it does not modify any code.
        </p>
      </blockquote>

      <h3>
        Webpack
      </h3>
      <p>
        Lore uses <a href="https://webpack.js.org">Webpack</a> for the build system. If you're new to webpack, you may find
        <a href="https://egghead.io/courses/using-webpack-for-production-javascript-applications">this video series by Kent Dodds</a>
        helpful for getting up to speed quickly.
      </p>

      <p>
        The config file for webpack is located at the root of the project and called <code>webpack.config.js</code>. It uses a library
        called <a href="https://github.com/kentcdodds/webpack-config-utils">webpack-config-utils</a> developed by Kent Dodds in order
        to allow multiple environment configurations to live within the same config file, such as different configurations
        for development and production.
      </p>

      <p>
        The default config file includes pretty sensible defaults, and is intended to cover the majority of application
        development concerns. It includes:
      </p>

      <ul>
        <li>Support for common CSS preprocessors (LESS and SASS)</li>
        <li>Support for common font types (ttf, otf, eot, woff, woff2)</li>
        <li>Support for common image types (png, jpeg, gif, tiff, bmp, svg)</li>
        <li>Automatically adds browser prefixes to CSS files</li>
        <li>Favicon generation and insertion into the HTML file</li>
        <li>Chunking (breaking the build up into multiple smaller files for faster page load)</li>
        <li>Cache busting (adding a unique hash to production files to prevent browsers from re-using outdated files)</li>
      </ul>

      <p>
        It's entirely possible you may never need to modify the config file. If you do, you can learn
        about the <a href="https://webpack.js.org/configuration">configuration options in the official webpack documentation</a>.
      </p>

      <h3>
        Build the Project
      </h3>
      <p>
        If you open up the <code>package.json</code> file you'll see two scripts related to building the project:
      </p>

      <Markdown text={`
      "scripts": {
        "build": "npm run clean && webpack --env=production",
        "build:prod": "npm run clean && webpack --env=production -p",
        ...
      },
      `}/>

      <p>
        Go ahead an execute <code>npm run build</code> from the command line. You should see output similar to this once it completes,
        which took 15 seconds for this example:
      </p>

      <Markdown text={`
      Build completed in 15.319s

      Hash: 2057e1ed42158f2fde1f
      Version: webpack 2.4.1
      Time: 15323ms
                                                              Asset       Size  Chunks                    Chunk Names
                              bundle.vendor.760c1aca95f06ca49cc5.js     884 kB       1  [emitted]  [big]  vendor
        favicons-226798db74552f749c8ab26e8bfae037/favicon-32x32.png    1.58 kB          [emitted]
        favicons-226798db74552f749c8ab26e8bfae037/favicon-96x96.png    5.87 kB          [emitted]
      favicons-226798db74552f749c8ab26e8bfae037/favicon-230x230.png      17 kB          [emitted]
              favicons-226798db74552f749c8ab26e8bfae037/favicon.ico    33.3 kB          [emitted]
                   favicons-226798db74552f749c8ab26e8bfae037/.cache  996 bytes          [emitted]
                                              favicon-manifest.json  877 bytes          [emitted]
                                bundle.main.11e83aeeb2a9a9714d66.js    5.17 MB       0  [emitted]  [big]  main
        favicons-226798db74552f749c8ab26e8bfae037/favicon-16x16.png  644 bytes          [emitted]
                               styles.main.11e83aeeb2a9a9714d66.css    1.62 kB       0  [emitted]         main
                            bundle.main.11e83aeeb2a9a9714d66.js.map    6.36 MB       0  [emitted]         main
                           styles.main.11e83aeeb2a9a9714d66.css.map  113 bytes       0  [emitted]         main
                          bundle.vendor.760c1aca95f06ca49cc5.js.map    1.04 MB       1  [emitted]         vendor
                                                asset-manifest.json  472 bytes          [emitted]
                                             assets/images/logo.png    27.7 kB          [emitted]
                                          assets/images/favicon.png     266 kB          [emitted]  [big]
                                                         index.html    5.27 kB          [emitted]
      `}/>

      <p>
        What that command does is invoke webpack to build your application for production, and places the resulting assets
        in the <code>dist</code> directory at the root of your project. Here are some key things to callout:
      </p>

      <ul>
        <li>
          Lore includes an image located in <code>assets/images/favicon.png</code> that is a 1500px png of the Lore logo. This file is used
          to generate a number of smaller favicons for different devices. By default, the Webpack config only generates favicons
          for the webpack, but you can also modify <code>webpack.config.js</code> to generate favicons for devices like Apple, Android and
          Windows.
        </li>
        <li>
          Source maps are generated by default in the production build, to make debugging production applications easier.
        </li>
        <li>
          All images in <code>assets/images</code> are copied into the <code>assets/images</code> directory in the <code>dist</code> folder. This means any
          images you add to your project will automatically be available in production.
        </li>
        <li>
          Webpack defaults to putting all JavaScript files in a single <code>bundle.js</code>, but the default Lore config breaks the
          code up into two chunks; one for vendor files, and one for the main application code.
        </li>
        <li>
          The gnarly looking file names (like <code>bundle.main.11e83aeeb2a9a9714d66.js</code>) include a hash that servers as a cache
          busting mechanism to prevent browsers from serving outdated files to users.
        </li>
      </ul>

      <p>
        Next run <code>npm run build:prod</code>. You should see output similar to this once it completes, which took 49 seconds in this
        example:
      </p>

      <Markdown text={`
      Build completed in 49.237s

      Hash: e26aa54c61ee42b36fef
      Version: webpack 2.4.1
      Time: 49241ms
                                                              Asset       Size  Chunks                    Chunk Names
                              bundle.vendor.760c1aca95f06ca49cc5.js     197 kB       1  [emitted]         vendor
        favicons-226798db74552f749c8ab26e8bfae037/favicon-16x16.png  644 bytes          [emitted]
      favicons-226798db74552f749c8ab26e8bfae037/favicon-230x230.png      17 kB          [emitted]
        favicons-226798db74552f749c8ab26e8bfae037/favicon-96x96.png    5.87 kB          [emitted]
              favicons-226798db74552f749c8ab26e8bfae037/favicon.ico    33.3 kB          [emitted]
                   favicons-226798db74552f749c8ab26e8bfae037/.cache  996 bytes          [emitted]
                                              favicon-manifest.json  877 bytes          [emitted]
                                bundle.main.11e83aeeb2a9a9714d66.js    1.41 MB       0  [emitted]  [big]  main
        favicons-226798db74552f749c8ab26e8bfae037/favicon-32x32.png    1.58 kB          [emitted]
                               styles.main.11e83aeeb2a9a9714d66.css    1.15 kB       0  [emitted]         main
                            bundle.main.11e83aeeb2a9a9714d66.js.map    12.4 MB       0  [emitted]         main
                           styles.main.11e83aeeb2a9a9714d66.css.map  113 bytes       0  [emitted]         main
                          bundle.vendor.760c1aca95f06ca49cc5.js.map     2.1 MB       1  [emitted]         vendor
                                                asset-manifest.json  472 bytes          [emitted]
                                          assets/images/favicon.png     266 kB          [emitted]  [big]
                                             assets/images/logo.png    27.7 kB          [emitted]
                                                         index.html    5.27 kB          [emitted]
      `}/>

      <p>
        The difference between the two commands is whether minification and uglification occur, which can take a significant
        amount of time to complete depending on the size of your project. But otherwise the process and generated files are
        identical.
      </p>

      <p>
        The intent of the <code>npm run build</code> command is to enable you to quickly generate a production build, and verify it works,
        or work out any issues. Then, once everything looks good, you can run the <code>npm run build:prod</code> command to minify
        and uglify the code for the real and final test before pushing to production.
      </p>

      <p>
        If you compare the output above between the two commands, you can see that the minification and uglification process
        has a significant impact in the size of the final JavaScript files. The <code>bundle.main.js</code> file is reduced from <strong>5.17 MB</strong>
        to <strong>1.41 MB</strong> and the <code>bundle.vendor.js</code> file is reduced from <strong>1.04 MB</strong> to <code>197 kB</code>.
      </p>

      <p>
        That may seem a bit unbalanced (one file clearly has more code than the other), and future versions of Lore may
        tweak which files are included by default in which chunks, to balance out the load and future improve page load time.
      </p>

      <p>
        If you want to experiment with the effect chunk size has on page load time, you can add and remove libraries from
        the <code>vendor</code> chunk by modifying this section in the <code>webpack.config.js</code> file:
      </p>

      <Markdown text={`
      ...
        entry: {
          main: './index.js',
          vendor: [
            'react',
            'react-dom',
            'react-router'
          ]
        },
      ...
      `}/>

      <h3>
        Aside: Serving Production Build Locally
      </h3>
      <p>
        It is often useful to be able to test the production build locally, before deploying it to the remote
        server. One simple way to do this is by install the <a href="https://github.com/tj/serve">serve</a> library,
        using <code>npm install -g serve</code>.
      </p>

      <p>
        Once it's installed, you can simply run <code>serve dist --port 3001</code> and then you can navigate
        to <code>localhost:3001</code> to view the production version of the application.
      </p>


      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should still look like this (exactly the same).
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/filtering/step-1.png" />


      <h2>
        Code Changes
      </h2>

      <p>
        There are no code changes required for this step.
      </p>


      <h2>
        Next Steps
      </h2>

      <p>
        In the next section we'll <Link to="../step-2/">publish the application to the web</Link>.
      </p>
    </Template>
  )
};
