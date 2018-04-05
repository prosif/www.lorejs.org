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
        Step 1: Add NextPage to Meta
      </h1>

      <p>
        In this step we'll add infinite scrolling to our Feed.
      </p>

      <QuickstartBranch branch="infinite-scrolling.1" />

      <h3>
        Approach
      </h3>
      <p>
        Infinite Scrolling is similar to pagination except for two key points:
      </p>

      <ol>
        <li>Instead of letting the user select a page, they can only load the next page</li>
        <li>Instead of displaying one page at a time, the results are all appended to single growing array</li>
      </ol>

      <p>
        It's important to point out that these are <strong>view specific concerns</strong>, meaning nothing about
        creating that experience requires changes to infrastructure or to the API. These needs are all related to how
        a interacts with data, and have nothing to do with how data is fetched or stored.
      </p>

      <p>
        To that end, this section will be focusing on how to implement infinite scrolling in a simple and
        reusable way.
      </p>

      <h3>
        Add NextPage to Meta Property
      </h3>
      <p>
        Unlike traditional pagination links, where we need to calculate the number of links early on, infinite
        scrolling only cares about whether there is a "next" page. So we're going to provide that information by
        adding another property to the <code>meta</code> field of the <code>tweets</code> collection.
      </p>

      <p>
        Open up <code>config/connections.js</code> and update the collection's <code>parse()</code> method to add
        the <code>nextPage</code> property from the API response to to the <code>meta</code> data. This field will
        either contain the number of the next page of data or be null if there are no more pages to display.
      </p>

      <Markdown text={`
      ...
        parse(attributes) {
          this.meta = {
            totalCount: attributes.meta.paginate.totalCount,
            perPage: attributes.meta.paginate.perPage,
            nextPage: attributes.meta.paginate.nextPage
          };
          return attributes.data;
        }
      ...
      `}/>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this. Exactly the same :)
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/infinite-scrolling/step-1.png" />


      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        config/connections.js
      </h3>

      <Markdown type="jsx" text={`
      import auth from '../src/utils/auth';

      export default {

        default: {

          apiRoot: 'http://localhost:1337',

          headers: function() {
            return {
              Authorization: 'Bearer ' + auth.getToken()
            };
          },

          collections: {
            properties: {

              parse: function(attributes) {
                this.meta = {
                  totalCount: attributes.meta.paginate.totalCount,
                  perPage: attributes.meta.paginate.perPage,
                  nextPage: attributes.meta.paginate.nextPage
                };
                return attributes.data;
              }

            }
          }

        }
      };
      `}/>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we'll <Link to="../step-2/">create the components we'll need to setup Infinite Scrolling</Link>.
      </p>
    </Template>
  )
};
