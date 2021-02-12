import { Service, Container } from "typedi";
import { MainApi } from "../apis";

class AdminService {
  async addNewLabel(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.addNewLabel(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addNewLabelPic(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.addNewLabelPic(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateLabel(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.updateLabel(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteLabel(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.deleteLabel(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getLabel(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.getLabel(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addNewPicture(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.addNewPicture(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updatePicture(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.updatePicture(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deletePicture(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.deletePicture(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getOnePicture(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.getOnePicture(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getLabelPicture(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.getLabelPicture(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getPictureNotLabel(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.getPictureNotLabel(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllPicture(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.getAllPicture(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async editLabelPicture(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.editLabelPicture(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addToCluster(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.addToCluster(type);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addFromDrive(type) {
    try {
      const publicApiService = Container.get(MainApi);
      const response = await publicApiService.addFromDrive(type);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default AdminService;
