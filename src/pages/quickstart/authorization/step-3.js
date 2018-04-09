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
        Step 3: Alternative Approach
      </h1>

      <p>
        In this step we'll look at an alternative approach to hiding components that doesn't use decorators.
      </p>

      <QuickstartBranch branch="authorization.3" />

      <h3>
        Why an alternative approach?
      </h3>
      <p>
        While decorators can provide a concise way to add behavior to an application, they're not very easy to
        understand compared to a simple React component. Conceptually, they're functions that return a function
        that return a component that renders YOUR component, which can be difficult to visualize.
      </p>
      <p>
        In this section, we'll introduce an alternative way of hiding components based on authorization rules, and
        we'll use a simple component instead of a decorator.
      </p>

      <h3>
        Remove Authorization Decorators from Links
      </h3>
      <p>
        <p>
          Start by removing the <code>UserCanEditTweet</code> decorator from the <code>EditLink</code>, and removing
          the <code>UserCanDeleteTweet</code> decorator from the <code>DeleteLink</code>.
        </p>
        <p>
          Once you do this, the "edit" and "delete" links should be visible for all tweets.
        </p>
      </p>

      <h3>
        Create an IsOwner Component
      </h3>

      <p>
        Next, create a new component called <code>IsOwner</code>:
      </p>

      <Markdown text={`
      lore generate component IsOwner
      `}/>

      <p>
        Then replace the code with this:
      </p>

      <Markdown text={`
      import React from 'react';
      import createReactClass from 'create-react-class';
      import PropTypes from 'prop-types';

      export default createReactClass({
        displayName: 'IsOwner',

        propTypes: {
          tweet: PropTypes.object.isRequired
        },

        contextTypes: {
          user: PropTypes.object.isRequired
        },

        render: function() {
          const { tweet, children } = this.props;
          const { user } = this.context;

          if (tweet.data.user === user.id) {
            return children;
          }

          return null;
        }

      });
      `}/>

      <p>
        Similar to the decorators we created previously, this component expects to receive a <code>tweet</code> as
        a prop, along with the <code>user</code> from context.
      </p>
      <p>
        In the <code>render()</code> method, we compare the current user to the user who created the tweet. If
        they match, we render whatever children (other components) were provided. If they don't, we render nothing.
      </p>

      <h3>
        Use the Component
      </h3>

      <p>
        To see how we use this it, open the <code>Tweet</code> component. Import <code>IsOwner</code>, and wrap
        our <code>edit</code> and <code>delete</code> links with it like this:
      </p>

      <Markdown type="jsx" text={`
      // src/components/Tweet.js
      ...
      import IsOwner from './IsOwner';
      ...
        render() {
          ...
            <IsOwner tweet={tweet}>
              <div>
                <EditLink tweet={tweet} />
                <DeleteLink tweet={tweet} />
              </div>
            </IsOwner>
          ...
        }
      ...
      `}/>

      <p>
        With this change in place, refresh the page, and once again, the "edit" and "delete" links should only
        be visible on tweets created by the current user.
      </p>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/authorization/step-2.png" />


      <h2>
        Code Changes
      </h2>

      <p>
        If you chose to follow, below is a list of files modified during this step.
      </p>

      <h3>
        src/components/IsOwner.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        TODO
        `}/>
        <CodeTab syntax="ES6" text={`
        TODO
        `}/>
        <CodeTab syntax="ESNext" text={`
        TODO
        `}/>
      </CodeTabs>

      <h3>
        src/components/EditLink.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        TODO
        `}/>
        <CodeTab syntax="ES6" text={`
        TODO
        `}/>
        <CodeTab syntax="ESNext" text={`
        TODO
        `}/>
      </CodeTabs>

      <h3>
        src/components/DeleteLink.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        TODO
        `}/>
        <CodeTab syntax="ES6" text={`
        TODO
        `}/>
        <CodeTab syntax="ESNext" text={`
        TODO
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>
      <p>
        In the next section we'll learn how to <Link to="../../optimistic/overview/">display new tweets at the
        top of the Feed</Link>.
      </p>
    </Template>
  )
};
