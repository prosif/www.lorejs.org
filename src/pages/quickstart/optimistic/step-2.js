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
        Step 2: Display New Tweets
      </h1>

      <p>
        In this step we'll display new tweets at the top of the Feed.
      </p>

      <QuickstartBranch branch="optimistic.2" />

      <h2>
        Problem: New Tweets Do Not Appear
      </h2>

      <p>
        Ever since we introduced pagination, new tweets stopped showing up in the Feed when you create them. This certainly
        doesn't match the expected user experience. The reason for this is that the application doesn't know what to do with
        the new tweets you create. What the application is displaying is exactly what you asked for; the first page of tweets.
      </p>

      <p>
        To solve this, we're going to use a different `lore.connect` mapping called `tweet.all`, which when can use to filter
        and sort the existing tweet, and only extract the new ones.
      </p>

      <h2>
        Get New Tweets
      </h2>
      <p>
        Update the `lore.connect` call in the `Feed` component to use the `tweet.all` mapping. This function has two optional
        parameters. By default, it returns *all* tweets, but you can pass in an optional filter method using the  `where`
        paramter, as well as an optional sorting criteria using the `sortBy` parameter.
      </p>

      <Markdown text={`
      var moment = require('moment');

      module.exports = lore.connect(function(getState, props){
        return {
          newTweets: getState('tweet.all', {
            where: function(tweet) {
              return !tweet.id || moment(tweet.data.createdAt).diff(lore.timestamp) > 0
            },
            sortBy: function(tweet) {
              return -moment(tweet.data.createdAt).unix();
            }
          }),
          tweets: getState('tweet.find', {
            where: {
              where: {
                createdAt: {
                  '<=': lore.timestamp
                }
              }
            },
            pagination: {
              sort: 'createdAt DESC',
              page: props.location.query.page || '1',
              populate: 'user'
            }
          })
        }
      })
      `}/>

      <h2>
        Display New Tweets
      </h2>
      <p>
        Next, update the `Feed` component itself to render the new tweets above the paginated results.
      </p>

      <Markdown text={`
      React.createClass({
        // ...

        propTypes: {
          newTweets: React.PropTypes.object.isRequired,
          // ...
        },

        // ...

        render: function() {
          // ...
          var newTweets = this.props.newTweets.data.map(this.renderTweet);

          return (
            <div className="feed">
              <h2 className="title">
                Feed
              </h2>
              <ul className="media-list tweets">
                {newTweets}
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
      `}/>

      <p>
        Now when you create new tweets, they'll show up at the top of the Feed.
      </p>

      <h2>
        Repeat for the UserTweets Component
      </h2>
      <p>
        Now make the same changes to the `UserTweets` component:
      </p>

      <Markdown text={`
      // ...
      var moment = require('moment');

      module.exports = lore.connect(function(getState, props){
        return {
          newTweets: getState('tweet.all', {
            where: function(tweet) {
              return (
                tweet.data.user === Number(props.params.userId) &&
                !tweet.id || moment(tweet.data.createdAt).diff(lore.timestamp) > 0
              )
            },
            sortBy: function(tweet) {
              return -moment(tweet.data.createdAt).unix();
            }
          }),
          tweets: getState('tweet.find', {
            // ...
          })
        }
      })(
      InfiniteScrolling({ propName: 'tweets', modelName: 'tweet' })(
      React.createClass({
        // ...

        propTypes: {
          newTweets: React.PropTypes.object.isRequired,
          // ...
        },

        // ...

        render: function() {
          // ...

          var newTweets = this.props.newTweets.data.map(this.renderTweet);

          return (
            <div className="feed">
              <h2 className="title">
                My Tweets
              </h2>
              <ul className="media-list tweets">
                {newTweets}
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

      <p>
        With that change in place, new tweets will show up in both the `Feed` and `UserTweets` components, regardless of which
        page you create the tweet on.
      </p>


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
        src/components/Feed.js
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
        In the next section we'll add a <Link to="../step-3/">visual cue when tweets are being
        created, updated or deleted</Link>.
      </p>
    </Template>
  )
};
