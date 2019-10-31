/*global Mixcloud*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../store/actions';

class Player extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.widgetReady) {
      return;
    }
    // if there is a new mix in the props...
    if (nextProps.currentMix !== this.props.currentMix) {
      //...load new mix by name and start playing
      this.widget.load(nextProps.currentMix, true);
    } else if (!nextProps.fromMixcloud) {
      this.widget.togglePlay();
    }
  }

  mountAudio = async () => {
    const {playMix, setWidgetReady} = this.props;
    this.widget = Mixcloud.PlayerWidget(this.player);
    await this.widget.ready;

    setWidgetReady(true);

    this.widget.events.pause.on(() =>
      playMix({
        playing: false,
        fromMixcloud: true
      })
    );
    this.widget.events.play.on(() =>
      playMix({
        playing: true,
        fromMixcloud: true
      })
    );
  };

  componentDidMount() {
    // when app component is loaded this gets called and we can be sure
    // that everything is ready so we can run out mountAudio method
    this.mountAudio();
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
    }
  };
  render() {
    return (
      <iframe
        title="audioPlayer"
        width="100%"
        height="60"
        src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FNTSRadio%2Ffloating-points-jamie-xx-18th-august-2016%2F"
        frameBorder="0"
        className="db fixed bottom-0 z-5"
        ref={player => (this.player = player)}
      />
    );
  }
}
export default connect(
  state => state,
  actions
)(Player);
