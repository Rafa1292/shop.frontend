import axios from 'axios';

const usePostObject = async (route) => {
    const API = `http://localhost:3000/api/v1/${route}`

    const response = await axios({
        method: 'delete',
        url: API
      });

      return response;
}
export default usePostObject;
