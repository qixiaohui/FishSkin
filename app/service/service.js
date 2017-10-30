const axios = require('axios');

var crud = {
    get: (url, headers) => {
        return axios({
            method: 'get',
            url: url,
            headers: headers
        });
    },
    post: (url, headers, form) => {
        return axios({
            method: 'post',
            url: url,
            headers: headers,
            data: form
        });
    }
};

module.exports = crud;