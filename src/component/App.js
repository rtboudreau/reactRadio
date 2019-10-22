/*global Mixcloud*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import FeaturedMix from './FeaturedMix';
import Header from './Header';
import Home from './Home';
import Archive from './Archive';
import About from './About';

//import mix data
import mixesData from '../data/mixes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      currentMix: '',
      // will equal to the data file of mixes
      mixIds: mixesData,
      mix: null,
      mixes: []
    };
  }

  fetchMixes = async () => {
    const {mixIds} = this.state;
    console.log(mixIds);
    // loop over mix ids to fetch each one
    mixIds.map(async id => {
      try {
        const response = await fetch(`https://api.mixcloud.com${id}`);
        const data = await response.json();
        this.setState((prevState, props) => ({
          //add our data to end of prev state usign spread operator
          mixes: [...prevState.mixes, data]
        }));
      } catch (error) {}
    });
  };

  mountAudio = async () => {
    this.widget = Mixcloud.PlayerWidget(this.player);
    await this.widget.ready;

    this.widget.events.pause.on(() =>
      this.setState({
        playing: false
      })
    );
    this.widget.events.play.on(() =>
      this.setState({
        playing: true
      })
    );
  };

  componentDidMount() {
    // when app component is loaded this gets called and we can be sure
    // that everything is ready so we can run out mountAudio method
    this.mountAudio();
    this.fetchMixes();
  }

  actions = {
    togglePlay: () => {
      this.widget.togglePlay();
    },

    playMix: mixName => {
      //if mixname === current track, then pause track
      const {currentMix} = this.state;
      if (mixName === currentMix) {
        return this.widget.togglePlay();
      }
      this.setState({
        currentMix: mixName
      });
      //load new mix by name and start playing
      this.widget.load(mixName, true);
    }
  };

  render() {
    //makes variable from frist mix in array
    // given fallback default value {}
    const [firstMix = {}] = this.state.mixes;

    return (
      // wrap whole page in router
      <Router>
        <div>
          <div className="flex-l justify-end">
            {/* featuredMix component */}
            <FeaturedMix {...this.state} {...this.actions} {...firstMix} id={firstMix.key} />
            <div className="w-50-l relative z-1">
              {/* header */}
              <Header />

              {/* routed page */}
              {/* pass our state and action down into home component */}
              <Route exact path="/" render={() => <Home {...this.state} {...this.actions} />} />
              <Route path="/archive" render={() => <Archive {...this.state} {...this.actions} />} />
              <Route path="/about" render={() => <About {...this.state} />} />
            </div>
          </div>
          {/* audio player */}
          <iframe
            title="audioPlayer"
            width="100%"
            height="60"
            src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FNTSRadio%2Ffloating-points-jamie-xx-18th-august-2016%2F"
            frameBorder="0"
            className="db fixed bottom-0 z-5"
            ref={player => (this.player = player)}
          />
        </div>
      </Router>
    );
  }
}

export default App;
