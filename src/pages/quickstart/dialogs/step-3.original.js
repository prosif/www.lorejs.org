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
        Step 3: Add Create Tweet Dialog
      </h1>

      <p>
        In this step we're going create a dialog that we can use to create tweets.
      </p>

      <QuickstartBranch branch="dialogs.3" />

      <h3>
        Add Create Tweet Dialog
      </h3>
      <p>
        Run this command to generate the component we'll use for the dialog:
      </p>

      <Markdown type="sh" text={`
      lore generate component CreateTweetDialog
      `}/>

      <p>
        Then open the file and update it to look like this:
      </p>

      <Markdown text={`
      import React from 'react';
      import createReactClass from 'create-react-class';
      import PropTypes from 'prop-types';
      import _ from 'lodash';

      export default createReactClass({
        displayName: 'CreateTweetDialog',

        propTypes: {
          title: PropTypes.node,
          description: PropTypes.node
        },

        getInitialState: function() {
          return {
            data: {
              text: ''
            }
          };
        },

        componentDidMount: function() {
          this.show();
        },

        show: function() {
          const modal = this.refs.modal;
          $(modal).modal('show');
        },

        dismiss: function() {
          const modal = this.refs.modal;
          $(modal).modal('hide');
        },

        onSubmit: function() {
          const { data } = this.state;
          console.log(data);
          this.dismiss();
        },

        onChange: function(name, value) {
          const nextData = _.merge({}, this.state.data);
          nextData[name] = value;
          this.setState({
            data: nextData
          });
        },

        render: function() {
          const { data } = this.state;

          return (
            <div ref="modal" className="modal fade">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" onClick={this.dismiss}>
                      <span>&times;</span>
                    </button>
                    <h4 className="modal-title">
                      Create Tweet
                    </h4>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Message</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            value={data.text}
                            placeholder="What's happening?"
                            onChange={(event) => {
                              this.onChange('text', event.target.value)
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="row">
                      <div className="col-md-12">
                        <button
                          type="button"
                          className="btn btn-default"
                          onClick={this.dismiss}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          disabled={!data.text}
                          onClick={this.onSubmit}
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }

      });
      `}/>
      <p>
        This code will give us a Bootstrap dialog we can use to create tweets. When launched, it will fade into
        view, and allow us to enter the text for the tweet and submit it.
      </p>
      <blockquote>
        <p>
          You can learn more about Bootstrap dialogs (called Modals) in
          the <a href="https://getbootstrap.com/docs/3.3/javascript/#modals">modal documentation</a> on the
          Bootstrap website.
        </p>
      </blockquote>
      <p>
        The important part to call out here is the <code>onSubmit</code> handler, shown below:
      </p>

      <Markdown text={`
      onSubmit: function() {
        const { data } = this.state;
        console.log(data);
        this.dismiss();
      },
      `}/>

      <p>
        Once the user submits the dialog, this function will be invoked. For now, we're simply going to log the
        data to the console, and then dismiss the dialog.
      </p>

      <h3>
        Show the Dialog
      </h3>
      <p>
        Next, update the <code>CreateButton</code> component to mount this dialog instead of our "Dialog Placeholder"
        text:
      </p>

      <Markdown text={`
      ...
      import CreateTweetDialog from './CreateTweetDialog';

      export default createReactClass({
        ...
        onClick: function() {
          lore.dialog.show(function() {
            return (
              <CreateTweetDialog />
            );
          });
        },
        ...
      });
      `}/>

      <p>
        Now, when you click the button to create a dialog, a real dialog appears, and you can even fill it and
        submit the form, causing the data to be logged to the console.
      </p>


      <h3>
        Save the Tweet
      </h3>
      <p>
        Now we can launch a dialog and get the user input, but we aren't sending it to the API. Let's fix that.
      </p>

      <p>
        Instead of logging the user data, we're going to pass it to the <code>tweet.create</code> action. Modify
        the <code>onSubmit</code> callback to look like this (you'll also need to import <code>lodash</code> at the
        top of the file):
      </p>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import _ from 'lodash';
        ...
          onSubmit() {
            const { data } = this.state;
            // lore.actions.tweet.create(_.defaults(data, {
            //   userId: 1,
            //   createdAt: new Date().toISOString()
            // }));
            lore.actions.tweet.create(data);
            this.dismiss();
          },
        ...
        `}/>
        <CodeTab syntax="ES6" text={`
        import _ from 'lodash';
        ...
          onSubmit() {
            const { data } = this.state;
            lore.actions.tweet.create(_.defaults(data, {
              userId: 1,
              createdAt: new Date().toISOString()
            }));
            this.dismiss();
          },
        ...
        `}/>
        <CodeTab syntax="ESNext" text={`
        import _ from 'lodash';
        ...
          onSubmit() {
            const { data } = this.state;
            lore.actions.tweet.create(_.defaults(data, {
              userId: 1,
              createdAt: new Date().toISOString()
            }));
            this.dismiss();
          },
        ...
        `}/>
      </CodeTabs>

      <p>
        Now when you submit a tweet, the action will send the data to the API. Try it out!
      </p>
      <p>
        It's important to point out that the tweets you create <strong>will not appear on the page</strong> until
        you refresh the browser. We'll learn how to change that behavior later in the Quickstart, so that the tweets
        we create will show up at the top of the Feed.
      </p>

      <h3>
        [DELETE] What's up with the _.defaults call?
      </h3>

      <p>
        Under normal circumstances our action call would only look like this (with no call to <code>_.defaults(...)</code>):
      </p>

      <Markdown text={`
      lore.actions.tweet.create(data);
      `}/>

      <p>
        But because we're currently using a mock API through <code>json-server</code> some fields that would normally
        be created by the API (like <code>userId</code> and <code>createdAt</code>) won't exist on the data, and this
        can break our application code. So for now, we're simply going to create those server-generated properties
        on the client-side when we create the data.
      </p>
      <p>
        Later in the Quickstart, we'll switch to a real API and will be able to delete this modification.
      </p>


      <h3>
        Visual Check-in
      </h3>

      <p>
        If everything went well, your application should now look like this.
      </p>

      {/*<img className="drop-shadow" src="/assets/images/quickstart/dialogs/step-3.png" />*/}

      <h2>
        Code Changes
      </h2>

      <p>
        Below is a list of files modified during this step.
      </p>

      <h3>
        index.js
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
        Next we're going <Link to="../step-4/">finish adding the create dialog</Link>.
      </p>
    </Template>
  )
};
