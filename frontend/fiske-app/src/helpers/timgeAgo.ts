


/**
 *timeAgo:
 * - params: timestamp (string) like ("2024-07-18T17:21:16.929Z")
 * - returns: string like '7 days ago'
 */
function timeAgo (timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
      return interval + " year" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
      return interval + " month" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
      return interval + " day" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
      return interval + " hour" + (interval === 1 ? "" : "s") + " ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
      return interval + " minute" + (interval === 1 ? "" : "s") + " ago";
  }
  return Math.floor(seconds) + " second" + (seconds === 1 ? "" : "s") + " ago";
};

export default timeAgo