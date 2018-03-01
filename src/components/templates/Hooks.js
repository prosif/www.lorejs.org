import React from 'react';
import NavLink from '../NavLink';
import NavLinkPlaceholder from '../NavLinkPlaceholder';
import '../../assets/less/docs.less';

export default (props) => {
  const { children } = props;

  return (
    <div>
      <div className="docs-header" id="content">
        <div className="container">
          <h1>Hooks</h1>
          <p>
            Plugins that provide the functionality to Lore
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Breakdown" url="/hooks/" />

            <li className="doc-section">Hooks</li>
            <NavLink title="Introduction" url="/hooks/introduction/" />
            <NavLink title="lore-hook-actions" url="/hooks/lore-hook-actions/" />
            <NavLink title="lore-hook-auth" url="/hooks/lore-hook-auth/" />
            <NavLink title="lore-hook-bind-actions" url="/hooks/lore-hook-bind-actions/" />
            <NavLink title="lore-hook-collections" url="/hooks/lore-hook-collections/" />
            <NavLink title="lore-hook-connect" url="/hooks/lore-hook-connect/" />
            <NavLink title="lore-hook-connections" url="/hooks/lore-hook-connections/" />
            <NavLink title="lore-hook-dialog" url="/hooks/lore-hook-dialog/" />
            <NavLink title="lore-hook-dialogs-bootstrap" url="/hooks/lore-hook-dialogs-bootstrap/" />
            <NavLink title="lore-hook-dialogs-material-ui" url="/hooks/lore-hook-dialogs-material-ui/" />
            <NavLink title="lore-hook-models" url="/hooks/lore-hook-models/" />
            <NavLink title="lore-hook-polling" url="/hooks/lore-hook-polling/" />
            <NavLink title="lore-hook-react" url="/hooks/lore-hook-react/" />
            <NavLink title="lore-hook-reducers" url="/hooks/lore-hook-reducers/" />
            <NavLink title="lore-hook-redux" url="/hooks/lore-hook-redux/" />
            <NavLink title="lore-hook-router" url="/hooks/lore-hook-router/" />
            <NavLink title="lore-hook-websockets-actioncable" url="/hooks/lore-hook-websockets-actioncable/" />
            <NavLink title="lore-hook-websockets-sails" url="/hooks/lore-hook-websockets-sails/" />
            <NavLink title="lore-hook-websockets-socketio" url="/hooks/lore-hook-websockets-socketio/" />

            <li className="doc-section">Custom Hook Tutorial</li>
            <NavLink title="Overview" url="/hooks/tutorial/overview/" />
            <NavLink title="1. Clone Starter Project" url="/hooks/tutorial/step-1/" />
            <NavLink title="2. Generate Hook" url="/hooks/tutorial/step-2/" />
            <NavLink title="3. Specify Dependencies" url="/hooks/tutorial/step-3/" />
            <NavLink title="4. Make Configurable" url="/hooks/tutorial/step-4/" />
            <NavLink title="5. Add Implementation" url="/hooks/tutorial/step-5/" />
            <NavLink title="6. Integrate Hook" url="/hooks/tutorial/step-6/" />
            <NavLink title="7. Publishing" url="/hooks/tutorial/step-7/" />
          </ul>
          {children}
        </div>
      </div>
    </div>
  );
};
