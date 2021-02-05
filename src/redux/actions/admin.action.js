import { AdminTypes } from "../types";

export const getLabel = () => ({
  type: AdminTypes.GET_LABEL_REQUEST,
  payload: {},
});

export const addNewLabel = (name) => ({
  type: AdminTypes.ADD_LABEL_REQUEST,
  payload: { name },
});

export const addNewLabelPic = (name, url) => ({
  type: AdminTypes.ADD_LABEL_PIC_REQUEST,
  payload: { name, url },
});

export const getOnePicture = (url) => ({
  type: AdminTypes.GET_PICTURE_REQUEST,
  payload: { url },
});

export const getLabelPicture = (labels) => ({
  type: AdminTypes.GET_PICTURE_LABEL_REQUEST,
  payload: { labels },
});

export const getPictureNotLabel = (labels) => ({
  type: AdminTypes.GET_PICTURE_NOT_LABEL_REQUEST,
  payload: { labels },
});

export const editLabelPicture = (labels, url, label) => ({
  type: AdminTypes.EDIT_PICTURE_LABEL_REQUEST,
  payload: { labels, url, label },
});

export const getAllPicture = () => ({
  type: AdminTypes.GET_ALL_PICTURE_REQUEST,
  payload: {},
});

export const addNewPicture = (name, taken) => ({
  type: AdminTypes.ADD_PICTURE_REQUEST,
  payload: { name, taken },
});

export const setAllButPics = (val) => ({
  type: AdminTypes.SET_ALL_BUT_PICS,
  payload: val,
});

export const addToCluster = (values, labels) => ({
  type: AdminTypes.ADD_TO_CLUSTER_REQUEST,
  payload: { values, labels },
});
