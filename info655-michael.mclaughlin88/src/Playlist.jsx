import { React, useState } from 'react';
import Song from './Song.jsx'
import Podcast from './Podcast.jsx'

export default function Playlist({ currentIndex, listItems, onPlayAudioRequested }) {
  return (
    <ol>
     {listItems.map((value, index) => (
       // TODO(MPM): This is wonky. It would be much better to add a field to the JSON for the type of data.
       //            Also, the ternary operator only works for two options but it's better than an ugly list
       //            of lambda functions.
       'podcast' in value || 'episode' in value || 'episodeTitle' in value
        ? (<li onDoubleClick={() => onPlayAudioRequested(index)} key={index}>
            <Podcast
              season={value.season}
              episode={value.episode}
              episodeTitle={value.episodeTitle}
              year={value.year}
              isSelected={index == currentIndex ? true : false}>
                Podcast
            </Podcast>
            </li>)
         : (<li onDoubleClick={() => onPlayAudioRequested(index)} key={index}>
            <Song
              title={value.title}
              artist={value.artist}
              year={value.year}
              genre={value.genre}
              isSelected={index == currentIndex ? true : false}>
            </Song>
            </li>)
     ))}
    </ol>
  );
}