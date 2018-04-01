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
        Data Structure: Overview
      </h1>

      <p>
        In this section we'll learn about the data structure Lore uses and then create
        our <code>Tweet</code> component using mock data. At the end of this section your application will look
        like this:
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/data/step-3.png" />

      <h3>
        Lore's Data Structure
      </h3>
      <p>
        Lore has a particular structure it uses to represent data in your application. To illustrate, take a
        look at this example <code>Tweet</code> component. It expects to receive a prop
        called <code>tweet</code> and then renders the <code>tweet</code> data:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';

        export default createReactClass({
          displayName: 'Tweet',

          propTypes: {
            tweet: PropTypes.object.isRequired
          },

          render: function() {
            const { tweet } = this.props;

            return (
              {/* render tweet */}
            );
          }
        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';

        export default class Tweet extends React.Component {
          render() {
            const { tweet } = this.props;

            return (
              {/* render tweet */}
            );
          }
        }

        Tweet.propTypes = {
          tweet: PropTypes.object.isRequired
        };

        export default Tweet;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';

        export default class Tweet extends React.Component {

          static propTypes = {
            tweet: PropTypes.object.isRequired
          }

          render() {
            const { tweet } = this.props;

            return (
              {/* render tweet */}
            );
          }
        }
        `}/>
      </CodeTabs>

      <p>
        But before we can render the tweet, we first need to know what the data structure looks like. In Lore,
        all resources have a data structure that looks like this:
      </p>

      <Markdown text={`
      {
        id: 1,
        cid: 'c1',
        state: 'RESOLVED',
        data: {
          id: 1,
          user: 4,
          text: "Where have they been keeping her!?",
          createdAt: "2016-10-17T23:13:07.249Z",
          updatedAt: "2016-10-23T23:13:07.281Z"
        },
        error: {}
      }
      `}/>

      <p>
        When Lore retrieves data from an API endpoint, such as <code>/tweets/1</code>, it embeds the attributes
        from the API response in the <code>data</code> property, and then wraps those attributes in a
        structure that provides some metadata about that resource.
      </p>

      <p>
        This might seem a little verbose at first glance, but each property solves a specific problem, which you
        can <Link to="/features/data-structure/">read more about about in the docs</Link> if you'd
        like. But what you need to know for the Quickstart is that the data structure is designed to solve
        application concerns related to optimistic updates, visual communication, server errors, and detecting
        when resources have been created - all important elements for providing a good user experience.
      </p>

      <p>
        For endpoints that return a list of resources, such as <code>/tweets</code>, Lore uses a similar
        data structure:
      </p>

      <Markdown text={`
      {
        state: 'RESOLVED',
        data: [
          {...data in structure displayed above...}
        ],
        query: {},
        meta: {},
        error: {},
      }
      `}/>

      <p>
        Here <code>data</code> is an array that contains the individual resources in the server response (each
        wrapped in the structure above) and then provides metadata about the list such as what query was made
        to the API and what the state of that query is (typically whether the data is still being fetched or the
        query has been resolved).
      </p>


      <h2>
        Next Steps
      </h2>

      <p>
        In the next step, we'll use this structure to add some mock data as
        we <Link to="../step-1/">build the Tweet component</Link>.
      </p>

    </Template>
  )
};
