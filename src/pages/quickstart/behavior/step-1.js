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
        Step 1: Display Tweets Immediately
      </h1>

      <p>
        In this step we're going to learn how to get our tweets to show up in the page immediately.
      </p>

      <QuickstartBranch branch="behavior.1" />

      <h3>
        Why is this happening?
      </h3>
      <p>
        So first off, let's talk about why this is happening. While this behavior doesn't match our expectations,
        it <strong>does</strong> match <em>what we told it to do</em>, which was to <strong>display the list
        of tweets returned from the server</strong>.
      </p>
      <p>
        The issue is we know this list is now different, since we just created a tweet, and expect the tweet
        we create to show up in the list (because we know it's now part of the data on the server).
      </p>
      <p>
        But the <code>getState</code> call we use <em>doesn't</em> know that, and it can't assume that, because
        there may be other views we create we want to show <strong>only the data retrieved at the time the server
        responded</strong>.
      </p>

      <h3>
        How do we fix this?
      </h3>
      <p>
        To fix this, we just need to help the <code>getState</code> call to understand that the behavior we want
        is a little different that what it does by default; that instead of providing <strong>only</strong> the
        data returned from the server, we also want to <strong>include</strong> any data created since then.
      </p>
      <p>
        To do this, open up the <code>Feed</code> component and modify the <code>getState</code> call to look
        like this:
      </p>

      <Markdown text={`
      export default connect(function(getState, props) {
        return {
          tweets: getState('tweet.find', {
            include: function(model) {
              return true;
            }
          })
        }
      })
      `}/>

      <p>
        Here we've added an <code>include</code> attribute to the options for our <code>getState</code> call. This
        function behaves like a filter, except that instead of <em>removing</em> data it allows you
        to <strong>include</strong> data.
      </p>
      <p>
        It does this by iterating through resource in the reducer cache for the target model (in this case it
        iterates through every tweet). And for each tweet, you can choose to inspect it, and then
        return <code>true</code> if it should be included, or false if it should be left out.
      </p>
      <p>
        In this case, we're going to return <code>true</code> for everything, because we want to
        display <strong>all tweets</strong>.
      </p>
      <p>
        With this change in place, go ahead and try to create another tweet. This time, it <em>will</em> show up in
        the Feed immediately...but at the bottom :)
      </p>

      <h3>
        Why is it at the bottom?
      </h3>
      <p>
        The tweet we created shows up at the bottom because that's where the data gets pushed by default. FIRST,
        the <code>getState</code> call retrieves the data we requested from the local cache, which is the list of
        tweets we fetched from the server. And then it APPENDS any tweets we want to <strong>include</strong> to
        the end of that list.
      </p>
      <p>
        To get our tweets to show up at the top of the list, we need to instruct how we want
        the <code>getState</code> call to order the data.
      </p>

      <h3>
        Ordering the Tweets
      </h3>
      <p>
        To inform <code>getState</code> how we want the data to be ordered, update your method call to look like
        this:
      </p>

      <Markdown text={`
      import moment from 'moment';

      export default connect(function(getState, props) {
        return {
          tweets: getState('tweet.find', {
            include: function(model) {
              return true;
            },
            sortBy: function(model) {
              return -moment(model.data.createdAt).unix();
            }
          })
        }
      })
      `}/>

      <p>
        Here we imported the <code>moment</code> library, and converted our <code>createdAt</code> date to
        unix timestamp, which is a number we can use to order dates.
      </p>
      <p>
        With this change in place, create another tweet, and this time it will show up at top of the Feed.
      </p>

      <h3>
        Replace find with findAll
      </h3>
      <p>
        The need we just solved for is pretty common; the desire to append data a user created to a list of data
        previously retrieved from the server. To account for this, there's another <strong>blueprint</strong> for
        the the <code>getState</code> called <code>findAll</code> that removes some of the boilerplate.
      </p>
      <p>
        To use it, update your method call to look like this:
      </p>

      <Markdown text={`
      import moment from 'moment';

      export default connect(function(getState, props) {
        return {
          tweets: getState('tweet.findAll', {
            sortBy: function(model) {
              return -moment(model.data.createdAt).unix();
            }
          })
        }
      })
      `}/>

      <p>
        This blueprint is identical to <code>find</code> except that it will automatically append data in the
        local cache that matches the criteria for the question. And since we provided no filter criteria to the
        server, it will interpret that to mean it should add <strong>every tweet in the local cache</strong> to
        the data.
      </p>
      <p>
        We'll see this blueprint used with filter criteria later in the Quickstart.
      </p>

      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      <img className="drop-shadow" src="/assets/images/quickstart/dialogs/step-1.png" />

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        src/components/CreateButton.js
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
        Next we're going to <Link to="../../authentication/overview/">learn how to implement an authentication flow</Link>.
      </p>
    </Template>
  )
};
