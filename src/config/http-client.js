import axios from 'axios';

export class HttpClient {
    axiosInstance;

    constructor() {
        let configs = {
            baseURL: 'http://localhost:8081/api/',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',

                // Authorization: "Bearer " + tokenAccess,
            },
            timeout: 5000,
            transformRequest: [
                (data, headers) => {
                    if (data instanceof FormData) {
                        if (headers) {
                            delete headers['Content-Type'];
                        }
                        return data;
                    }
                    return JSON.stringify(data);
                },
            ],
        };
        this.axiosInstance = axios.create(configs);
        this.axiosInstance.interceptors.request.use(
            function (config) {
                return config;
            },
            function (error) {
                return Promise.reject(error);
            },
        );
        this.axiosInstance.interceptors.response.use(
            function (response) {
                return response.data;
            },
            function (error) {
                return Promise.reject(error);
            },
        );
    }
}
