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
        Step 4: Customized Dialog Hook
      </h1>

      <p>
        In this step we're going to intro a version of <code>lore-hook-dialog</code> that is tailored for mounting,
        showing, and dismissing Bootstrap dialogs.
      </p>

      <QuickstartBranch branch="dialogs.3" />

      <h3>
        Add Bootstrap-specific Hook for Dialog Mounting
      </h3>
      <p>
        The dialog we just created is responsible for showing and dismissing itself. But in a real application, you
        may have dozens of dialogs for creating, updating and deleting content. And if your application uses a
        UI library like Bootstrap, each of those dialogs will likely have the <strong>exact same code for
        doing so</strong>.
      </p>
      <p>
        So in this step, we're just going to embrace that, and we're going to introduce a version
        of <code>lore-hook-dialog</code> that has been customized to understand how to show and dismiss
        Bootstrap dialogs. This package is called <code>lore-hook-dialog-bootstrap</code>.
      </p>

      <p>
        Run the following command to install the package:
      </p>

      <Markdown type="sh" text={`
      npm install lore-hook-dialog-bootstrap --save
      `}/>

      <p>
        Next open up <code>index.js</code> and replace the
        import <code>lore-hook-dialog</code> with <code>lore-hook-dialog-bootstrap</code> like this:
      </p>

      <Markdown text={`
      ...
      import dialog from 'lore-hook-dialog-bootstrap';
      ...

      lore.summon({
        hooks: {
          ...
          dialog,
          ...
        }
      });
      `}/>

      <h3>
        Update
      </h3>
      <p>
        With that change, the application will still work, but you'll notice that when you launch the dialog,
        it now has a super dark background. And this is because we're now creating <strong>two</strong> backdrops.
        This is because the call to <code>lore.dialog.show</code> is now (essentially) automatically wrapping
        our dialog with this code:
      </p>

      <Markdown text={`
      import React from 'react';
      import createReactClass from 'create-react-class';
      import PropTypes from 'prop-types';
      import _ from 'lodash';

      export default createReactClass({
        displayName: 'BootstrapDialog',

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

        render: function() {
          const { data } = this.state;

          return (
            <div ref="modal" className="modal fade">
              {/* ...your dialog renders here... */}
            </div>
          );
        }

      });
      `}/>

      <p>
        Because of that, we no longer need to include that code in our custom dialog. So let's remove it. Update
        your dialog to look like this:
      </p>

      <Markdown text={`
      import React from 'react';
      import createReactClass from 'create-react-class';
      import PropTypes from 'prop-types';
      import _ from 'lodash';

      export default createReactClass({
        displayName: 'CreateTweetDialog',

        propTypes: {
          onCancel: PropTypes.func
        },

        getInitialState: function() {
          return {
            data: {
              text: ''
            }
          };
        },

        onSubmit: function() {
          const { data } = this.state;
          lore.actions.tweet.create({
            userId: 1,
            text: data.text
          });
          this.dismiss();
        },

        dismiss: function() {
          this.props.onCancel();
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
          );
        }

      });
      `}/>

      <p>
        With that change in place, if you launch your dialog again, it will look and behave like we expect, and
        will have only a single backdrop.
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
        import lore from 'lore';
        import _ from 'lodash';

        // Allows you to access your lore app globally as well as from within
        // the console. Remove this line if you don't want to be able to do that.
        window.lore = lore;

        // Hooks
        import auth from 'lore-hook-auth';
        import actions from 'lore-hook-actions';
        import bindActions from 'lore-hook-bind-actions';
        import collections from 'lore-hook-collections';
        import connections from 'lore-hook-connections';
        import connect from 'lore-hook-connect';
        import dialog from 'lore-hook-dialog-bootstrap';
        import models from 'lore-hook-models';
        import react from 'lore-hook-react';
        import reducers from 'lore-hook-reducers';
        import redux from 'lore-hook-redux';
        import router from 'lore-hook-router';

        // Summon the app!
        lore.summon({
          hooks: {
            auth,
            actions,
            bindActions,
            collections,
            connections,
            connect,
            dialog,
            models,
            react,
            reducers,
            redux: _.extend(redux, {
              dependencies: ['reducers', 'auth']
            }),
            router
          }
        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import lore from 'lore';
        import _ from 'lodash';

        // Allows you to access your lore app globally as well as from within
        // the console. Remove this line if you don't want to be able to do that.
        window.lore = lore;

        // Hooks
        import auth from 'lore-hook-auth';
        import actions from 'lore-hook-actions';
        import bindActions from 'lore-hook-bind-actions';
        import collections from 'lore-hook-collections';
        import connections from 'lore-hook-connections';
        import connect from 'lore-hook-connect';
        import dialog from 'lore-hook-dialog-bootstrap';
        import models from 'lore-hook-models';
        import react from 'lore-hook-react';
        import reducers from 'lore-hook-reducers';
        import redux from 'lore-hook-redux';
        import router from 'lore-hook-router';

        // Summon the app!
        lore.summon({
          hooks: {
            auth,
            actions,
            bindActions,
            collections,
            connections,
            connect,
            dialog,
            models,
            react,
            reducers,
            redux: _.extend(redux, {
              dependencies: ['reducers', 'auth']
            }),
            router
          }
        });
        `}/>
        <CodeTab syntax="ESNext" text={`
        import lore from 'lore';
        import _ from 'lodash';

        // Allows you to access your lore app globally as well as from within
        // the console. Remove this line if you don't want to be able to do that.
        window.lore = lore;

        // Hooks
        import auth from 'lore-hook-auth';
        import actions from 'lore-hook-actions';
        import bindActions from 'lore-hook-bind-actions';
        import collections from 'lore-hook-collections';
        import connections from 'lore-hook-connections';
        import connect from 'lore-hook-connect';
        import dialog from 'lore-hook-dialog-bootstrap';
        import models from 'lore-hook-models';
        import react from 'lore-hook-react';
        import reducers from 'lore-hook-reducers';
        import redux from 'lore-hook-redux';
        import router from 'lore-hook-router';

        // Summon the app!
        lore.summon({
          hooks: {
            auth,
            actions,
            bindActions,
            collections,
            connections,
            connect,
            dialog,
            models,
            react,
            reducers,
            redux: _.extend(redux, {
              dependencies: ['reducers', 'auth']
            }),
            router
          }
        });
        `}/>
      </CodeTabs>

      <h3>
        src/components/CreateTweetDialog.js
      </h3>

      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import _ from 'lodash';

        export default createReactClass({
          displayName: 'CreateTweetDialog',

          propTypes: {
            onCancel: PropTypes.func
          },

          getInitialState: function() {
            return {
              data: {
                text: ''
              }
            };
          },

          onSubmit: function() {
            const { data } = this.state;
            lore.actions.tweet.create({
              userId: 1,
              text: data.text
            });
            this.dismiss();
          },

          dismiss: function() {
            this.props.onCancel();
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
            );
          }

        });
        `}/>
        <CodeTab syntax="ES6" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import _ from 'lodash';

        export default class CreateTweetDialog extends React.Component {

          propTypes: {
            onCancel: PropTypes.func
          },

          constructor() {
            super();
            this.state = {
              data: {
                text: ''
              }
            }
          }

          onSubmit() {
            const { data } = this.state;
            lore.actions.tweet.create({
              userId: 1,
              text: data.text
            });
            this.dismiss();
          }

          dismiss() {
            this.props.onCancel();
          }

          onChange(name, value) {
            const nextData = _.merge({}, this.state.data);
            nextData[name] = value;
            this.setState({
              data: nextData
            });
          }

          render() {
            const { data } = this.state;

            return (
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
            );
          }

        };
        `}/>
        <CodeTab syntax="ESNext" text={`
        import React from 'react';
        import createReactClass from 'create-react-class';
        import PropTypes from 'prop-types';
        import _ from 'lodash';

        export default class CreateTweetDialog extends React.Component {

          static propTypes = {
            onCancel: PropTypes.func
          };

          constructor() {
            super();
            this.state = {
              data: {
                text: ''
              }
            }
          }

          onSubmit() {
            const { data } = this.state;
            lore.actions.tweet.create({
              userId: 1,
              text: data.text
            });
            this.dismiss();
          }

          dismiss() {
            this.props.onCancel();
          }

          onChange(name, value) {
            const nextData = _.merge({}, this.state.data);
            nextData[name] = value;
            this.setState({
              data: nextData
            });
          }

          render() {
            const { data } = this.state;

            return (
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
            );
          }

        };
        `}/>
      </CodeTabs>

      <h2>
        Next Steps
      </h2>

      <p>
        Next we're going <Link to="../step-5/">finish adding the create dialog</Link>.
      </p>
    </Template>
  )
};
