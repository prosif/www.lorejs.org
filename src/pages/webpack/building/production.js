import React from 'react';
import Link from 'gatsby-link';
import Template from '../../../components/templates/Webpack';
import Markdown from '../../../components/Markdown';

export default (props) => {
  return (
    <Template>
      <h1>
        Production Build
      </h1>
      <p>
        Info about creating a production build...
      </p>

      <p>
        Next run <code>npm run build:production</code>. You should see output similar to this once it completes, which
        took 49 seconds in this example:
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
        The difference between the two commands is whether minification and uglification occur, which can take a
        significant amount of time to complete depending on the size of your project. But otherwise the process
        and generated files are identical.
      </p>

      <p>
        If you compare the output above between the two commands, you can see that the minification and uglification
        process has a significant impact in the size of the final JavaScript files. The <code>bundle.main.js</code> file
        is reduced from <strong>5.17 MB</strong> to <strong>1.41 MB</strong> and the <code>bundle.vendor.js</code> file
        is reduced from <strong>1.04 MB</strong> to <code>197 kB</code>.
      </p>

      <p>
        That may seem a bit unbalanced (one file clearly has more code than the other), and future versions of Lore
        may tweak which files are included by default in which chunks, to balance out the load and future improve
        page load time.
      </p>

      <p>
        If you want to experiment with the effect chunk size has on page load time, you can add and remove libraries
        from the <code>vendor</code> chunk by modifying this section in the <code>webpack.config.js</code> file:
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
    </Template>
  );
};
