import React from 'react';
import NavLink from '../../NavLink';
import NavLinkPlaceholder from '../../NavLinkPlaceholder';
import '../../../assets/less/docs.less';

export default (props) => {
  const { children } = props;

  return (
    <div>
      <div className="docs-header" id="content">
        <div className="container">
          <h1>Forms: Material UI</h1>
          <p>
            Documentation for the Material UI implementation of Forms
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/forms/material-ui/" />

            <li className="doc-section">Libraries</li>
            <NavLink title="lore-react-forms-material-ui" url="/forms/material-ui/lore-react-forms-material-ui/" />
            <NavLink title="lore-hook-dialog-material-ui" url="/forms/material-ui/lore-hook-dialog-material-ui/" />
            <NavLink title="lore-hook-forms-material-ui" url="/forms/material-ui/lore-hook-forms-material-ui/" />
            <NavLink title="lore-hook-dialogs-material-ui" url="/forms/material-ui/lore-hook-dialogs-material-ui/" />

            <li className="doc-section">lore-react-forms-material-ui</li>
            <NavLink title="fields" url="/" />

            <li className="doc-section">lore-hook-forms-material-ui</li>
            <NavLink title="create - optimistic" url="/" />
            <NavLink title="create - overlay" url="/" />
            <NavLink title="create - wizard" url="/" />
            <NavLink title="update - optimistic" url="/" />
            <NavLink title="update - overlay" url="/" />
            <NavLink title="update - wizard" url="/" />
            <NavLink title="destroy - optimistic" url="/" />
            <NavLink title="destroy - overlay" url="/" />
            <NavLink title="destroy - wizard" url="/" />

            <li className="doc-section">lore-hook-dialogs-material-ui</li>
            <NavLink title="create - optimistic" url="/" />
            <NavLink title="create - overlay" url="/" />
            <NavLink title="create - wizard" url="/" />
            <NavLink title="update - optimistic" url="/" />
            <NavLink title="update - overlay" url="/" />
            <NavLink title="update - wizard" url="/" />
            <NavLink title="destroy - optimistic" url="/" />
            <NavLink title="destroy - overlay" url="/" />
            <NavLink title="destroy - wizard" url="/" />
          </ul>
          {children}
        </div>
      </div>
    </div>
  )
};
