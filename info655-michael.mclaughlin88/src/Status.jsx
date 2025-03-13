import React from "react";

export default function Status({statusValue}) {
  return (
    <p className='play-status' name='play-status'>{statusValue}</p>
  );
}
