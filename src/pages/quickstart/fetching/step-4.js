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
        Step 4: Display Loading Experience
      </h1>

      <p>
        In this step we're going to use the <code>state</code> property in the data structure in order to display a loading message
        while the list of tweets are being fetching.
      </p>

      <QuickstartBranch branch="fetching.4" />

      <h3>
        The Problem
      </h3>
      <p>
        While it may happen too quickly to notice, there is a period of time before the list of tweets is displayed when
        the page simply says "Feed" with a blank experience underneath. This happens because the application doesn't fetch the
        tweets until the first time the <code>Feed</code> component is rendered, and that component can't render data it doesn't have yet.
      </p>

      <p>
        Showing a blank view is a bad user experience, so let's update our <code>Feed</code> component to display the text "Loading..."
        while the tweets are being fetched.
      </p>

      <h3>
        Add a Loading Experience
      </h3>
      <p>
        When Lore interacts with data (such as fetching, creating, updating or deleting it) the action creators built into
        the framework update the <code>state</code> property of the data to reflect the action being performed.
      </p>

      <p>
        The first time our <code>Feed</code> component is rendered for example, it requests the data associated with <code>tweet.find</code>
        using the <code>getState</code> method of the <code>connect</code> decorator. Since this data doesn't exist yet, the framework invokes
        an action to go fetch it.
      </p>

      <p>
        This action will set the <code>state</code> property of the data to <code>FETCHING</code> in order to notify you that the data is being
        fetched. Once the data returns, the action will update the <code>state</code> property to have a value of <code>RESOLVED</code> to signify
        that the data has been fetched. If there is an error fetching the data, the state would be updated to <code>ERROR_FETCHING</code>.
        Let's use this behavior to create our loading experience.
      </p>

      <p>
        We're going to start by importing a file called <code>PayloadStates</code> that resides in <code>src/constants</code>. This file is the set of
        string constants that the framework applies to data by default. Import that file into <code>Feed</code> and then update the render
        method to display the text <em>"Loading..."</em> when the <code>state</code> of the <code>tweets</code> is <code>FETCHING</code>.
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        ...
        import PayloadStates from '../constants/PayloadStates';
        ...

          render: function() {
            const { tweets } = this.props;

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

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

        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        ...
        import PayloadStates from '../constants/PayloadStates';
        ...

          render() {
            const { tweets } = this.props;

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

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

        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        ...
        import PayloadStates from '../constants/PayloadStates';
        ...

          render() {
            const { tweets } = this.props;

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

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

        ...
        `}/>
      </CodeTabs>

      <p>
        Refresh the browser and you should see the text "Loading..." flash on the screen right before the tweets are rendered.
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
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';

        export default connect(function(getState, props){
          return {
            tweets: getState('tweet.find')
          }
        })(
        createReactClass({
          displayName: 'Feed',

          propTypes: {
            tweets: PropTypes.object.isRequired
          },

          getDefaultProps: function() {
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
          },

          renderTweet: function(tweet) {
            return (
              <Tweet key={tweet.id} tweet={tweet} />
            );
          },

          render: function() {
            const { tweets } = this.props;

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

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
        import React from 'react';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';

        class Feed extends React.Component {

          renderTweet(tweet) {
            return (
              <Tweet key={tweet.id} tweet={tweet} />
            );
          }

          render() {
            const { tweets } = this.props;

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

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

        export default connect(function(getState, props){
          return {
            tweets: getState('tweet.find')
          }
        })(Feed);
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import PropTypes from 'prop-types';
        import { connect } from 'lore-hook-connect';
        import Tweet from './Tweet';
        import PayloadStates from '../constants/PayloadStates';

        @connect(function(getState, props){
          return {
            tweets: getState('tweet.find')
          }
        })
        class Feed extends React.Component {

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
            const { tweets } = this.props;

            if (tweets.state === PayloadStates.FETCHING) {
              return (
                <h1 className="loading-text">
                  Loading...
                </h1>
              )
            }

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
        Next we're going to <Link to="../step-5/">fetch the user for each tweet</Link>
      </p>
    </Template>
  )
};
