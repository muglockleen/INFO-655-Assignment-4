export default function Song({ title, artist, year, isSelected }) {
  let marker = '';
  if (isSelected) {
    marker = '* ';
  }

  return (
    <>
      <h3>{marker}{artist}: {title}</h3>
      Year: {year}
    </>
  );
}
