import HttpClient from "./base.api";
import routes from "./routes";
import { SERVER_URI } from "../constants/server";

class MainApi extends HttpClient {
  constructor() {
    super(`${SERVER_URI}`);

    // this._initializeResponseInterceptor();
  }

  // _initializeResponseInterceptor = () => {
  //   this.instance.interceptors.request.use(
  //     this._handleRequest,
  //     this._handleError
  //   );
  // };

  // _handleRequest = (config) => {
  //   config.headers["x-key"] = API_KEY;

  //   return config;
  // };

  addNewLabel = (item) => {
    return this.instance.post(`${routes.LABEL}/add`, item);
  };

  addNewLabelPic = (item) => {
    return this.instance.post(`${routes.LABEL}/addpic`, item);
  };

  updateLabel = (item) => {
    return this.instance.post(`${routes.LABEL}/update`, item);
  };

  deleteLabel = (item) => {
    return this.instance.post(`${routes.LABEL}/delete`, item);
  };

  getLabel = (item) => {
    return this.instance.get(`${routes.LABEL}/get`, item);
  };

  addNewPicture = (item) => {
    return this.instance.post(`${routes.PICTURE}/add`, item);
  };

  updatePicture = (item) => {
    return this.instance.post(`${routes.PICTURE}/update`, item);
  };

  deletePicture = (item) => {
    return this.instance.post(`${routes.PICTURE}/delete`, item);
  };

  getOnePicture = (item) => {
    return this.instance.post(`${routes.PICTURE}/getone`, item);
  };

  getPictureNotLabel = (item) => {
    return this.instance.post(`${routes.PICTURE}/getlabelnot`, item);
  };

  getLabelPicture = (item) => {
    return this.instance.post(`${routes.PICTURE}/getlabel`, item);
  };

  getAllPicture = () => {
    return this.instance.post(`${routes.PICTURE}/getall`);
  };

  editLabelPicture = (item) => {
    return this.instance.post(`${routes.PICTURE}/remlabel`, item);
  };

  addToCluster = (item) => {
    return this.instance.post(`${routes.PICTURE}/addclus`, item);
  };
}

export default MainApi;
