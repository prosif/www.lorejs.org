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
            <NavLink layout="audience" title="Audience" url="/audience/" location={location} />
            <NavLink layout="quickstart" title="Quickstart" url="/quickstart/" location={location} />
            <NavLink layout="features" title="Features" url="/features/" location={location} />
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                Documentation<span className="caret" />
              </a>
              <ul className="dropdown-menu">
                <NavLink title="React" url="/react/" location={location} />
                <NavLink title="React Router" url="/react-router/" location={location} />
                <NavLink title="Redux" url="/redux/" location={location} />
                <NavLink title="Webpack" url="/webpack/" location={location} />
                {/*<NavLink title="Core Libraries" url="/libraries/" location={location} />*/}
                <li role="separator" className="divider"></li>
                <NavLink title="Anatomy" url="/anatomy/" location={location} />
                <li role="separator" className="divider"></li>
                <NavLink title="Actions" url="/actions/" location={location} />
                <NavLink title="Connect" url="/connect/" location={location} />
                <NavLink title="Reducers" url="/reducers/" location={location} />
                <li role="separator" className="divider"></li>
                <NavLink title="Models" url="/models/" location={location} />
                <NavLink title="Collections" url="/collections/" location={location} />
                <li role="separator" className="divider"></li>
                <NavLink title="Concepts" url="/concepts/" location={location} />
                <NavLink title="Hooks" url="/hooks/" location={location} />
                <NavLink title="Publishing" url="/publishing/" location={location} />
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
                Forms (new)<span className="caret" />
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
