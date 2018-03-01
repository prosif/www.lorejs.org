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
        Step 1: Normalize Tweet Response
      </h1>

      <p>
        In this step we'll update our API call to request nested data and teach the application how to process it.
      </p>

      <QuickstartBranch branch="normalization.1" />


      <h2>
        Request Nested Data
      </h2>
      <p>
        The first thing we need to do is update our <code>Feed</code> component to tell the API we want it to *populate* the <code>user</code>
        field in each tweet. We can do that by adding an extra parameter to our request.
      </p>

      <p>
        Open up <code>src/components/Feed</code> and modify the <code>lore.connect</code> call to look like this (adding the <code>populate</code> attribute
        to the pagination parameters):
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        module.exports = lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: props.location.query.page || '1',
                populate: 'user'
              }
            })
          }
        })(
          ...
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        export default lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: props.location.query.page || '1',
                populate: 'user'
              }
            })
          }
        })(
          ...
        );
        `}/>
        <CodeTab syntax="ESNext" text={`
        @lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: props.location.query.page || '1',
                populate: 'user'
              }
            })
          }
        })
        `}/>
      </CodeTabs>

      <p>
        If you refresh the page, you'll notice it no longer correctly. And if you look at the network requests, you'll see
        two things worth calling out:
      </p>

      <ol>
        <li>
          First, the API call to fetch the first page of tweets now looks like <code>http://localhost:1337/tweets?page=1&populate=user</code>,
          which is what we wanted (and you can confirm the user data is in fact nested in the response).
        </li>
        <li>
          The second thing you'll notice is that the first call to fetch the user for a tweet looks
          like <code>http://localhost:1337/users/%5Bobject%20Object%5D</code> instead
          of <code>http://localhost:1337/users/1</code>.
        </li>
      </ol>

      <p>
        The reason for the strange looking API call is because <code>tweet.data.user</code> used to be a number like <code>1</code>, but now it's an
        object. And since we haven't taught Lore how to process nested data, it just passes it along to the component.
      </p>


      <h3>
        Specify Nested Relationships
      </h3>
      <p>
        To fix this issue we need to tell Lore that <code>tweet</code> resources may contain nested <code>user</code> data, and this data should be
        broken out and converted to a <code>user</code> model.
      </p>

      <p>
        To do that open up <code>src/models/tweet.js</code> and add another attribute for the <code>user</code> field, specifying the <code>type</code> as a
        <code>model</code> and the associated <code>model</code> to be a <code>user</code>:
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        module.exports = {

          attributes: {
            text: {
              type: 'text',
              displayName: 'Message',
              placeholder: "What's happening?"
            },
            user: {
              type: 'model',
              model: 'user'
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
            },
            user: {
              type: 'model',
              model: 'user'
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
            },
            user: {
              type: 'model',
              model: 'user'
            }
          }

        }
        `}/>
      </CodeTabs>

      <p>
        With this change in place, refresh the browser you this time the application should load properly and you should see
        only two network requests instead of 6:
      </p>

      <Markdown type="sh" text={`
      [1] XHR finished loading: GET "http://localhost:1337/user"
      [2] XHR finished loading: GET "http://localhost:1337/tweets?page=1&populate=user"
      `}/>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this (exactly the same).
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/filtering/step-1.png" />


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
        module.exports = {

          attributes: {
            text: {
              type: 'text',
              displayName: 'Message',
              placeholder: "What's happening?"
            },
            user: {
              type: 'model',
              model: 'user'
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
            },
            user: {
              type: 'model',
              model: 'user'
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
            },
            user: {
              type: 'model',
              model: 'user'
            }
          }

        }
        `}/>
      </CodeTabs>

      <h3>
        src/components/Feed.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        var React = require('react');
        var Tweet = require('./Tweet');
        var PayloadStates = require('../constants/PayloadStates');
        var Router = require('react-router');
        var InfiniteScrolling = require('../decorators/InfiniteScrolling');
        var LoadMoreButton = require('./LoadMoreButton');

        module.exports = lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: props.location.query.page || '1',
                populate: 'user'
              }
            })
          }
        })(
        InfiniteScrolling({ propName: 'tweets', modelName: 'tweet' })(
        React.createClass({
          displayName: 'Feed',

          propTypes: {
            pages: React.PropTypes.array.isRequired,
            onLoadMore: React.PropTypes.func.isRequired
          },

          renderTweet: function(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          },

          render: function() {
            var pages = this.props.pages;
            var numberOfPages = pages.length;
            var firstPage = pages[0];
            var lastPage = pages[pages.length - 1];

            if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              );
            }

            var tweetListItems = _.flatten(pages.map(function(tweets) {
              return tweets.data.map(this.renderTweet);
            }.bind(this)));

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweetListItems}
                </ul>
                <LoadMoreButton
                  lastPage={lastPage}
                  onLoadMore={this.props.onLoadMore}
                  nextPageMetaField="nextPage" />
              </div>
            );
          }

        })
        )
        );
        `}/>
        <CodeTab syntax="ES6" text={`
        import React, { Component, PropTypes } from 'react';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';
        import InfiniteScrolling from '../decorators/InfiniteScrolling';
        import LoadMoreButton from './LoadMoreButton';

        class Feed extends Component {

          renderTweet(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          }

          render() {
            const pages = this.props.pages;
            const numberOfPages = pages.length;
            const firstPage = pages[0];
            const lastPage = pages[pages.length - 1];

            if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              );
            }

            const tweetListItems = _.flatten(pages.map(function(tweets) {
              return tweets.data.map(this.renderTweet);
            }.bind(this)));

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweetListItems}
                </ul>
                <LoadMoreButton
                  lastPage={lastPage}
                  onLoadMore={this.props.onLoadMore}
                  nextPageMetaField="nextPage" />
              </div>
            );
          }

        }

        Feed.propTypes ={
          tweets: PropTypes.object.isRequired
        };

        export default lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: props.location.query.page || '1',
                populate: 'user'
              }
            })
          }
        })(
        InfiniteScrolling({ propName: 'tweets', modelName: 'tweet' })(
        Feed
        )
        );
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React, { Component, PropTypes } from 'react';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';
        import InfiniteScrolling from '../decorators/InfiniteScrolling';
        import LoadMoreButton from './LoadMoreButton';

        @lore.connect(function(getState, props){
          return {
            tweets: getState('tweet.find', {
              pagination: {
                page: props.location.query.page || '1',
                populate: 'user'
              }
            })
          }
        })
        @InfiniteScrolling({ propName: 'tweets', modelName: 'tweet' })
        class Feed extends Component {

          static propTypes = {
            pages: PropTypes.array.isRequired,
            onLoadMore: PropTypes.func.isRequired
          };

          renderTweet(tweet) {
            return (
              <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
            );
          }

          render() {
            const pages = this.props.pages;
            const numberOfPages = pages.length;
            const firstPage = pages[0];
            const lastPage = pages[pages.length - 1];

            if (numberOfPages === 1 && lastPage.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              );
            }

            const tweetListItems = _.flatten(pages.map(function(tweets) {
              return tweets.data.map(this.renderTweet);
            }.bind(this)));

            return (
              <div className="feed">
                <h2 className="title">
                  Feed
                </h2>
                <ul className="media-list tweets">
                  {tweetListItems}
                </ul>
                <LoadMoreButton
                  lastPage={lastPage}
                  onLoadMore={this.props.onLoadMore}
                  nextPageMetaField="nextPage" />
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
        In the next section we'll learn how to <Link to="../../publishing/overview/">build and deploy the application for production</Link>.
      </p>
    </Template>
  )
};
