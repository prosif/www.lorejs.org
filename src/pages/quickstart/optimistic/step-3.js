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
        Step 3: Show Optimistic Visual Cues
      </h1>

      <p>
        In this step we'll add an opacity effect to tweets to reflect when they're being created, updated or deleted.
      </p>

      <QuickstartBranch branch="optimistic.3" />

      <h3>
        Problem: Error When Creating Tweets
      </h3>
      <p>
        If you try to create a tweet, if may look like the application behaves correctly, but if you look in the console
        you'll see the following error:
      </p>

      <Markdown text={`
      Invalid call to "getState('user.byId')". Missing required attribute "id".
      `}/>

      <p>
        This happens because the call to create a tweet in the <code>CreateButton</code> component looks like this:
      </p>

      <Markdown text={`
      lore.actions.tweet.create(params);
      `}/>

      <p>
        At the point this action is called, <code>params</code> only contains the
        parameter <code>{`{"text": "Some tweet text"}`}</code>, but our application immediately tries to render the
        Tweet (because Lore defaults to optimistic behavior). But the error we see is generated by
        the <code>Tweet</code> component which has a <code>connect</code> call that look like this:
      </p>

      <Markdown text={`
      lore.connect(function(getState, props){
        var tweet = props.tweet;

        return {
          user: getState('user.byId', {
            id: tweet.data.user
          })
        };
      })
      `}/>

      <p>
        When this method tries to render our optimistic tweet, there <em>is not user field</em> on
        the <code>tweet</code> we just created, so we get this error because the <code>getState</code> call
        can't locate a tweet with an undefined id.
      </p>

      <h3>
        Set Optimistic Data for New Tweets
      </h3>
      <p>
        To fix this, we <em>could</em> add logic to our component to behave differently when
        no <code>user</code> field exists (like showing an unknown avatar photo or changing the timestamp
        message to something like 'saving...'), but in this case we're going to do something much simpler, and
        simply provide the <code>user</code> and <code>createdAt</code> fields ourselves when we create the
        tweet. We already know what those fields will be anyway, so in this case, we can simply set them
        ourselves on the optimistic data to get the experience we want.
      </p>

      <p>
        To fix this problem, update the <code>onClick()</code> method of the <code>CreateButton</code> component
        to look like this:
      </p>

      <Markdown text={`
      onClick: function() {
        var user = this.context.user;

        function createTweet(params) {
          lore.actions.tweet.create(_.extend(params, {
            user: user.id,
            createdAt: new Date().toISOString()
          }));
        }

        lore.dialog.show(function() {
          return lore.dialogs.tweet.create({
            onSubmit: createTweet
          });
        });
      }
      `}/>

      <h3>
        Add Visual Cue for Optimistic Changes
      </h3>
      <p>
        The change above solves our issue, but we're not providing the user with any feedback that a change
        is occurring, and even worse, we're exposing functionality that doesn't exist yet when tweets are being
        created.
      </p>

      <p>
        To improve the experience, we're going to visually fade the tweet when it's being created, updated or
        deleted, and we're not going to show the <code>edit</code> or <code>delete</code> button until we have
        confirmation that the tweet actually exists (since we can't update or delete data that we don't know the
        id for).
      </p>

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
        Now tweets will only show the <code>edit</code> and <code>delete</code> links once the server confirms
        they exist, and any modifications to a tweet will show a visual cue to the user. That's a much better
        experience.
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
        In the next section we'll <Link to="../../websockets/overview/">we'll add support for WebSockets</Link>.
      </p>
    </Template>
  )
};
