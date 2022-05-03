import axios from 'axios';

const usePostObject = async (route, data) => {
    const API = `http://localhost:3000/api/v1/${route}`

    const response = await axios({
        method: 'post',
        url: API,
        data: data
      });

      return response;
}
export default usePostObject;
