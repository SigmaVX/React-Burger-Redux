import axios from "axios";

// Note: we are not using a global default since we will have multiple URLs
const instance = axios.create({
    baseURL: "https://react-buger-c3d8d.firebaseio.com/"
});

export default instance;