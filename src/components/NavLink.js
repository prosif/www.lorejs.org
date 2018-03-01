import React from 'react';
import { withRouter } from 'react-router';
import Link from 'gatsby-link';

class NavLink extends React.Component {
  render() {
    const {
      title,
      url,
      location: {
        pathname
      }
    } = this.props;

    return (
      <li className={pathname === url ? 'active' : ''}>
        <Link to={url}>
          {title}
        </Link>
      </li>
    );
  }
}

export default withRouter(NavLink);
