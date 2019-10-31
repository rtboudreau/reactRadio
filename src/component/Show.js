import React, {Component} from 'react';
import {connect} from 'react-redux';
import differenceInDays from 'date-fns/differenceInDays';
import Stat from './Stat';

import actions from '../store/actions';

const Tag = ({name, url}) => (
  <div className="mr2 mb2 o-70">
    <a
      className="block f6 link blue b ba bw1 b--blue br2 pv1 ph2 lh-title"
      href={url}
      target="_blank"
    >
      {name}
    </a>
  </div>
);

const Tags = ({tags = []}) => (
  <div className="tags flex flex-wrap">
    {tags.map(tag => (
      <Tag {...tag} />
    ))}
  </div>
);

class Show extends Component {
  componentDidMount() {
    // when mounted need to set fetured mix
    // in redux state to be currently viewed mix
    const {setFeaturedMix, id} = this.props;

    setFeaturedMix(id);
  }

  componentWillUnmount() {
    const {setFeaturedMix} = this.props;

    setFeaturedMix(false);
  }

  render() {
    const {tags, description, play_count, created_time, audio_length} = this.props;
    return (
      <div className="ph3 ph4-1 pad-bottom">
        <div className="measure center lh-copy">
          <Tags tags={tags} />
          <p>{description}mix description</p>
          <Stat statName="Plays..." statNumber={play_count || 0} statWord="times" />
          <Stat statName="Uploaded..." statNumber={created_time} statWord="days ago" />
          <Stat statName="lasting for..." statNumber={audio_length / 60} statWord="minutes" />
        </div>
      </div>
    );
  }
}

//  selector - grabs piece of data from state
const getMix = (mixes, slug) => {
  const [mix = {}] = mixes.filter(mix => mix.slug === slug);
  return mix;
};

export default connect(
  (state, props) => ({
    ...getMix(state.mixes, props.match.params.slug)
  }),
  actions
)(Show);
