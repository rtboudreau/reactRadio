import React from 'react';

//wraps around anything that when clicked will
//start playing a mix.  gives functionality
//rather than design
const PlayMix = ({playMix, id, currentMix, playing, children}) => (
  // add classname of 'playing' when id = current mix to
  // change from play to pause background
  <div
    className={`pointer ${id === currentMix && playing && 'playing'}`}
    onClick={() => playMix(id)}
  >
    {children}
  </div>
);
export default PlayMix;
