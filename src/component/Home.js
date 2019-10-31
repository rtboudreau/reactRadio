import React from 'react';
import {connect} from 'react-redux';
import Mix from './Mix';
import actions from '../store/actions';

const Home = ({mixes, ...props}) => (
  <div className="flex flex-wrap justify-between mixes ph3 ph4-1 mb5">
    {mixes.slice(0, 8).map(mix => (
      <div className="mix mb4">
        {/* pass through an id for the mix to play  */}
        <Mix {...props} {...mix} />
      </div>
    ))}
  </div>
);

export default connect(state => state)(Home);
