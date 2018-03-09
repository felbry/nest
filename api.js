import axios from 'axios';

const A = axios.create({
    // baseURL: IS_DEV ? 'http://localhost:3000' : 'http://flipped.leanapp.cn'
    baseURL: 'http://localhost:3000'
});

export const GET_ARTICAL_LIST = () => {
    return A.get('/api/blog/articals').then(res => {
        return res.data;
    });
}

export const GET_ARTICAL = (params) => {
    return A.get(`/api/blog/articals/${params.id}`).then(res => {
        return res;
    });
}