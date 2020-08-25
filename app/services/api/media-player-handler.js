import TrackPlayer from 'react-native-track-player';

module.exports = async (data) => {
  console.log(data);
  if (data.type === 'playback-track-changed') {
  } else if (data.type === 'playback-state') {
    // Update the UI with the new state
    TrackPlayer.pause();
  } else if (data.type === 'remote-play') {
    // The play button was pressed, we can forward this command to the player using
    TrackPlayer.play();
  } else if (data.type === 'remote-stop') {
    // The stop button was pressed, we can stop the player
    TrackPlayer.stop();
  } else if (data.type === 'remote-pause') {
    // The play button was pressed, we can forward this command to the player using
    TrackPlayer.pause();
  } else if (data.type === 'remote-seek') {
    // The play button was pressed, we can forward this command to the player using
    TrackPlayer.seekTo(data.position);
  } else if (data.type === 'remote-jump-forward') {
    // The play button was pressed, we can forward this command to the player using
    TrackPlayer.seekTo(data.interval);
  } else if (data.type === 'remote-jump-backward') {
    // The play button was pressed, we can forward this command to the player using
    TrackPlayer.seekTo(data.interval);
  }
};
