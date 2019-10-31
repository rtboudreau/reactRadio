import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import actions from '../store/actions';

//wraps around anything that when clicked will
//start playing a mix.  gives functionality
//rather than design
const PlayMix = ({playMix, id, currentMix, playing, children, className, fromMixcloud}) => (
  // add classname of 'playing' when id = current mix to
  // change from play to pause background
  <div
    className={classNames({
      [className]: classNames,
      playing: id === currentMix && playing && fromMixcloud,
      loading: id === currentMix && !playing && !fromMixcloud
    })}
    onClick={() => playMix({currentMix: id, fromMixcloud: false})}
  >
    {children}
  </div>
);
export default connect(
  state => state,
  actions
)(PlayMix);
