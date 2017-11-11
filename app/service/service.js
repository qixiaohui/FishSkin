const axios = require('axios');
const _ = require('underscore');

var crud = {
    get: (url, headers) => {
        headers = !headers? {} : headers; 
        if (localStorage.getItem("USER")) {
            let header = {};
            header.Authorization = JSON.parse(localStorage.getItem("USER")).token;
            header["Content-Type"] = "application/json";
            _.extend(headers, header);
        }
        return axios({
            method: 'get',
            url: url,
            headers: headers
        });
    },
    post: (url, headers, form) => {
        headers = !headers? {} : headers;
        if (localStorage.getItem("USER")) {
            let header = {};
            header.Authorization = JSON.parse(localStorage.getItem("USER")).token;
            header["Content-Type"] = "application/json";
            _.extend(headers, header);
        }
        return axios({
            method: 'post',
            url: url,
            headers: headers,
            data: form
        });
    }
};

module.exports = crud;