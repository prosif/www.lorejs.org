import React from 'react';
import Link from 'gatsby-link';
import Template from '../../components/templates/Hooks';
import Markdown from '../../components/Markdown';
import CodeTabs from '../../components/CodeTabs';
import CodeTab from '../../components/CodeTab';
import QuickstartBranch from '../../components/QuickstartBranch';

export default (props) => {
  return (
    <Template>
      <h1>
        lore-hook-websockets-actioncable
      </h1>
      <p>
        Source code for this hook can be found on GitHub <Link to="https://github.com/lore/lore/tree/master/packages/lore-hook-websockets-actioncable">at this link</Link>.
      </p>

      <h2>
        Purpose
      </h2>
      <p>
        This hook is built on top of the <Link to="https://github.com/lore/lore/tree/master/packages/lore-websockets">lore-websockets</Link>
        library and implements the interface for ActionCable.
      </p>

      <h2>
        Example
      </h2>
      <p>
        See the <Link to="https://github.com/lore/lore/tree/master/examples/websockets">websockets example</Link> to see this hook in action.
      </p>

      <h2>
        Example Usage
      </h2>
      <p>
        The ActionCable hook behaves identical to the SocketIO hook, except for the implementation. The big callout here is the
        interface that ActionCable uses, which is a bit different than the other two implementations.
      </p>

      <p>
        Instead of using <code>namespaces</code>, ActionCable uses <code>channels</code>. I <em>think</em> they're equivalent, but not sure. Meaning
        Socket.io breaks data up into namespaces & rooms, but ActionCable seems to only use one of those (?). I played with
        it only enough to get this to work and see if the interface could adapt to something not based in Node : )
      </p>

      <Markdown text={`
      var _ = require('lodash');
      var WebSocketConnection = require('lore-websockets').WebSocketConnection;
      var ActionCable = require('actioncable');

      module.exports = WebSocketConnection.extend({

        // serverUrl: 'http://localhost:1337/cable',
        // channel: 'PostsChannel',

        connect: function () {
          this.cable = ActionCable.createConsumer(this.serverUrl);
        },

        subscribe: function subscribe() {
          var that = this;

          this.cable.subscriptions.create(this.channel, {
            connected: function () {
              console.log('ActionCable:WebSocket - connected!')
            },

            disconnected: function () {
              console.log('ActionCable:WebSocket - disconnected!')
            },

            received: function (data) {
              that.dispatch(data);
            }
          });
        }
      });
      `}/>
    </Template>
  )
};
