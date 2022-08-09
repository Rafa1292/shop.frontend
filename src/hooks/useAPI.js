import axios from 'axios';
import swal from 'sweetalert';

const api = `https://limitless-hamlet-11683.herokuapp.com/api/v1/`;

const useGetList = async (name) => {

    const list = await useCustom(name, 'get', {});
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
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: method,
            url: `${api}${route}`,
            data: data,
        });
        if(response?.data?.error){
            swal('Error',  response?.data?.message, 'warning')
        }

        return response.data;

    } catch (error) {
        if (!error.message.includes('401')) {
            swal('OOPS!', 'No hemos logrado contactar con nuestros servidores, intentalo de nuevo y verifica que estes conectado a internet...', 'info')
            
        }

    }
}

export { useGetList, usePost, useDelete, useGet, useCustom, usePatch };