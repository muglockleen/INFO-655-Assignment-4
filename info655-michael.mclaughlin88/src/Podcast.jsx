export default function Podcast(props) {
  const descriptionItems = [];

  let marker = '';
  if (props.isSelected) {
    marker = '* ';
  }

  if (props.season) {
    descriptionItems.push('Season: #' + props.season);
  }

  if (props.episode) {
    descriptionItems.push('Episode: #' + props.episode);
  } else {
    descriptionItems.push('Episode: #???');
  }

  if (props.year) {
    descriptionItems.push('Year: ' + props.year);
  }

  return (
    <>
    <h3>{marker}Podcast: {props.episodeTitle}</h3>
    {descriptionItems.join(' | ')}
    </>
  );
}