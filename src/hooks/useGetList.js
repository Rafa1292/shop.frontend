import axios from 'axios';

const useGetList = async (route) => {
    const API = `http://localhost:3000/api/v1/${route}`
	const list = await axios(API)


	return list;
};

export default useGetList;
