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
            Key features that make up the main value proposition for Lore
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/features/" />

            <li className="doc-section">Core Libraries</li>
            <NavLink title="React" url="/libraries/react/" />
            <NavLink title="Webpack" url="/libraries/webpack/" />
            <NavLink title="Redux" url="/libraries/redux/" />
            <NavLink title="React-Router" url="/libraries/react-router/" />
            <NavLinkPlaceholder title="Axios (todo)" />

            <li className="doc-section">Data Structure</li>
            <NavLink title="Models" url="/features/data-structure/" />
            <NavLink title="Collections" url="/features/data-structure/" />

            <li className="doc-section">UI Patterns</li>
            <NavLink title="Filtering" url="/features/filtering/" />
            <NavLink title="Pagination" url="/features/pagination/" />
            <NavLink title="Infinite Scrolling" url="/features/infinite-scrolling/" />
            <NavLink title="WebSockets" url="/features/websockets/" />
            <NavLink title="Visual Cues" url="/features/visual-cues/" />
            <NavLink title="Optimistic Updates" url="/features/optimistic-updates/" />
            <NavLink title="Dialogs" url="/features/dialogs/" />
            <NavLink title="Wizards" url="/features/wizards/" />
            <NavLink title="Error Handling" url="/features/error-handling/" />
            <NavLink title="404 Pages" url="/features/404-pages/" />
          </ul>
          {children}
        </div>
      </div>
    </div>
  )
};
