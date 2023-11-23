// api.js
import axios from 'axios';

const GET_CATEGORIA_BASE_URL = 'http://127.0.0.1:8000/api/categoria';

class categoriaServices{
    getAll(){
        return axios.get(GET_CATEGORIA_BASE_URL)
    }
}
export default new categoriaServices();
