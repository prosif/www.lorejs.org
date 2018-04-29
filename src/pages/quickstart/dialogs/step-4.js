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
        Step 4: Simplify the Dialog
      </h1>

      <p>
        In this step we're going to introduce a version of <code>lore-hook-dialog</code> that is tailored for
        mounting, showing, and dismissing Bootstrap dialogs.
      </p>

      <QuickstartBranch branch="dialogs.4" />

      <h3>
        What's the problem?
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

      <h3>
        Add Bootstrap-specific Dialog Hook
      </h3>
      <p>
        Run this command to install the package:
      </p>

      <Markdown type="sh" text={`
      npm install lore-hook-dialog-bootstrap --save
      `}/>

      <p>
        Next open <code>index.js</code> and replace the <code>lore-hook-dialog</code> hook
        with <code>lore-hook-dialog-bootstrap</code> like this:
      </p>

      <Markdown text={`
      // index.js
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

      <p>
        With that change in place, the application will still work, but you'll notice that now when you launch the
        dialog, it now has a super dark backdrop that it didn't before.
      </p>

      <h3>
        Why does this happen?
      </h3>
      <p>
        This is happening because we're now creating <strong>two</strong> backdrops. Previously, our dialog needed to
        include code for showing and hiding itself, and it's this code (shown below) that also generates the
        backdrop:
      </p>

      <Markdown text={`
      // src/components/CreateTweetDialog.js
      import React from 'react';
      import createReactClass from 'create-react-class';
      import PropTypes from 'prop-types';
      import _ from 'lodash';

      export default createReactClass({
        displayName: 'BootstrapDialog',

        componentDidMount() {
          this.show();
        },

        show() {
          const modal = this.refs.modal;
          $(modal).modal('show');
        },

        dismiss() {
          const modal = this.refs.modal;
          $(modal).modal('hide');
        },

        render() {
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
        Since the new <code>lore.dialog.show()</code> method automatically wraps each dialog with this code for us,
        we can now remove this boilerplate from <em>our</em> dialog.
      </p>

      <h3>
        Remove Boilerplate from Dialog
      </h3>

      <p>
        Open the <code>CreateTweetDialog</code> and update it to look like this:
      </p>

      <Markdown text={`
      // src/components/CreateTweetDialog.js
      import React from 'react';
      import createReactClass from 'create-react-class';
      import PropTypes from 'prop-types';
      import _ from 'lodash';

      export default createReactClass({
        displayName: 'CreateTweetDialog',

        propTypes: {
          onCancel: PropTypes.func
        },

        getInitialState() {
          return {
            data: {
              text: ''
            }
          };
        },

        request(data) {
          lore.actions.tweet.create(data);
        },

        onSubmit() {
          const { data } = this.state;
          this.request(data);
          this.dismiss();
        },

        dismiss() {
          this.props.onCancel();
        },

        onChange(name, value) {
          const nextData = _.merge({}, this.state.data);
          nextData[name] = value;
          this.setState({
            data: nextData
          });
        },

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

      });
      `}/>

      <p>
        With that change in place, if you launch your dialog again, it will look and behave like we expect, and
        will once again have only a single backdrop.
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

          getInitialState() {
            return {
              data: {
                text: ''
              }
            };
          },

          request(data) {
            lore.actions.tweet.create(data);
          },

          onSubmit() {
            const { data } = this.state;
            this.request(data);
            this.dismiss();
          },

          dismiss() {
            this.props.onCancel();
          },

          onChange(name, value) {
            const nextData = _.merge({}, this.state.data);
            nextData[name] = value;
            this.setState({
              data: nextData
            });
          },

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

      <h3>
        package.json
      </h3>
      <CodeTabs>
        <CodeTab syntax="ES5" text={`
        {
          "name": "lore-quickstart",
          "private": true,
          "version": "0.0.0",
          "description": "A Lore application",
          "keywords": [],
          "scripts": {
            "build": "npm run build:development",
            "build:development": "npm run clean && webpack --env.webpack=production --env.lore=development",
            "build:production": "npm run clean && webpack --env.webpack=production --env.lore=production -p",
            "deploy": "npm run now:copy && now dist",
            "deploy:production": "npm run build:production && npm run deploy",
            "clean": "rimraf dist",
            "now:copy": "cp .now/package.json dist/package.json",
            "server": "json-server --watch db.json --port=1337",
            "start": "webpack-dev-server --hot --env.webpack=development --env.lore=development",
            "stats": "npm run stats:development",
            "stats:development": "webpack --json --env=development > stats.json",
            "stats:production": "webpack --json --env=production -p > stats.json",
            "test": "echo \\"Error: no test specified\\" && exit 1"
          },
          "dependencies": {
            "auth0-js": "^9.5.0",
            "create-react-class": "^15.6.2",
            "lodash": "^4.0.0",
            "lore": "~0.13.0-beta",
            "lore-auth": "~0.13.0-beta",
            "lore-hook-actions": "~0.13.0-beta",
            "lore-hook-auth": "~0.13.0-beta",
            "lore-hook-bind-actions": "~0.13.0-beta",
            "lore-hook-collections": "~0.13.0-beta",
            "lore-hook-connect": "~0.13.0-beta",
            "lore-hook-connections": "~0.13.0-beta",
            "lore-hook-dialog-bootstrap": "~0.13.0-beta",
            "lore-hook-models": "~0.13.0-beta",
            "lore-hook-react": "~0.13.0-beta",
            "lore-hook-reducers": "~0.13.0-beta",
            "lore-hook-redux": "~0.13.0-beta",
            "lore-hook-router": "~0.13.0-beta",
            "lore-utils": "~0.13.0-beta",
            "moment": "^2.22.1",
            "prop-types": "^15.6.0",
            "react": "^16.1.1",
            "react-dom": "^16.0.0",
            "react-redux": "^4.4.1",
            "react-router": "^3.0.0",
            "redux": "^3.0.2",
            "redux-batched-subscribe": "^0.1.6",
            "redux-thunk": "^2.0.1"
          },
          "devDependencies": {
            "babel-cli": "^6.4.5",
            "babel-core": "^6.2.1",
            "babel-loader": "^7.0.0",
            "babel-preset-es2015": "^6.5.0",
            "babel-preset-react": "^6.5.0",
            "copy-webpack-plugin": "^4.0.1",
            "css-loader": "^0.26.2",
            "extract-text-webpack-plugin": "^3.0.2",
            "favicons-webpack-plugin": "~0.0.7",
            "file-loader": "^0.10.1",
            "html-webpack-plugin": "^2.28.0",
            "json-loader": "^0.5.4",
            "json-server": "~0.12.1",
            "less": "2.5.1",
            "less-loader": "^2.2.0",
            "node-sass": "^4.1.1",
            "now": "^11.1.4",
            "postcss-loader": "^1.3.3",
            "progress-bar-webpack-plugin": "^1.9.3",
            "redux-devtools": "^3.4.1",
            "redux-devtools-dock-monitor": "^1.1.3",
            "redux-devtools-log-monitor": "^1.4.0",
            "rimraf": "^2.6.1",
            "sass-loader": "^6.0.3",
            "style-loader": "^0.13.2",
            "url-loader": "^0.5.8",
            "webpack": "^3.11.0",
            "webpack-config-utils": "^2.3.0",
            "webpack-dev-server": "^2.4.1",
            "webpack-manifest-plugin": "^1.1.0"
          }
        }
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
        Next we're going <Link to="../step-5/">finish adding the create dialog</Link>.
      </p>
    </Template>
  )
};
