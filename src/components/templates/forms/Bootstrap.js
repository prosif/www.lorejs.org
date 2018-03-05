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
          <h1>Forms: Bootstrap</h1>
          <p>
            Documentation for the Bootstrap implementation of Forms
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/forms/bootstrap/" />

            <li className="doc-section">Libraries</li>
            <NavLink title="lore-react-forms-bootstrap" url="/forms/bootstrap/lore-react-forms-bootstrap/" />
            <NavLink title="lore-hook-dialog-bootstrap" url="/forms/bootstrap/lore-hook-dialog-bootstrap/" />
            <NavLink title="lore-hook-forms-bootstrap" url="/forms/bootstrap/lore-hook-forms-bootstrap/" />
            <NavLink title="lore-hook-dialogs-bootstrap" url="/forms/bootstrap/lore-hook-dialogs-bootstrap/" />

            <li className="doc-section">lore-react-forms-bootstrap</li>
            <NavLink title="fields" url="/" />

            <li className="doc-section">lore-hook-forms-bootstrap</li>
            <NavLink title="create - optimistic" url="/" />
            <NavLink title="create - overlay" url="/" />
            <NavLink title="create - wizard" url="/" />
            <NavLink title="update - optimistic" url="/" />
            <NavLink title="update - overlay" url="/" />
            <NavLink title="update - wizard" url="/" />
            <NavLink title="destroy - optimistic" url="/" />
            <NavLink title="destroy - overlay" url="/" />
            <NavLink title="destroy - wizard" url="/" />

            <li className="doc-section">lore-hook-dialogs-bootstrap</li>
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
