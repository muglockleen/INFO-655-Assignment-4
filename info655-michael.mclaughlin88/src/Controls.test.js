import { useState } from "react";

export default function Controls({isShuffleActive, onShuffleChange, onRewind, onFastForward, onPlayStateChanged}) {
  return (
    <div className='controls-container'>
      <div className='list-controls'>
        {/* TODO(MPM): Set style to pressed look when shuffle is active */}
        <button type='button' onClick={onShuffleChange}>SHUFFLE</button>
      </div>
      <div className='list-controls'>
        <button type='button' onClick={onRewind}>PREV</button>
      </div>
      <div className='list-controls'>
        <button type='button' onClick={onPlayStateChanged}>PLAY/PAUSE</button>
      </div>
      <div className='list-controls'>
        <button type='button' onClick={onFastForward}>NEXT</button>
      </div>
    </div>
  );
}
