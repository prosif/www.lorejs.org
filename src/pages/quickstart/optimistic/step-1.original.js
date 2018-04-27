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
        Step 1: Freeze Pagination Data
      </h1>

      <p>
        In this step we'll add a timestamp to our pagination requests, to "freeze" the data and solve an
        error that occurs when we fetch new pages after creating a new tweet.
      </p>

      <QuickstartBranch branch="optimistic.1" />

      <h3>
        Error when paginating after creating a tweet
      </h3>
      <p>
        Ever since we introduced pagination, new tweets stopped showing up in the Feed when you create them.
        This certainly doesn't match the expected user experience. The reason for this is that the application
        doesn't know what to do with the new tweets you create. What the application is displaying is exactly
        what you asked for; the first page of tweets.
      </p>

      <p>
        You'll also notice that if you <em>DO</em> create a tweet, and then you try to load the next page of tweets,
        the console fills with this error:
      </p>

      <Markdown text={`
      Warning: flattenChildren(...): Encountered two children with the same key
      `}/>

      <p>
        This error is caused by the fact that some of the tweets on the first page are <em>ALSO</em> on the
        second page. To illustrate, let's say the server has 6 tweets, and you want to display those tweets in
        two pages, with three tweets per page:
      </p>

      <Markdown text={`
      --- page 1 ----
      'tweet 6'
      'tweet 5'
      'tweet 4'
      --- page 2 ----
      'tweet 3'
      'tweet 2'
      'tweet 1'
      `}/>

      <p>
        When you create a new tweet, it gets stored on the server, and becomes <code>tweet 7</code>. But because
        we're displaying tweets in chronological order, <code>tweet 7</code> now shows up on <code>page 1</code> and
        pushes back the other tweets, effectively changing what data is displayed on which page, like this:
      </p>

      <Markdown text={`
      --- page 1 ----
      'tweet 7'
      'tweet 6'
      'tweet 5'
      --- page 2 ----
      'tweet 4'
      'tweet 3'
      'tweet 2'
      --- page 3 ----
      'tweet 1'
      `}/>

      <p>
        If you fetch the second page, you'll now get <code>tweet 4</code>, which was already returned as part
        of the first page. And now React will try to render it twice, once as part of the data
        for <code>page 1</code> and again as part of the data for <code>page 2</code>, which will throw the error
        above, because two React components have the same key (the id of the tweet).
      </p>

      <p>
        To solve this problem, we're going to create a timestamp, and use that to "freeze" the pagination data
        by requesting all data relative to a specific point in time. This way, new tweets won't affect what data
        is displayed on which page.
      </p>

      <h3>
        Add Timestamp to Feed
      </h3>
      <p>
        Open your <code>Feed</code> component and add a <code>getInitialState()</code> method that will generate
        a timestamp of when that component was mounted.
      </p>

      <Markdown type="jsx" text={`
      ...
      getInitialState() {
        return {
          timestamp: new Date().toISOString()
        };
      },
      ...
      `}/>

      <h3>
        Freeze the Pagination Data
      </h3>
      <p>
        Now that we have the timestamp, we need to update our network requests to say "only give me tweets
        created BEFORE this timestamp". To do that, the Sails API accepts a `where` object as a query parameter,
        that allows us to make some pretty interesting requests. For example, to fetch all tweets created before
        a certain date, we can pass this object as a query parameter:
      </p>

      <Markdown text={`
      where: {
        createdAt: {
          '<=': timestamp
        }
      }
      `}/>

      <p>
        Which would look like this as a network request:
      </p>

      <Markdown text={`
      http://localhost:1337/tweets?where={createdAt: {"<=": "2017-05-14T15:28:05-07:00"}}
      `}/>

      <p>
        To accomplish this, open up your <code>Feed</code> component and modify the <code>render()</code> function
        to look like this:
      </p>

      <Markdown type="jsx" text={`
      render() {
        const { timestamp } = this.state;

        return (
          <div className="feed">
            ...
            <InfiniteScrollingList
              select={(getState) => {
                return getState('tweet.find', {
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
                });
              }}
              ...
            />
          </div>
        );
      }
      `}/>
      <p>
        Here we're getting the <code>timestamp</code> from <code>this.state</code>, and add a <code>where</code> property
        to the <code>getState()</code> call of the <code>select()</code> method, that reflects the object we need to
        send the API server.
      </p>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this (the same as before) but you should no
        longer see an error in the console when you paginate after creating a tweet.
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
        In the next section we'll learn how to <Link to="../step-2/">display new tweets at the top of the Feed</Link>.
      </p>
    </Template>
  )
};
