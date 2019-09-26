import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization:
      "Client-ID 8c968c529c285c7fa3b0a67aa3c6dd190d9cf46fb4965211960ad3e5c3e1ee4b"
  }
});
