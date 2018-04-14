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
          <h1>Webpack</h1>
          <p>
            The build system for Lore
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/webpack/" />

            <li className="doc-section">Development</li>
            <NavLinkPlaceholder title="Changing the Port" />
            <NavLinkPlaceholder title="Configuring SSL" />

            <li className="doc-section">Building</li>
            <NavLink title="Development" url="/webpack/building/development/" />
            <NavLink title="Production" url="/webpack/building/production/" />

            <li className="doc-section">Analyzing</li>
            <NavLink title="Stats" url="/webpack/analyzing/stats/" />

            <li className="doc-section">Features</li>
            <NavLink title="Favicon" url="/webpack/features/favicon/" />
            <NavLinkPlaceholder title="Preprocessors" />
            <NavLinkPlaceholder title="Fonts" />
            <NavLinkPlaceholder title="Images" />
            <NavLinkPlaceholder title="CSS Prefixing" />
            <NavLinkPlaceholder title="Chunking" />
            <NavLinkPlaceholder title="Cache Busting" />

            <li className="doc-section">Misc</li>
            <NavLink title="Testing Production Build Locally" url="/webpack/misc/serve/" />
          </ul>
          {children}
        </div>
      </div>
    </div>
  )
};
