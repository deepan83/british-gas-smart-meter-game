import axios from 'axios';
import cookie from 'vue-cookie';

export default function http(options) {
    var headers = {};
    if (cookie.get('token')) {
        headers['Authorization'] = 'Bearer ' + cookie.get('token');
    }

    var http =  axios.create({
       baseURL: 'http://workability.local/app_dev.php/',
       timeout: 1000,
       headers,
       withCredentials: true
    });

    return http(options);
}
