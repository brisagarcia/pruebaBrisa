import axios from 'axios';

export default class UserListService {

  constructor() {
    this.url = "https://reqres.in/api/users";
  }
  
  obtenerUser() {
    const config = {
      method: "get",
      url: this.url,
      headers: {},
    };

    return axios(config).then((response) => {
      return response.data;
    });
  }

  obtenerInfoUser(pId) {
    const config = {
      method: "get",
      url: `${this.url}/${pId}`,
      headers: {},
    };


    return axios(config).then((response) => {
      return response.data;
    });
  }
}
