import Axios from "axios";

export const apiCEP = Axios.create({
  baseURL: "https://viacep.com.br/ws/"
})