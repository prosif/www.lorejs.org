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
          <h1>lore-hook-websockets</h1>
          <p>
            ???
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/hooks/lore-hook-websockets/" />
            <NavLink title="Dependencies" url="/hooks/lore-hook-websockets/dependencies/" />
            <NavLink title="Installation" url="/hooks/lore-hook-websockets/installation/" />
            <NavLink title="Code" url="/hooks/lore-hook-websockets/code/" />

            <li className="doc-section">???</li>
            <NavLinkPlaceholder title="???" />
            {/*<NavLink title="create" url="/hooks/lore-hook-actions/blueprints/create/" />*/}
          </ul>
          {children}
        </div>
      </div>
    </div>
  );
};
