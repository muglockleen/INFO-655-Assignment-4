import useState from 'react';
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
       // TODO(MPM): This causes an error that I'm not sure how to fix so no double click play for now.
       // ? (<li onDoubleClick={onPlayAudioRequested(index)} key={index}>
        ? (<li key={index}>
            <Podcast
              season={value.season}
              episode={value.episode}
              episodeTitle={value.episodeTitle}
              year={value.year}
              isSelected={index == currentIndex ? true : false}>
                Podcast
            </Podcast>
            </li>)
         : (<li key={index}>
            <Song
              title={value.title}
              artist={value.artist}
              year={value.year}
              isSelected={index == currentIndex ? true : false}>
            </Song>
            </li>)
     ))}
    </ol>
  );
}