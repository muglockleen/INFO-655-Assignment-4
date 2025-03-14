import './mpm-styles.css'
import React, { useReducer, useEffect } from 'react';
import Playlist from './Playlist.jsx'
import Controls from './Controls.jsx';
import Status from './Status.jsx';

function playStateReducer(state, action) {
  const isSong = (index, playList) => {
    if (index >= 0 && index < playList.length) {
      if (playList[index].title) {
        return true;
      }
    } else {
      return false;
    }
  };

  let newState = {...state};

  switch (action.type) {
    case 'setList':
      newState.origPlaylist = action.payload;
      newState.currentPlaylist = Array.from(newState.origPlaylist);
      break;
    case 'rewind':
      if (state.playState === 'Paused') {
        newState.playState = 'Playing';
      }
      if (state.currentIndex == 0) {
        newState.currentIndex = (state.currentPlaylist.length - 1);
      } else {
        newState.currentIndex = (state.currentIndex - 1);
      }
      break;
    case 'playPause':
      if (state.playState === 'Playing') {
        newState.playState = 'Paused';
      } else {
        newState.playState = 'Playing';
      }
      break;
    case 'play':
      newState.playState = 'Playing';
      newState.currentIndex = action.payload;
      break;
    case 'fastForward':
      if (state.playState === 'Paused') {
        newState.playState = 'Playing';
      }
      if (state.currentIndex == (state.currentPlaylist.length - 1)) {
        newState.currentIndex = 0;
      } else {
        newState.currentIndex = (state.currentIndex + 1);
      }
      break;
    case 'shuffle':
      // TODO(MPM): Shuffle does not work the first time the button is clicked.
      if (state.shuffle) {
        newState.shuffle = false;
        newState.currentPlaylist = Array.from(state.origPlaylist);
      } else {
        newState.shuffle = true;
        for (let iterIndex = state.currentPlaylist.length - 1; iterIndex > 0; --iterIndex) {
          const randIndex = Math.floor(Math.random() * (iterIndex + 1));
          [newState.currentPlaylist[iterIndex], newState.currentPlaylist[randIndex]] = [state.currentPlaylist[randIndex], state.currentPlaylist[iterIndex]];
        }
      }
      break;
    default:
      break;
  }

  // Now update the status
  if (newState.playState === 'Paused') {
    newState.currentStatus = 'Paused';
  } else {
    if (isSong(newState.currentIndex, newState.currentPlaylist)) {
      newState.currentStatus = 'Playing: ' + newState.currentPlaylist[newState.currentIndex].title;
    } else {
      newState.currentStatus = 'Playing: ' + newState.currentPlaylist[newState.currentIndex].episodeTitle;
    }
  }

  return { ...state, ...newState}
}

function App() {
  const initialState =
  {
    origPlaylist: [],
    currentPlaylist: [],
    playState: 'Paused',
    currentIndex: 0,
    currentStatus: 'Paused',
    shuffle: 'false'
  };

  const [state, dispatchState] = useReducer(playStateReducer, initialState);

  // Nothing I try here seems to work.
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Had to add 'playList' field to the JSON, as I was getting parser errors
        // with a straight up array.
        const response = await fetch('./audio.json');
        if (response.ok) {
          const result = await response.json();
          dispatchState({type: 'setList', payload: result});
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (e) {}
    }
    fetchData();
  }, []);
  // useEffect(() => {
  //   fetch('./audio.json').then((res)=>res.json()).then((data) => {
  //     dispatchState({type: 'setList', payload: data})
  //    })
     
  // }, [])

  return (
    <>
      <table className='table-style'>
        <thead>
          <tr>
            <th>My Most Awesome (yeah, right) Playlist</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Controls
                isShuffleActive={state.shuffle}
                onShuffleChange={() => dispatchState({ type: 'shuffle' })}
                onRewind={() => dispatchState({ type: 'rewind' })}
                onFastForward={() => dispatchState({ type: 'fastForward' })}
                onPlayStateChanged={() => dispatchState({ type: 'playPause' })}>
              </Controls>
            </td>
          </tr>
          <tr>
            <td>
              <Status statusValue={state.currentStatus}></Status>
            </td>
          </tr>
          <tr>
            <td><Playlist currentIndex={state.currentIndex} listItems={state.currentPlaylist} onPlayAudioRequested={(index) => dispatchState({ type: 'play', payload: index })}/></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default App
