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
        Step 4: Add Create Dialog
      </h1>

      <p>
        In this step we're going to finish our create dialog and have it send data to the server.
      </p>

      <QuickstartBranch branch="dialogs.4" />

      <h3>
        Add attributes to Tweet model
      </h3>
      <p>
        The reason our dialog didn't have any fields in the previous step was because it didn't know what fields to generate.
        To fix that open up your <code>tweet</code> model and list the attributes that describe the model. In this application, each tweet
        has a <code>text</code> attribute that is of type <code>text</code> (the other supported options are <code>string</code>, <code>number</code> and <code>boolean</code>).
      </p>

      <p>
        Update your <code>tweet</code> model to look like this:
      </p>

      <Markdown text={`
      export default {
        attributes: {
          text: {
            type: 'text',
            displayName: 'Message',
            placeholder: "What's happening?"
          }
        }
      };
      `}/>

      <h3>
        Launch Create Dialog
      </h3>
      <p>
        Open up your <code>CreateButton</code> component and modify the <code>onClick</code> handler to look like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
          onClick: function() {
            function createTweet(params) {
              console.log(params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.create({
                onSubmit: createTweet
              });
            });
          },
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
          onClick() {
            function createTweet(params) {
              console.log(params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.create({
                onSubmit: createTweet
              });
            });
          }
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
          onClick() {
            function createTweet(params) {
              console.log(params);
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.create({
                onSubmit: createTweet
              });
            });
          }
        ...
        `}/>
      </CodeTabs>

      <p>
        This code generates a Create Tweet dialog provides an <code>onSubmit</code> data that will receive the data the user enters
        when they create a tweet. To see it in action, refresh the page, launch the create dialog, add some text, and when you
        submit the data you should see the text being logged in the console.
      </p>

      <h3>
        Save the Tweet
      </h3>
      <p>
        Now we can launch a dialog and get the user input, but we aren't sending it to the API. Let's fix that.
      </p>

      <p>
        Instead of logging the user data, we're going to pass it to the <code>tweet.create</code> action. Modify the <code>createTweet</code>
        callback in the <code>onClick</code> handler to look like this (you'll also need to import <code>lodash</code> at the top of the file):
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import _ from 'lodash';

        ...
          onClick: function() {
            function createTweet(params) {
              lore.actions.tweet.create(_.extend(params, {
                userId: 1,
                createdAt: new Date().toISOString()
              }));
            }

            ...
          },
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        import _ from 'lodash';

        ...
          onClick() {
            function createTweet(params) {
              lore.actions.tweet.create(_.extend(params, {
                userId: 1,
                createdAt: new Date().toISOString()
              }));
            }

            ...
          }
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        import _ from 'lodash';

        ...
          onClick() {
            function createTweet(params) {
              lore.actions.tweet.create(_.extend(params, {
                userId: 1,
                createdAt: new Date().toISOString()
              }));
            }

            ...
          }
        ...
        `}/>
      </CodeTabs>

      <p>
        Now when you submit a tweet, the action will send the data to the API, and your tweet will show up at the bottom of
        the list. Try it out!
      </p>

      <h3>
        What's up with the _.extend call?
      </h3>

      <p>
        Under normal circumstances our action call would only look like this (with no call to <code>_.extend(...)</code>):
      </p>

      <Markdown text={`
      function createTweet(params) {
        lore.actions.tweet.create(params);
      }
      `}/>

      <p>
        But because we're currently using a mock API through <code>json-server</code> some fields that would normally be created by the
        API won't exist on the data, and this can break our application code. So for now, we're simply going to create those
        server-generated properties on the client-side when we create the data.
      </p>

      <p>
        Later in the quickstart, we'll switch to a real API and will be able to delete this modification.
      </p>

      <h3>
        Fix "unique key" warning using cid
      </h3>

      <p>
        If you try to create a tweet, you'll notice this warning appear in the developer console:
      </p>

      <Markdown type="sh" text={`
      Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of 'Feed'.
      `}/>

      <p>
        This is the same error we saw earlier before we added a <code>key</code> to each tweet being rendered in the <code>Feed</code> component.
        The error is back because Lore's default behavior is to perform optimistic updates, which means the framework will
        render data as soon as it's created, without waiting for confirmation from the server. Since the server is responsible
        for assigning an <code>id</code> to resources, we see this error because there is a period of time when Lore tries to render the
        Tweet and it doesn't yet have an id.
      </p>

      <p>
        The <code>cid</code> property in the data structure exists for exactly this reason; to resolve challenges associated with
        optimistic updates. To remove this warning, simply update your <code>Feed</code> component to render the <code>cid</code> if the tweet
        doesn't have an id:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        export default createReactClass({
          ...

          renderTweet: function(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          },

          ...
        })
        `}/>
        <CodeTab syntax="ES6" text={`
        class Feed extends React.Component {
          ...

          renderTweet(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          }

          ...
        }
        `}/>
        <CodeTab syntax="ESNext" text={`
        class Feed extends React.Component {
          ...

          renderTweet(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          }

          ...
        }
        `}/>
      </CodeTabs>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/dialogs/step-4.png" />

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
          attributes: {
            text: {
              type: 'text',
              displayName: 'Message',
              placeholder: "What's happening?"
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
          }
        }
        `}/>
      </CodeTabs>

      <h3>
        src/components/CreateButton.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import _ from 'lodash';

        export default createReactClass({
          displayName: 'CreateButton',

          onClick: function() {
            function createTweet(params) {
              lore.actions.tweet.create(_.extend(params, {
                userId: 1,
                createdAt: new Date().toISOString()
              }));
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.create({
                onSubmit: createTweet
              });
            });
          },

          render: function() {
            return (
              <button
                type="button"
                className="btn btn-primary btn-lg create-button"
                onClick={this.onClick}>
                +
              </button>
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component } from 'react';
        import _ from 'lodash';

        class CreateButton extends React.Component {

          onClick() {
            function createTweet(params) {
              lore.actions.tweet.create(_.extend(params, {
                userId: 1,
                createdAt: new Date().toISOString()
              }));
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.create({
                onSubmit: createTweet
              });
            });
          }

          render () {
            return (
              <button
                type="button"
                className="btn btn-primary btn-lg create-button"
                onClick={this.onClick}>
                +
              </button>
            );
          }

        }

        export default CreateButton;
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component } from 'react';

        class CreateButton extends React.Component {

          onClick() {
            function createTweet(params) {
              lore.actions.tweet.create(_.extend(params, {
                userId: 1,
                createdAt: new Date().toISOString()
              }));
            }

            lore.dialog.show(function() {
              return lore.dialogs.tweet.create({
                onSubmit: createTweet
              });
            });
          }

          render () {
            return (
              <button
                type="button"
                className="btn btn-primary btn-lg create-button"
                onClick={this.onClick}>
                +
              </button>
            );
          }

        }

        export default CreateButton;
        `}/>
      </CodeTabs>

      <h3>
        src/components/Feed.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';

        export default connect(function(getState, props) {
          return {
            tweets: getState('tweet.find')
          }
        })(
        createReactClass({
          displayName: 'Feed',

          propTypes: {
            tweets: PropTypes.object.isRequired
          },

          renderTweet: function(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          },

          render: function() {
            const { tweets } = this.props;

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweets.data.map(this.renderTweet)}
                </ul>
              </div>
            );
          }

        })
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';

        class Feed extends React.Component {

          renderTweet(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          }

          render() {
            const { tweets } = this.props;

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweets.data.map(this.renderTweet)}
                </ul>
              </div>
            );
          }

        }

        Feed.propTypes = {
          tweets: PropTypes.object.isRequired
        };

        Feed.defaultProps = (function() {
          const tweet = {
            id: 1,
            cid: 'c1',
            state: 'RESOLVED',
            data: {
              id: 1,
              user: 1,
              text: 'Nothing can beat science!',
              createdAt: '2016-10-04T05:10:49.382Z'
            }
          };

          return {
            tweets: {
              state: 'RESOLVED',
              data: [tweet]
            }
          }
        })();

        export default connect(function(getState, props) {
          return {
            tweets: getState('tweet.find')
          }
        })(Feed);
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';

        @connect(function(getState, props) {
          return {
            tweets: getState('tweet.find')
          }
        })
        class Feed extends React.Component {

          static propTypes = {
            tweets: PropTypes.object.isRequired
          };

          static defaultProps = (function() {
            const tweet = {
              id: 1,
              cid: 'c1',
              state: 'RESOLVED',
              data: {
                id: 1,
                user: 1,
                text: 'Nothing can beat science!',
                createdAt: '2016-10-04T05:10:49.382Z'
              }
            };

            return {
              tweets: {
                state: 'RESOLVED',
                data: [tweet]
              }
            }
          })();

          renderTweet(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          }

          render() {
            const { tweets } = this.props;

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweets.data.map(this.renderTweet)}
                </ul>
              </div>
            );
          }

        }

        export default Feed;
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to <Link to="../step-5/">create a way to edit tweets</Link>.
      </p>
    </Template>
  )
};
