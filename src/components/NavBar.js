import React from 'react';
import Link from 'gatsby-link';
import NavLink from './NavLink';
import logo from '../assets/images/logos/lore_logo_text.png';

export default (props) => {
  const {
    location
  } = props;

  return (
    <nav className="navbar navbar-transparent navbar-fixed-top navbar-padded app-navbar p-t-md">
      <div className="container">
        <div className="navbar-header">
          <button className="btn navbar-toggle collapsed navbar-toggle-text" data-target="#stage" data-toggle="stage" data-distance="-250">
            <span className="icon icon-menu stage-toggle-icon" />
            Menu
          </button>
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Lore" style={{ height: '150%', marginTop: '-8px' }} />
          </Link>
        </div>
        <div className="navbar-collapse collapse text-uppercase">
          <ul className="nav navbar-nav navbar-right nav-bordered">
            <NavLink layout="philosophy" title="Philosophy" url="/philosophy/" location={location} />
            <NavLink layout="quickstart" title="Quickstart" url="/quickstart/" location={location} />
            <NavLink layout="features" title="Features" url="/features/" location={location} />
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                Documentation<span className="caret" />
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-category">
                  Core Libraries
                </li>
                <NavLink title="React" url="/react/" location={location} />
                <NavLink title="React Router" url="/react-router/" location={location} />
                <NavLink title="Redux" url="/redux/" location={location} />
                <NavLink title="Webpack" url="/webpack/" location={location} />
                {/*<NavLink title="Core Libraries" url="/libraries/" location={location} />*/}
                <li role="separator" className="divider"></li>
                <li className="dropdown-category">
                  Project
                </li>
                <NavLink title="Anatomy" url="/anatomy/" location={location} />
                <NavLink title="Building" url="/building/" location={location} />
                <NavLink title="Publishing" url="/publishing/" location={location} />
                <li role="separator" className="divider"></li>
                <li className="dropdown-category">
                  Concepts
                </li>
                <NavLink title="Actions" url="/actions/" location={location} />
                <NavLink title="Connect" url="/connect/" location={location} />
                <NavLink title="Reducers" url="/reducers/" location={location} />
                <NavLink title="Hooks" url="/hooks/" location={location} />
                <li role="separator" className="divider"></li>
                <li className="dropdown-category">
                  lore-models
                </li>
                <NavLink title="Models" url="/models/" location={location} />
                <NavLink title="Collections" url="/collections/" location={location} />
                <NavLink title="sync" url="/sync/" location={location} />
                <li role="separator" className="divider"></li>
                <NavLink title="Concepts" url="/concepts/" location={location} />
                <li role="separator" className="divider"></li>
                <NavLink title="CLI" url="/cli/" location={location} />
                <li role="separator" className="divider"></li>
                <NavLink title="Recipes" url="/recipes/" location={location} />
                <NavLink title="Examples" url="/examples/" location={location} />
                <li role="separator" className="divider"></li>
                <NavLink title="Videos" url="/videos/" location={location} />
                <NavLink title="Architecture" url="/architecture/" location={location} />
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                Hooks<span className="caret" />
              </a>
              <ul className="dropdown-menu">
                <li className="dropdown-category">
                  Tutorial
                </li>
                <NavLink title="Creating Custom Hooks" url="/hooks/tutorial/" location={location} />
                <li role="separator" className="divider"></li>
                <li className="dropdown-category">
                  Core Hooks
                </li>
                <NavLink title="lore-hook-actions" url="/hooks/lore-hook-actions/" location={location} />
                <NavLink title="lore-hook-auth" url="/hooks/lore-hook-auth/" location={location} />
                <NavLink title="lore-hook-bind-actions" url="/hooks/lore-hook-bind-actions/" location={location} />
                <NavLink title="lore-hook-collections" url="/hooks/lore-hook-collections/" location={location} />
                <NavLink title="lore-hook-connect" url="/hooks/lore-hook-connect/" location={location} />
                <NavLink title="lore-hook-connections" url="/hooks/lore-hook-connections/" location={location} />
                <NavLink title="lore-hook-models" url="/hooks/lore-hook-models/" location={location} />
                <NavLink title="lore-hook-polling" url="/hooks/lore-hook-polling/" location={location} />
                <NavLink title="lore-hook-react" url="/hooks/lore-hook-react/" location={location} />
                <NavLink title="lore-hook-reducers" url="/hooks/lore-hook-reducers/" location={location} />
                <NavLink title="lore-hook-redux" url="/hooks/lore-hook-redux/" location={location} />
                <NavLink title="lore-hook-router" url="/hooks/lore-hook-router/" location={location} />
                <NavLink title="lore-hook-websockets" url="/hooks/lore-hook-websockets/" location={location} />
                <NavLink title="lore-hook-websockets-actioncable" url="/hooks/lore-hook-websockets-actioncable/" location={location} />
                <NavLink title="lore-hook-websockets-sails" url="/hooks/lore-hook-websockets-sails/" location={location} />
                <NavLink title="lore-hook-websockets-socketio" url="/hooks/lore-hook-websockets-socketio/" location={location} />
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                Forms<span className="caret" />
              </a>
              <ul className="dropdown-menu">
                <NavLink title="Concept" url="/forms/concept/" location={location} />
                <li role="separator" className="divider"></li>
                <NavLink title="Bootstrap v3" url="/forms/bootstrap/" location={location} />
                <NavLink title="Material UI" url="/forms/material-ui/" location={location} />
              </ul>
            </li>
            <li>
              <a href="https://github.com/lore/lore">GitHub</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
