import React from "react"
import Link from "gatsby-link"
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import '../assets/less/toolkit-startup.less';
import '../assets/less/main.less';
import '../assets/less/docs.less';

export default (props) => {
  const {
    children,
    location
  } = props;

  return (
    <div className="stage" id="stage">
      <NavBar location={location} />
      {children()}
      <Footer />
    </div>
  )
};
