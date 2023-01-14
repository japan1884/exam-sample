import axios from "axios";

class ApiClient {
    constructor(apiUrl) {
        this.url = apiUrl;
    }

    apiGet = () => {
        return axios.get(this.url);
    }
}

export default ApiClient;