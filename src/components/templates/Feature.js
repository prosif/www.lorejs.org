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
          <h1>Features</h1>
          <p>
            Documentation for the core functionality of Lore
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/features/" />

            <li className="doc-section">Core Features</li>
            <NavLink title="Filtering" url="/features/challenges/filtering/" />
            <NavLink title="Pagination" url="/features/challenges/pagination/" />
            <NavLink title="Infinite Scrolling" url="/features/challenges/infinite-scrolling/" />
            <NavLink title="WebSockets" url="/features/challenges/websockets/" />
            <NavLink title="Visual Cues" url="/features/challenges/visual-cues/" />
            <NavLink title="Optimistic Updates" url="/features/challenges/optimistic-updates/" />
            <NavLink title="Dialogs" url="/features/challenges/dialogs/" />
            <NavLink title="Wizards" url="/features/challenges/wizards/" />
            <NavLink title="Error Handling" url="/features/challenges/error-handling/" />
            <NavLink title="404 Pages" url="/features/challenges/404-pages/" />
          </ul>
          {children}
        </div>
      </div>
    </div>
  )
};
