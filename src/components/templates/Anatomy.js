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
          <h1>Anatomy</h1>
          <p>
            The structure of a Lore application
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/features/" />

            <li className="doc-section">Config</li>
            <NavLink title="actions" url="/features/config/actions/" />
            <NavLink title="auth" url="/features/config/auth/" />
            <NavLink title="collections" url="/features/config/collections/" />
            <NavLink title="connect" url="/features/config/connect/" />
            <NavLink title="connections" url="/features/config/connections/" />
            <NavLink title="dialog" url="/features/config/dialog/" />
            <NavLink title="local" url="/features/config/local/" />
            <NavLink title="models" url="/features/config/models/" />
            <NavLink title="reducers" url="/features/config/reducers/" />
            <NavLink title="redux" url="/features/config/redux/" />
            <NavLink title="router" url="/features/config/router/" />
          </ul>
          {children}
        </div>
      </div>
    </div>
  )
};
