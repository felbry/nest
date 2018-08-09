import axios from 'axios';

// const HOST = 'http://flipped.leanapp.cn';
const HOST = 'http://localhost:3000';

const _GET = (url, params) => {
    return axios.request({
        url: `${HOST}${url}`,
        method: 'GET',
        params: params,
    }).then(res => {
        return res.data;
    });
}

const _POST = (url, payload) => {
    return axios.request({
        url: `${HOST}${url}`,
        method: 'POST',
        data: payload,
    }).then(res => {      
        return res.data;
    });
}

// blog start
export const GET_ARTICAL_LIST = (params) => {
    return _GET('/api/blog/articals', params);
}

export const GET_ARTICAL = (params) => {
    return _GET(`/api/blog/articals/${params.id}`);
}

export const GET_TAG_LIST = () => {
    return _GET('/api/blog/tags');
}
// blog end

// photo start
export const GET_PHOTO_LIST = (params) => {
    return _GET('/api/photo/imgs', params);
}

export const GET_PHOTO_TAG_LIST = () => {
    return _GET('/api/photo/tags');
}
// photo end

// 朋友
export const POST_FRIEND_REGISTRY = (payload) => {
    return _POST('/api/friend/registry', payload);
}