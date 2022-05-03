import axios from 'axios';

const api = `http://localhost:3000/api/v1/`;

const useGetList = async (route) => {
    const list = await useCustom(route, 'get', {});

    return list;
};

const usePost = async (route, data) => {
    const response = await useCustom(route, 'post', data);
    return response;
}

const useDelete = async (route) => {
    const response = await useCustom(route, 'delete', {});
    return response;
}

const useGet = async (route) => {
    const object = await useCustom(route, 'get', {});
    return object;
};

const usePatch = async (route, data) => {
    const response = await useCustom(route, 'patch', data);
    return response;
}

const useCustom = async (route, method, data) => {
    const response = await axios({
        method: method,
        url: `${api}${route}`,
        data: data
    });

    return response;
}

export { useGetList, usePost, useDelete, useGet, useCustom, usePatch };