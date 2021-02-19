import { Service, Container } from "typedi";
import { MainApi } from "../apis";

class AnnotationService {
  async getAnnotation(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.getAnnotation(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateAnnotation(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.updateAnnotation(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteAnnotation(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.deleteAnnotation(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addNewAnnotation(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.addNewAnnotation(type);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default AnnotationService;
