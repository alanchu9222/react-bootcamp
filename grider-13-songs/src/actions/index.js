// Action Creator
const selectSong = song => {
  return {
    type: "SONG_SELECTED",
    payload: song
  };
};
