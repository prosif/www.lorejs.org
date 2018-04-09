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
        Step 5: Show Optimistic Visual Cues
      </h1>

      <p>
        In this step we'll add an opacity effect to tweets to reflect when they're being created, updated or deleted.
      </p>

      <QuickstartBranch branch="optimistic.5" />

      <h3>
        What's the problem?
      </h3>
      <p>
        While it's great that we can show tweets in the Feed immediately, we know they're <em>real</em>, in the sense
        that the user can fully interact with them. But currently, there's no visual cue to distinguish between
        an optimistic tweet and a real tweet, to say "yes, this tweet really was created" or "yes, this update
        you asked us to make really did get saved".
      </p>
      <p>
        The change above solves our issue, but we're not providing the user with any feedback that a change
        is occurring, and even worse, we're exposing functionality that doesn't exist yet when tweets are being
        created.
      </p>

      <h3>
        How do we solve this?
      </h3>
      <p>
        To solve this, we're going to detect a tweet is being created, updated, or deleted, and then add fade the
        tweet to provide a visual cue that <em>something is happening</em>.
      </p>
      <p>
        To improve the experience, we're going to visually fade the tweet when it's being created, updated or
        deleted, and we're not going to show the <code>edit</code> or <code>delete</code> button until we have
        confirmation that the tweet actually exists (since we can't update or delete data that we don't know the
        id for).
      </p>

      <h3>
        Add Visual Cue for Optimistic Changes
      </h3>
      <p>
        Update the <code>render()</code> method of the <code>Tweet</code> component to look like this:
      </p>

      <Markdown text={`
      render: function() {
        var tweet = this.props.tweet;
        var user = this.props.user;
        var timestamp = moment(tweet.data.createdAt).fromNow().split(' ago')[0];
        var isOptimistic = (
          tweet.state === PayloadStates.CREATING ||
          tweet.state === PayloadStates.UPDATING ||
          tweet.state === PayloadStates.DELETING
        );

        return (
          <li className={"list-group-item tweet" + (isOptimistic ? " transition" : "")}>
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
              <div className="tweet-actions">
                <EditLink tweet={tweet} />
                <DeleteLink tweet={tweet} />
              </div>
            </div>
          </li>
        );
      }
      `}/>
      <p>
        In the code above, we're examining the <code>state</code> of the tweet, and if it's in the process of being
        created, updated, or destroy, then we're going to apply the <code>transition</code> class, which will fade
        the tweet and the hide the actions.
      </p>
      <p>
        Now tweets will only show the <code>edit</code> and <code>delete</code> links once the server confirms
        they exist, and any modifications to a tweet will show a visual cue to the user.
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
        In the next section <Link to="../../normalization/overview/">we'll add the ability to normalize the API
        responses</Link>.
      </p>
    </Template>
  )
};
