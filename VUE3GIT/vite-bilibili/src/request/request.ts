import axios from 'axios';

const instance=axios.create({
    timeout:15000
})
instance.defaults.withCredentials = true

instance.interceptors.request.use(config=>{
    return config;
},err=>{
    return Promise.reject(err);
})

instance.interceptors.response.use(result=>{
    return result.data;
},err=>{
    return Promise.reject(err);
})
export default instance;