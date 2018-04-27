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

      <h3>
        Problem: New Tweets Do Not Appear
      </h3>
      <p>
        You may have noticed that new tweets you create only show up in the Feed after you refresh the page. The
        reason for this is that the application doesn't know what to do with the new tweets you create, since that
        answer is determined based on the experience you're creating.
      </p>
      <p>
        For this type of experience, we want new tweets to appear at the top of the page, otherwise the
        application will very quickly feel "out of date". But for other applications, it might not be as
        straight forward.
      </p>
      <p>
        For example, should new tweets show up at all? If yes, where should they show up? At the top of the list, at
        the bottom of the list? Should ALL new tweets show up, or just some? And if you DO want them to show up,
        should they show up immediately, or wait until the server confirms they'be been created?
      </p>
      <p>
        Because of that, Lore doesn't make any assumptions about what to do with "new data", and only gives you
        exactly what you ask for. Which is this case, is just the first page of tweets. But it DOES give you
        some tools easily describe the answers to those questions, and we'll be leveraging those tools in this
        step to turn out experience into what we want.
      </p>

      <h3>
        Display New Tweets
      </h3>
      <p>
        The <code>InfiniteScrollingList</code> component we created earlier actually has a section that allows
        you to put "other" data at the top of the list. The relevant section of the <code>render()</code> method
        is shown below:
      </p>
      <Markdown type="jsx" text={`
      render() {
        ...
        return (
          <div>
            <ul className="media-list tweets">
              {other ? other.data.map(row) : null}
              // ...
            </ul>
            // ...
          </div>
        );
      }
      `}/>
      <p>
        To provide "other" data, open the <code>Feed</code> component and update the <code>render()</code> method
        to look like this:
      </p>

      <Markdown type="jsx" text={`
      render() {
        ...
        return (
          <div className="feed">
            ...
            <InfiniteScrollingList
              selectOther={(getState) => {
                return getState('tweet.all', {
                  where: function(tweet) {
                    const isOptimistic = !tweet.id;
                    const isNew = moment(tweet.data.createdAt).diff(timestamp) > 0;
                    return !isOptimistic && isNew;
                  },
                  sortBy: function(model) {
                    return -moment(model.data.createdAt).unix();
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
        Here we've provided a <code>selectOther()</code> prop to the <code>InfiniteScrollingList</code>, which
        allows us to return an array of data that we want to be displayed at the top of the list.
      </p>
      <p>
        To do this, we're introducing a new <code>getState()</code> mapping called <code>tweet.all</code>, which
        allows you to search through all tweets in the store, and extract a subset. To narrow down the results,
        there are two properties you can provide; <code>where()</code> and <code>sortBy()</code>.
      </p>
      <p>
        The <code>where()</code> method is where we specify our matching criteria. In this case, we want any tweets
        created AFTER the timestamp we're using to freeze the pagination data, as well as any tweets that don't
        yet have an id (which means the user just created them, and the server has not yet confirmed).
      </p>
      <p>
        The <code>sortBy()</code> method allows us to express how we want those tweets to be ordered, and in this
        case, we want the newest tweets on top.
      </p>
      <p>
        With that change in place, new tweets will show up at the top of the <code>Feed</code> as soon as you
        create them.
      </p>

      <h3>
        Display Optimistic Tweets
      </h3>
      <p>
        So now new tweets show up at the top of the page, but only after the server confirms they exist. This means
        there's a short delay between the time the user creates the tweet and when they see it in the field. Let's
        remove that delay.
      </p>
      <p>
        To do that, update your <code>where()</code> method to look like this:
      </p>

      <Markdown type="jsx" text={`
      where() {
        const isOptimistic = !tweet.id;
        const isNew = moment(tweet.data.createdAt).diff(timestamp) > 0;
        return isOptimistic || isNew;
      }
      `}/>

      <p>
        Now we're saying "show any tweets that are optimistic OR new". But when you try to create a new tweet, the
        application will crash, with both a warning and an error in the console.
      </p>
      <Markdown type="jsx" text={`
      Warning: Each child in an array or iterator should have a unique "key" prop.
      ...
      Uncaught Error: Invalid call to 'getState('user.byId')'. Missing required attribute 'id'.
      `}/>
      <p>
        The warning is happening because up until now, we've using the <code>id</code> of our models as the key
        when rendering a list, which you can see in this code in <code>Feed</code>:
      </p>
      <Markdown type="jsx" text={`
      <InfiniteScrollingList
        ...
        row={(tweet) => {
          return (
            <Tweet key={tweet.id} tweet={tweet} />
          );
        }}
      />
      `}/>
      <p>
        To solve the warning, we simply need to provide an alternate key, which should be used when there is
        no <code>id</code> on the tweet. For that we're going to use the <code>cid</code> value. Update that
        code to look like this:
      </p>
      <Markdown type="jsx" text={`
      <InfiniteScrollingList
        ...
        row={(tweet) => {
          return (
            <Tweet key={tweet.id || tweet.cid} tweet={tweet} />
          );
        }}
      />
      `}/>
      <p>
        As for the error, that's happening because we're trying to render a tweet that doesn't have
        a <code>user</code> property yet. When we create data we know the server will assign it a <code>createdAt</code> date
        of when it was created, as well as set the <code>user</code> property to the user who created it. But when rendering
        data optimistically, we need to provide those fields ourselves, or provide an alternative version of a tweet
        specifically for rendering optimistic data.
      </p>
      <p>
        Open the <code>CreateButton</code> component and update the <code>onSubmit() method to look like this</code>:
      </p>
      <Markdown type="jsx" text={`

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
