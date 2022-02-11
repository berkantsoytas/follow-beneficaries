const axios = require("axios").default;
const url = "https://sds.steemworld.org/rewards_api/getRewards/comment_benefactor_reward/post24/";

async function request() {
  const currentTime = currentUnixTime();
  const monthAgo = getAMonthAgo();
  let response;
  const res = await axios.get(url + monthAgo + "-" + currentTime);
  response = res.data.result.rows;
  return response;
}

function getAMonthAgo() {
  let date = new Date();
  date.setMonth(date.getMonth() - 1);
  return Math.floor(date.getTime() / 1000);
}

function currentUnixTime() {
  return Math.floor(Date.now() / 1000);
}

function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago.";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago.";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago.";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago.";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago.";
  }
  return Math.floor(seconds) + " second ago.";
}

module.exports = {
  timeSince,
  request,
};
