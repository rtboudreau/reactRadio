import React, {Component} from 'react';

const Stat = ({statName, statNumber, statWord}) => (
  <div className="w-third tc pa3 ba bw2 b--light-gray" style={{marginRight: -2}}>
    <div className="f6 biryani ttu">{statName}</div>
    <div className="f5 biryani-black ttu tracked">
      {statNumber} {statWord}
    </div>
  </div>
);

const About = ({mixes, ...props}) => (
  <div className="ph3 ph4-l">
    <div className="measure center lh-copy f4 ph3">
      <p className="mt0">
        Marmalade.fm features the latest and greatest in grooves, beats, and world music
      </p>
      <p>
        Whether you're into hip hop, trip hop, classic jazz, fusion jazz, afro beat or break beat...
        we've got you covered!
      </p>
    </div>

    <div className="flex pt3">
      <Stat statName="Featuring..." statNumber={mixes.length} statWord="mixes" />
      <Stat
        statName="Played"
        statNumber={mixes.reduce((accum, current) => accum + current.play_count, 0)}
        statWord="times"
      />
      <Stat
        statName="With"
        statNumber={mixes.reduce((accum, current) => accum + current.audio_length, 0) / 60}
        statWord="minutes"
      />
    </div>
  </div>
);

export default About;
