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
          <h1>CLI</h1>
          <p>
            Documentation for the Command Line Interface
          </p>
        </div>
      </div>
      <div className="container">
        <div className="docs-content">
          <ul id="markdown-toc">
            <NavLink title="Introduction" url="/cli/" />

            <li className="doc-section">Top Level</li>
            <NavLink title="new" url="/cli/new/" />

            <li className="doc-section">Extractors</li>
            <NavLink title="extract action" url="/cli/extract/action/" />
            <NavLink title="extract reducer" url="/cli/extract/reducer/" />

            <li className="doc-section">Generators</li>
            <NavLink title="generate action" url="/cli/generate/action/" />
            <NavLink title="generate model" url="/cli/generate/model/" />
            <NavLink title="generate collection" url="/cli/generate/collection/" />
            <NavLink title="generate component" url="/cli/generate/component/" />
            <NavLink title="generate reducer" url="/cli/generate/reducer/" />

            <li className="doc-section">Tasks</li>
            <NavLink title="generate surge" url="/cli/generate/surge/" />
            <NavLink title="generate github" url="/cli/generate/github/" />

            <li className="doc-section">Misc</li>
            <NavLink title="Extending the CLI" url="/cli/misc/extending-the-cli/" />
          </ul>
          {children}
        </div>
      </div>
    </div>
  )
};
