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
          <h1>Concepts</h1>
          <p>
            Things you'll probably want to understand <em>eventually</em> to use Lore
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/concepts/" />

            <li className="doc-section">Core Libraries</li>
            <NavLink title="React" url="/concepts/libraries/react/" />
            <NavLink title="Webpack" url="/concepts/libraries/webpack/" />
            <NavLink title="Redux" url="/concepts/libraries/redux/" />
            <NavLink title="React-Router" url="/concepts/libraries/react-router/" />
            <NavLinkPlaceholder title="Axios (todo)" />
            <NavLink title="Gulp" url="/concepts/libraries/gulp/" />

            <li className="doc-section">Concepts</li>
            <NavLink title="Actions" url="/concepts/core/actions/" />
            <NavLink title="Reducers" url="/concepts/core/reducers/" />
            <NavLink title="Models" url="/concepts/core/models/" />
            <NavLink title="Collections" url="/concepts/core/collections/" />
            <NavLink title="Connect" url="/concepts/core/connect/" />
            <NavLink title="Routing" url="/concepts/core/routing/" />

            <li className="doc-section">Server Communication</li>
            <NavLink title="Server Communication" url="/concepts/foundation/server-communication/" />

            <li className="doc-section">Data Structure</li>
            <NavLink title="Overview" url="/concepts/data-structure/" />
            <NavLinkPlaceholder title="Models (todo)" />
            <NavLinkPlaceholder title="Collections (todo)" />

            <li className="doc-section">Building</li>
            <NavLink title="Overview" url="/concepts/build-system/" />
            <NavLinkPlaceholder title="Development (todo)" />
            <NavLinkPlaceholder title="Production (todo)" />

            <li className="doc-section">Publishing</li>
            <NavLink title="Overview" url="/concepts/publishing/" />
            <NavLink title="Surge" url="/concepts/publishing/surge/" />
            <NavLink title="GitHub Pages" url="/concepts/publishing/github-pages/" />
          </ul>
          {children}
        </div>
      </div>
    </div>
  )
};
