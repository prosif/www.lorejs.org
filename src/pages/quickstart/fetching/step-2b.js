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
        Convention over Configuration
      </h1>

      <p>
        As you'll soon see, we now have all the code required to fetch tweets from the API. Lore accomplishes this
        using a philosophy called <strong>convention-over-configuration</strong>. With this approach the framework
        makes some assumptions about what you want, and then provides you with the ability to override those
        assumptions if you need to.
      </p>

      <p>
        If you'd like to see some of this functionality demonstrated now, and are comfortable using the console provided in
        the developer tools for your browser, you may follow along with the steps below. If not, feel free to
        <Link to="../step-3/">skip this step</Link>. It is entirely optional.
      </p>

      <h3>
        Console Demo: Actions
      </h3>
      <p>
        To illustrate, refresh the browser and open up the developer console. Then enter this command into the console:
      </p>

      <Markdown text={`
      lore.actions.tweet.find()
      `}/>

      <p>
        When you created the <code>tweet</code> model Lore assumed you wanted a set of actions that could find, create, update and
        delete tweets. After creating these actions, it attached them to <code>lore.actions</code>. The command you just entered invoked
        the <code>find</code> action to fetch tweets from the API. And if you examine the network tab, you can see that a network request
        was indeed sent out to <code>http://localhost:1337/tweets</code>.
      </p>

      <blockquote>
        <p>
          The URL was composed from a convention, which defaults to "pluralize the model name and append it to the apiRoot". You
          can change this convention as needed by modifying the <code>model</code> settings for pluralization, casing style, or simply
          providing an explicit endpoint.
        </p>
      </blockquote>

      <p>
        You can also fetch tweets by a specific user, by providing an object of query parameters to find() like this:
      </p>

      <Markdown text={`
      lore.actions.tweet.find({
        userId: 1
      })
      `}/>

      <h3>
        Console Demo: Reducers & Store State
      </h3>
      <p>
        In addition to create a set of actions, Lore also produces a set of reducers that store the tweets returned by the API.
        To see the list of tweets returned for example, enter this command into the developer console:
      </p>

      <Markdown text={`
      lore.store.getState().tweet.byId
      `}/>

      <p>
        That's pretty impressive, but we're not done yet. In the next section we'll learn how components can declare what data
        they need.
      </p>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going to <Link to="../step-3/">connect our Feed to real data</Link>.
      </p>
    </Template>
  )
};
