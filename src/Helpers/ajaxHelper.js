import Axios from "axios";
import { SERVICE_BASE_URL } from "../config";



const ajax = Axios.create({
    baseURL : `${SERVICE_BASE_URL}`,
    headers:{
        'X-Requested-With' : 'XMLHttpRequest',
    },
})

export default ajax;