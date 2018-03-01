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
        Step 3: Connect Feed Component
      </h1>

      <p>
        In this step we're going to use the <code>connect</code> decorator to enable our Tweet component to declare what data it needs.
      </p>

      <QuickstartBranch branch="fetching.3" />

      <h3>
        The Connect Decorator
      </h3>
      <p>
        Lore provides a decorator (also known as a Higher Order Component) that allows components to declare what data they
        need, and the framework will automatically retrieve it from the API if it doesn't exist in the local store.
      </p>

      <p>
        The decorator is called <code>connect</code> and the syntax for using it looks like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find')
          }
        })(React.createClass({...}));
        `}/>
        <CodeTab syntax="ES6" text={`
        class MyComponent extends Component {...}

        lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find')
          }
        })(MyComponent);
        `}/>
        <CodeTab syntax="ESNext" text={`
        @lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find')
          }
        })
        class MyComponent extends Component {...}
        `}/>
      </CodeTabs>

      <blockquote>
        <p>
          You can learn more about <code>connect</code> in the <Link to="/architecture/connect/">concept documentation</Link> as well as the documentation
          for <Link to="/features/config/connect/">configuring connect</Link>.
        </p>
      </blockquote>

      <p>
        The first parameter <code>getState</code> is a function that will retrieve a piece of state from the local store, or invoke the
        appropriate action to fetch that data if it doesn't already exist (i.e. it hasn't been fetched from the server before).
      </p>

      <p>
        In this example, we're requesting <code>tweet.find</code>. The <code>find</code> reducer is responsible for storing the results of all query
        and pagination requests made to the server. Since we aren't passing in any query parameters or pagination information,
        this request translates to <em>"make a call to the /tweets endpoint on the API and give me whatever comes back"</em>.
      </p>

      <p>
        That data will then be passed to our Feed component as <code>tweets</code> since that is what we named the key.
      </p>

      <h3>
        Wrap Feed with Connect
      </h3>
      <p>
        To use <code>connect</code>, open up your <code>Feed</code> component and wrap it with the decorator like this:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        module.exports = lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find')
          }
        })(
        React.createClass({
          ...
        })
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        class Feed extends Component {
          ...
        };

        export default lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find')
          }
        })(Feed);
        `}/>
        <CodeTab syntax="ESNext" text={`
        @lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find')
          }
        })
        class Feed extends Component {
          ...
        };

        export default Feed;
          `}/>
      </CodeTabs>

      <p>
        Once you've wrapped the <code>Feed</code> component, reload the page, and you'll notice the mock data has been replaced by real
        data from the API!
      </p>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/fetching/step-3.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/components/Feed.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var Tweet = require('./Tweet');

        module.exports = lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find')
          }
        })(
        React.createClass({
          displayName: 'Feed',

          propTypes: {
            tweets: React.PropTypes.object.isRequired
          },

          getDefaultProps: function() {
            var tweet = {
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
          },

          renderTweet: function(tweet) {
            return (
              <Tweet key={tweet.id} tweet={tweet} />
            );
          },

          render: function() {
            var tweets = this.props.tweets;

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
        import React, { Component, PropTypes } from 'react';
        import Tweet from './Tweet';

        class Feed extends Component {

          renderTweet(tweet) {
            return (
              <Tweet key={tweet.id} tweet={tweet} />
            );
          }

          render() {
            const tweets = this.props.tweets;

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

        export default lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find')
          }
        })(Feed);
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import Tweet from './Tweet';

        @lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find')
          }
        })
        class Feed extends Component {

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
              <Tweet key={tweet.id} tweet={tweet} />
            );
          }

          render() {
            const tweets = this.props.tweets;

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
        Next we're going to <Link to="../step-4/">display a loading message while the tweets are being fetched</Link>.
      </p>
    </Template>
  )
};