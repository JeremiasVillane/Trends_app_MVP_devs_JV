const Timestamp = ({ timestamp }) => {
  const formattedTimestamp = formatTimestamp(timestamp);

  return <span>{formattedTimestamp}</span>;
};

export default Timestamp;

function formatTimestamp(timestamp) {
  const now = new Date();
  const messageTime = new Date(timestamp);
  const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));

  if (diffInMinutes < 1) {
    return "Justo ahora";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min atrás`;
  } else {
    const options = { month: "short", day: "numeric" };
    return messageTime.toLocaleDateString(undefined, options);
  }
}
