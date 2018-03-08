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
          <h1>Publishing</h1>
          <p>
            Documentation for building and deploying Lore.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/publishing/" />

            <li className="doc-section">Building</li>
            <NavLink title="Overview" url="/publishing/building/" />
            <NavLinkPlaceholder title="Building for Development (todo)" />
            <NavLinkPlaceholder title="Building for Production (todo)" />
            <NavLinkPlaceholder title="Building for Custom Environments (todo)" />

            <li className="doc-section">Publishing</li>
            <NavLink title="Overview" url="/publishing/providers/" />
            <NavLink title="Publishing to Surge" url="/publishing/providers/surge/" />
            <NavLink title="Publishing to GitHub Pages" url="/publishing/providers/github-pages/" />
          </ul>
          {children}
        </div>
      </div>
    </div>
  )
};
