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
        Step 2: Parse Server Response
      </h1>

      <p>
        In this step we’ll restore functionality to our application.
      </p>

      <QuickstartBranch branch="server.2" />

      <h3>
        Why is the application broken?
      </h3>
      <p>
        Our application is broken because the API response from the mock API is different than the response of
        the real API. The mock API server had a response for <code>/tweets</code> that looked like this:
      </p>

      <Markdown text={`
      [
        {...tweet...},
        {...tweet...}
      ]
      `}/>

      <p>
        But now the API response looks like this:
      </p>

      <Markdown text={`
      {
        data: [
          {...tweet...},
          {...tweet...}
        ],
        meta: {
          paginate: {
            currentPage: 1,
            nextPage: 2,
            prevPage: null,
            totalPages: 11,
            totalCount: 51,
            perPage: 5
          }
        }
      }
      `}/>

      <p>
        While the reason for the change is a positive one, as we now have clear metadata we can use for pagination,
        it's still a change that breaks our application. But not to worry; Lore is designed to easily adapt to these
        kinds of breaking API changes.
      </p>

      <h3>
        Parse the Collection Response
      </h3>
      <p>
        API responses vary drastically across the web, and Lore is designed to adapt to different interfaces. It
        just needs a little help from you to understand how.
      </p>

      <p>
        To fix our app, open up <code>config/connections.js</code>. At the bottom of the file, below
        the <code>apiRoot</code> you set earlier, you will see a property named <code>collections</code>.
        Collections in Lore are the abstraction tier responsible for communicating with API endpoints that
        return an array of resources, such as our <code>/tweets</code> endpoint.
      </p>

      <p>
        Inside this section you'll see a commented out function called <code>parse()</code> that looks like this:
      </p>

      <Markdown text={`
      {
        apiRoot: 'http://localhost:1337',

        ...

        collections: {

            properties: {

              // parse(attributes) {
              //   return attributes;
              // }

            }

          }
      }
      `}/>

      <p>
        It's commented out because it reflects the default behavior of the framework. When
        the <code>/tweets</code> endpoint returns data, that data is passed to the parse function. This function
        then has an opportunity to modify the data (referred to as <code>attributes</code>) and is expected to
        return an array of that resource.
      </p>

      <p>
        The default behavior is to return whatever was provided. And when we were using our mock API this worked
        just fine, because the original API response <em>was</em> an array of tweets. But now the array we want
        is embedded inside the <code>data</code> property of the server response, so we need to override this function
        to have it return the array of tweets.
      </p>

      <p>
        Modify the <code>parse()</code> function to look like this:
      </p>

      <Markdown text={`
      ...
        collections: {
          properties: {
            parse(attributes) {
              return attributes.data;
            }
          }
        }
      ...
      `}/>

      <p>
        If you refresh the browser, you'll see the application is still broken, but now we have a different error
        in the console:
      </p>

      <Markdown type="sh" text={`
      Invalid call to \`getState('user.byId')\`. Missing required attribute 'id'.
      `}/>

      <h3>
        Parse the Model Response
      </h3>
      <p>
        This error stems from another parsing problem. In our original mock API, the response for a single tweet
        looked like this:
      </p>

      <Markdown text={`
      {
        id: 1,
        userId: 1,
        text: "Ayla fight while alive! Win and live. Lose and die.",
        createdAt: "2016-11-26T04:03:25.546Z"
      }
      `}/>

      <p>
        But in our current API, the response looks like this:
      </p>

      <Markdown text={`
      {
        id: 1,
        user: 1,
        text: "Ayla fight while alive! Win and live. Lose and die.",
        createdAt: "2016-11-26T04:03:25.546Z"
      }
      `}/>

      <p>
        The difference is that our <code>userId</code> property has been renamed to <code>user</code>. To solve
        this problem we <em>could</em> rename every reference of <code>userId</code> in our application
        to <code>user</code>, but Lore provides an alternative way to quickly resolve breaking API changes like
        this. Instead of modifying our components, we're simply going to add the missing <code>user</code> field
        to all tweets.
      </p>

      <p>
        Models and Collections in Lore both have a <code>parse()</code> method. The <code>parse()</code> method on
        Models is responsible for parsing a single resource and producing the final set of attributes that will
        be used by the components in your application.
      </p>

      <blockquote>
        <p>
          While <code>config/collections.js</code> <em>does</em> contain a parse method for <code>models</code>,
          that method will affect <em>all</em> models in the application, which isn't what we want, as this issue
          only affects the <code>tweet</code> models.
        </p>
      </blockquote>

      <p>
        To fix this open up <code>src/models/tweet.js</code>, and look for the commented
        out <code>parse()</code> method which will look like this:
      </p>

      <Markdown text={`
      {
        ...
        properties: {

          // parse: function(resp, options) {
          //  return resp;
          // }

        }

      }
      `}/>

      <p>
        Modify the file to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        export default {

          ...

          properties: {

            parse: function(resp, options) {
              resp.userId = resp.user;
              return resp;
            }

          }

        }
        `}/>
        <CodeTab syntax="ES6" text={`
        export default {

          ...

          properties: {

            parse: function(resp, options) {
              resp.userId = resp.user;
              return resp;
            }

          }

        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        export default {

          ...

          properties: {

            parse: function(resp, options) {
              resp.userId = resp.user;
              return resp;
            }

          }

        }
        `}/>
      </CodeTabs>

      <p>
        Instead of modifying all the components, we're simply going to create the missing <code>userId</code> property
        and copy over the value from the <code>user</code> property.
      </p>

      <blockquote>
        <p>
          While outside the scope of this Quickstart, the approach of overriding parse to resolve breaking API
          changes only works for read-only situations, i.e. when the applications needs to read the property but
          never modifies it and sends it back to the server. If you need to modify data before sending it to
          the server you can use the <code>sync()</code> method.
        </p>
      </blockquote>

      <p>
        If you refresh the browser, you'll notice the Feed displays correctly again, but our profile picture isn't
        being displayed. This is because the application doesn't actually know who the user is. If you open the
        network tab you'll see the call to <code>/user</code> returns a <code>401 Unauthorized</code>. We'll fix
        that error in the next step.
      </p>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/server/step-2.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        config/connections.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        export default {

          default: {

            apiRoot: 'http://localhost:1337',

            collections: {
              properties: {
                parse: function(attributes) {
                  return attributes.data;
                }
              }
            }

          }

        }
        `}/>
        <CodeTab syntax="ES6" text={`
        export default {

          default: {

            apiRoot: 'http://localhost:1337',

            collections: {
              properties: {
                parse(attributes) {
                  return attributes.data;
                }
              }
            }

          }

        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        export default {

          default: {

            apiRoot: 'http://localhost:1337',

            collections: {
              properties: {
                parse(attributes) {
                  return attributes.data;
                }
              }
            }

          }

        }
        `}/>
      </CodeTabs>

      <h3>
        src/models/tweet.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        export default {

          attributes: {
            text: {
              type: 'text',
              displayName: 'Message',
              placeholder: "What's happening?"
            }
          },

          properties: {

            parse: function(resp, options) {
              resp.userId = resp.user;
              return resp;
            }

          }

        };
        `}/>
        <CodeTab syntax="ES6" text={`
        export default {

          attributes: {
            text: {
              type: 'text',
              displayName: 'Message',
              placeholder: "What's happening?"
            }
          },

          properties: {

            parse: function(resp, options) {
              resp.userId = resp.user;
              return resp;
            }

          }

        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        export default {

          attributes: {
            text: {
              type: 'text',
              displayName: 'Message',
              placeholder: "What's happening?"
            }
          },

          properties: {

            parse: function(resp, options) {
              resp.userId = resp.user;
              return resp;
            }

          }

        }
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to <Link to="../step-3/">add an Authorization header to our network requests</Link>.
      </p>
    </Template>
  )
};
