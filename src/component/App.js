import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import FeaturedMix from './FeaturedMix';
import Header from './Header';
import Home from './Home';
import Archive from './Archive';
import About from './About';
import Show from './Show';
import Player from './Player';

import mixesData from '../data/mixes';
import actions from '../store/actions';

class App extends Component {
  fetchMixes = async () => {
    const {addMix} = this.props;
    // loop over mix ids to fetch each one
    mixesData.map(async id => {
      try {
        const response = await fetch(`https://api.mixcloud.com${id}`);
        const data = await response.json();
        addMix(data);
      } catch (error) {}
    });
  };

  componentDidMount() {
    this.fetchMixes();
  }

  render() {
    //makes variable from frist mix in array
    // given fallback default value {}
    // const [firstMix = {}] = this.props.mixes;

    return (
      // wrap whole page in router
      <Router>
        <div>
          <div className="flex-l justify-end">
            {/* featuredMix component */}
            <FeaturedMix />
            <div className="w-50-l relative z-1">
              {/* header */}
              <Header />
              {/* routed page */}
              {/* pass our state and action down into home component */}
              <Route exact path="/" component={Home} />
              <Route path="/archive" component={Archive} />
              <Route path="/about" component={About} />
              <Route
                path="/show/:slug"
                // pass in route params to access url on showpage
                component={Show}
              />
            </div>
          </div>
          {/* audio player */}
          <Player />
        </div>
      </Router>
    );
  }
}

export default connect(
  state => state,
  actions
)(App);
