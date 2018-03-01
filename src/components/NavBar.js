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
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                Documentation<span className="caret" />
              </a>
              <ul className="dropdown-menu">
                <NavLink title="Concepts" url="/concepts/" location={location} />
                <NavLink title="Anatomy" url="/anatomy/" location={location} />
                <NavLink title="Features" url="/features/" location={location} />
                <NavLink title="Hooks" url="/hooks/" location={location} />
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
            <li>
              <a href="https://github.com/lore/lore">GitHub</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};