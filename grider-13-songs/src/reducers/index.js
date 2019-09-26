import { combineReducers } from "redux";
const songReducer = () => {
  return [
    { title: "Macarena", duration: "3:00" },
    { title: "We are the world", duration: "3:18" },
    { title: "Dilemma", duration: "4:00" },
    { title: "Careless Whisper", duration: "3:20" },
    { title: "All Star", duration: "3:15" }
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === "SONG_SELECTED") {
    return action.payload;
  }
  return selectedSong;
};

export default combineReducers({
  songs: songReducer,
  selectedSong: selectedSongReducer
});
