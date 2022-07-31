import axios from 'axios';

const $http=axios.create({
    baseURL:"",
    timeout:2000,
    headers:{
        "Content-Type":"application/json;charset=utf-8"
    }
})