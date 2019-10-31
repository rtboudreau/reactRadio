import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PlayMix from './PlayMix';
import PlayButton from './PlayButton';

const FeaturedMix = ({name, pictures = {}, title, picture_primary_color, id, slug, ...props}) => (
  <div
    className="w-50-l vh-100 flex items-center justify-center cover bg-center pad-bottom fixed-l left-0 mix-overlay"
    style={{
      backgroundImage: `url(${pictures.extra_large})`,
      backgroundColor: `#${picture_primary_color}`
    }}
  >
    <div className="w-100 tc pa3 relative z-2">
      <p className="b biryani f6 white ttu">{title}</p>
      <h1 className="mix-title mt0 mb3 anton white ttu">{name}</h1>

      <Link to={`/show/${slug}`} className="absolute absolute--fill z-3" />
      <PlayMix id={id} className="relative z-5 pointer">
        <PlayButton />
      </PlayMix>
    </div>
  </div>
);

// 1. if there a featured mix in redux show that
// 2. if there is a mix currently playing show that
// 3. if neither, show first mix
const getMix = state => {
  let featuredMix;

  if (state.featuredMix) {
    [featuredMix] = state.mixes.filter(mix => mix.id === state.featuredMix);
  } else {
    [featuredMix] = state.mixes.filter(mix => mix.id === state.currentMix);
  }

  const [firstMix = {}] = state.mixes;
  // return featured mix if it exists otherwise fallback
  return featuredMix || firstMix;
};

const getTitle = state => {
  if (state.featuredMix) {
    return 'Currently Viewing';
  } else if (state.currentMix && state.playing) {
    return 'Currently Playing';
  } else {
    return 'Featured Mix';
  }
};

export default connect(state => ({
  ...getMix(state),
  title: getTitle(state)
}))(FeaturedMix);
