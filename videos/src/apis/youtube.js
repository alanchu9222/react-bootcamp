import axios from "axios";
const KEY = "AIzaSyC4CnQsYQ8YMD2JBUSVUmij5MpYLMSg6oM";
export default axios.create({
  baseURL: "https://googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY
  }
});
