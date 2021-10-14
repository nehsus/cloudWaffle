import React from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../../layout/PageLayout';
/**
 * Main Home Screen
 * 
 * @author Sushen Kumar "su@sushen.dev"
 * @param {*} { location: { pathname } } route path
 * @return {*} Layout with Home Page
 */
const Home = ({ location: { pathname } }) => {
  if (pathname !== '/') {
    return null;
  }
  return (
    <PageLayout title="Home">
      <h3>CloudFlare General Assignment</h3>

      <p>Please use the sidebar to add and view specific posts hosted by CloudFlare workers.
        Reach out to me at su@sushen.dev for more information :)
      </p>

      <ps>PS: please hire me</ps>
    </PageLayout>
  );
};

Home.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Home;
