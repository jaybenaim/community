import axios from "axios";
import { IMAGE_ACCESS_KEY } from "./keys";

export default axios.create({
  baseURL: `https://api.unsplash.com/photos/?client_id=${IMAGE_ACCESS_KEY}`
});
