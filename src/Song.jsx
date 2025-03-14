import React from "react";

export default function Song( props ) {
  const descriptionItems = [];

  let marker = '';
  if (props.isSelected) {
    marker = '* ';
  }

  if (props.year) {
    descriptionItems.push('Year: ' + props.year);
  }

  if (props.genre) {
    descriptionItems.push('Genre: ' + props.genre);
  }

  return (
    <>
      <h3>{marker}{props.artist}: {props.title}</h3>
      {descriptionItems.join(' | ')}
    </>
  );
}
