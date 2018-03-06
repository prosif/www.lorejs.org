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
        Next Steps
      </h1>

      <p>
        Congratulations! You've reached the end of the Quickstart. One of the challenges with using a somewhat realistic
        application for a walkthrough is that you get some realistic challenges that pop up during the course of building
        it. I want to call out some of these challenges now, partly just to recognize they exist, and partly to discuss a
        solution (which will be added as another section at a later date).
      </p>

      <h2>
        Problem: New Tweets do not show up at top of Feed
      </h2>

      <p>
        Ever since we introduced pagination, new tweets stopped showing up in the Feed when you create them. This certainly
        doesn't match the expected user experience. The reason for this is that the application doesn't know what to do with
        the new tweets you create. What the application is displaying is exactly what you asked for; the first page of tweets.
      </p>

      <p>
        You'll also notice that if you DO create a tweet, and then you try to load the next page of tweets, the console fills
        with this error:
      </p>

      <Markdown type="sh" text={`
      Warning: flattenChildren(...): Encountered two children with the same key
      `}/>

      <p>
        This error is caused by the fact that some of the tweets on the first page are ALSO on the second page. When you
        created a new tweet, it was saved to the server, and this modified which tweets appear on which page. The 5th tweet
        on the page you see is actually part of page 2 now. So when you request the second page of tweets, the 5th tweet is
        included, and React tries to render it twice, which throws the error above, because two React components have the same
        key (the id of the tweet).
      </p>

      <p>
        There are two challenges to solving this problem.
      </p>

      <h3>
        Challenge #1: Pagination Timestamp
      </h3>
      <p>
        First, you need freeze the timestamp used for pagination. One way to do this is to get the timestamp of when the
        application loads, and then provide is as an argument in the <code>tweet.find</code> call of the <code>Feed</code> component like this:
      </p>

      <Markdown text={`
      ...
      const timestamp = moment().format();

      export default connect(function(getState, props) {
        return {
          tweets: getState('tweet.find', {
            where: {
              where: {
                createdAt: {
                  '<=': timestamp
                }
              }
            },
            pagination: {
              sort: 'createdAt DESC',
              page: 1
            }
          })
        }
      })(
      createReactClass({
        displayName: 'Feed',
        ...
      })
      );
      `}/>

      <p>
        In the code above, the timestamp will never change, because it's established when the application loads. This means
        that tweets created after the application loads will never be included in the pagination, because it's always requesting
        tweets created BEFORE that point in time.
      </p>

      <h3>
        Challenge #2: Showing New Tweets
      </h3>
      <p>
        The second challenge is displaying new Tweets in the Feed. The timestamp fix above guarantees the application as-is
        will never display tweets we create. So to fix this we need to modify the application to detect and display new tweets.
      </p>

      <p>
        Luckily just because the application isn't <em>displaying</em> new tweets doesn't mean they aren't being stored. Every tweet
        in the application is stored by its <code>id</code> the <code>tweet.byId</code> reducer, which you can see if you open up the browser's
        developer console and enter this command:
      </p>

      <Markdown text={`
      lore.store.getState().tweet.byId
      `}/>

      <p>
        So one way to find all the new tweets would be to iterate through that dictionary every render cycle, and grab any
        tweets created after the timestamp used in pagination, like this:
      </p>

      <Markdown text={`
      const timestamp = moment().format();
      ...
      const storeState = lore.store.getState();

      const newTweets = Object.keys(storeState.tweet.byId).filter(function(id) {
        const tweet = storeState.tweet.byId[id];
        const createdAt = moment(tweet.data.createdAt);
        return createdAt.diff(timestamp) > 0;
      }).map(function(id) {
        return storeState.tweet.byId[id];
      });
      `}/>

      <p>
        That function will return an array of tweets created after the <code>timestamp</code>. However, since Tweet's don't receive an
        <code>id</code> until AFTER they return from the server, that will only give you tweets that ACTUALLY exist. If you want to
        display tweets optimistically, before the server confirms their creation, then you'd need to iterate through the
        <code>tweet.byCid</code> reducer that stores tweets by their client-side id (cid). It's the same code, just a different reducer:
      </p>

      <Markdown text={`
      const timestamp = moment().format();
      ...
      const storeState = lore.store.getState();

      const newTweets = Object.keys(storeState.tweet.byCid).filter(function(cid) {
        const tweet = storeState.tweet.byCid[cid];
        const createdAt = moment(tweet.data.createdAt);
        return createdAt.diff(timestamp) > 0;
      }).map(function(cid) {
        return storeState.tweet.byCid[cid];
      });
      `}/>

      <p>
        Once you have the list of new tweets, you just need to modify your Feed component to render the list of new tweets
        at the top of the page.
      </p>

      <h2>
        What about real-time, e.g. WebSockets?
      </h2>
      <p>
        WebSockets is absolutely a focus area for Lore, and beta support is already integrated, which you can see in the
        <Link to="https://github.com/lore/lore/tree/master/examples/websockets">websockets example</Link> if you're curious. In time the
        Quickstart be expanded to demonstrate it as well. But for now, it lives "behind the scenes" until some higher priority
        features are finished (like an elegant solution for creating forms and handling form validation).
      </p>

      <h2>
        That's all for now
      </h2>
      <p>
        That's all for now. If you have any questions, issues, features requests, ideas to improve the user experience, or
        just want additional thoughts about how to solve a front-end challenge with Lore, don't hesitate to
        <Link to="https://github.com/lore/lore/issues">submit an issue</Link> with your thoughts!
      </p>

    </Template>
  )
};
