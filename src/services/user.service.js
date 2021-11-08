import { Service, Container } from "typedi";
import { MainApi } from "../apis";

class UserService {
  async getUser(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.getUser(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async loginUser(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.loginUser(type);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
