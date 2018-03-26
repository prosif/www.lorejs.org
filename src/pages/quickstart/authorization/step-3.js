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
        Decorators can provide a concise way to add behavior to an application, but they're not very easy to
        understand compared to a simple React component. Conceptually, they're functions that return a Component
        that renders YOUR component, which can be difficult to visualize.
      </p>
      <p>
        In this section, we'll be introducing an alternative way of performing authorization rules, that uses a
        simple component instead of a decorator.
      </p>

      <h3>
        Create an IsOwner Component
      </h3>

      <p>
        Create a new component called <code>IsOwner</code>:
      </p>

      <Markdown text={`
      lore generate component IsOwner
      `}/>

      <p>
        Next, replace the content with this:
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

          if (tweet.data.userId === user.id) {
            return children;
          }

          return null;
        }

      });
      `}/>

      <p>
        This component expects to receive a <code>tweet</code> as a prop, and then compares to <code>id</code> of
        the current user to the <code>user</code> who created the <code>tweet</code>. If they match, it renders
        whatever children (other components) were passed to it. If the user doesn't match, it renders nothing.
      </p>

      <h3>
        Use the Component
      </h3>

      <p>
        To see how we use this it, open the <code>Tweet</code> component. Import <code>IsOwner</code>, and wrap
        our <code>edit</code> and <code>delete</code> links with it like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        import IsOwner from './IsOwner';
        ...
          render:() {
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
        <CodeTab syntax="ES6" text={`
        ...
        import IsOwner from './IsOwner';
        ...
          render:() {
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
        <CodeTab syntax="ESNext" text={`
        ...
        import IsOwner from './IsOwner';
        ...
          render:() {
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
      </CodeTabs>

      <p>
        With this change in place, you can remove the <code>UserCanEditTweet</code> and <code>UserCanDeleteTweet</code> decorators
        from the <code>EditLink</code> and <code>DeleteLink</code> respectively.
      </p>
      <p>
        Next, refresh the page, and the application will look and behave exactly the same.
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
        src/decorators/UserCanDeleteTweet.js
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
        In the next section we're going to <Link to="../../server/overview/">replace the mock server with a real server</Link>.
      </p>
    </Template>
  )
};
