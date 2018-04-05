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
        Step 7: Add Delete Link
      </h1>

      <p>
        In this step we're going to add a "delete" link to tweets that will launch a dialog to delete the tweet.
      </p>

      <QuickstartBranch branch="dialogs.7" />

      <h3>
        Create Edit Link
      </h3>
      <p>
        Run this command to create a component for our delete link:
      </p>

      <Markdown type="sh" text={`
      lore generate component DeleteLink
      `}/>

      <p>
        Next update the content of the component to look like this. We're going to integrate an <code>onClick</code>
        handler that will launch a confirmation dialog when the link is clicked.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';

        export default createReactClass({
          displayName: 'DeleteLink',

          propTypes: {
            tweet: PropTypes.object.isRequired
          },

          onDestroy: function() {
            const { tweet } = this.props;

            function destroyTweet() {
              lore.actions.tweet.destroy(tweet);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.destroy(tweet, {
                blueprint: 'optimistic',
                onSubmit: destroyTweet
              });
            });
          },

          render: function() {
            return (
              <a className="link" onClick={this.onDestroy}>
                delete
              </a>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';

        class DeleteLink extends React.Component {

          constructor(props) {
            super(props);
            this.onDestroy = this.onDestroy.bind(this);
          }

          onDestroy() {
            const { tweet } = this.props;

            function destroyTweet() {
              lore.actions.tweet.destroy(tweet);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.destroy(tweet, {
                blueprint: 'optimistic',
                onSubmit: destroyTweet
              });
            });
          }

          render() {
            return (
              <a className="link" onClick={this.onDestroy}>
                delete
              </a>
            );
          }

        }

        DeleteLink.propTypes = {
          tweet: PropTypes.object.isRequired
        };

        export default DeleteLink;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';

        class DeleteLink extends React.Component {

          constructor(props) {
            super(props);
            this.onDestroy = this.onDestroy.bind(this);
          }

          static propTypes = {
            tweet: PropTypes.object.isRequired
          };

          onDestroy() {
            const { tweet } = this.props;

            function destroyTweet() {
              lore.actions.tweet.destroy(tweet);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.destroy(tweet, {
                blueprint: 'optimistic',
                onSubmit: destroyTweet
              });
            });
          }

          render() {
            return (
              <a className="link" onClick={this.onDestroy}>
                delete
              </a>
            );
          }

        }

        export default DeleteLink;
        `}/>
      </CodeTabs>

      <h3>
        Add a Delete Link to the Tweet
      </h3>
      <p>
        Next we want to add the delete link to each tweet. Open up the <code>Tweet</code> component and modify the render method to look
        like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        import DeleteLink from './DeleteLink';

        ...
          render: function() {
            ...
            return (
              <li className="list-group-item tweet">
                <div className="image-container">
                  <img
                    className="img-circle avatar"
                    src={user.data.avatar} />
                </div>
                <div className="content-container">
                  <h4 className="list-group-item-heading title">
                    {user.data.nickname}
                  </h4>
                  <h4 className="list-group-item-heading timestamp">
                    {'- ' + timestamp}
                  </h4>
                  <p className="list-group-item-text text">
                    {tweet.data.text}
                  </p>
                  <div>
                    <EditLink tweet={tweet} />
                    <DeleteLink tweet={tweet} />
                  </div>
                </div>
              </li>
            );
          }
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
        import DeleteLink from './DeleteLink';
        ...
          render() {
            ...
            return (
              <li className="list-group-item tweet">
                <div className="image-container">
                  <img
                    className="img-circle avatar"
                    src={user.data.avatar} />
                </div>
                <div className="content-container">
                  <h4 className="list-group-item-heading title">
                    {user.data.nickname}
                  </h4>
                  <h4 className="list-group-item-heading timestamp">
                    {'- ' + timestamp}
                  </h4>
                  <p className="list-group-item-text text">
                    {tweet.data.text}
                  </p>
                  <div>
                    <EditLink tweet={tweet} />
                    <DeleteLink tweet={tweet} />
                  </div>
                </div>
              </li>
            );
          }
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
        import DeleteLink from './DeleteLink';
        ...
          render() {
            ...
            return (
              <li className="list-group-item tweet">
                <div className="image-container">
                  <img
                    className="img-circle avatar"
                    src={user.data.avatar} />
                </div>
                <div className="content-container">
                  <h4 className="list-group-item-heading title">
                    {user.data.nickname}
                  </h4>
                  <h4 className="list-group-item-heading timestamp">
                    {'- ' + timestamp}
                  </h4>
                  <p className="list-group-item-text text">
                    {tweet.data.text}
                  </p>
                  <div>
                    <EditLink tweet={tweet} />
                    <DeleteLink tweet={tweet} />
                  </div>
                </div>
              </li>
            );
          }
        ...
        `}/>
      </CodeTabs>

      <p>
        With this change in place, refresh the browser and you should see a <em>"delete"</em> link on each of the tweets. Click this
        link and you'll be asked to confirm that you want to delete the tweet. Once you confirm, if you look at the network
        requests, you'll see a DELETE request is sent to the API to delete the tweet.
      </p>

      <blockquote>
        <p>
          The <code>state</code> of the tweet is also changed to <code>DELETING</code>, so if this were a real application we could add an if
          statement to detect when data was being changed and modify our UI to communicate that to the user.
        </p>
      </blockquote>


      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/dialogs/step-6.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

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

      <h3>
        src/components/Tweet.js
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
        In the next section we'll be <Link to="../../authorization/overview/">hiding the edit and delete
        links</Link> to reflect the application's user permissions.
      </p>
    </Template>
  )
};
