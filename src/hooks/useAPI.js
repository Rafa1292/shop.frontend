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
    try {
        const object = await useCustom(route, 'get', {});
        return object;
        
    } catch (error) {
        
    }
};

const usePatch = async (route, data) => {
    const response = await useCustom(route, 'patch', data);
    return response;
}

const useCustom = async (route, method, data) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios({
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: method,
            url: `${api}${route}`,
            data: data,

        });

        return response;

    } catch (error) {
        console.log(`error`)
        console.log(error)
    }
}

export { useGetList, usePost, useDelete, useGet, useCustom, usePatch };