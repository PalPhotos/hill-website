import { AdminTypes } from "../types";

export const getLabel = (user) => ({
  type: AdminTypes.GET_LABEL_REQUEST,
  payload: { user },
});

export const addNewLabel = (name, user) => ({
  type: AdminTypes.ADD_LABEL_REQUEST,
  payload: { name, user },
});

export const addNewLabelPic = (name, url, user) => ({
  type: AdminTypes.ADD_LABEL_PIC_REQUEST,
  payload: { name, url, user },
});

export const getOnePicture = (url) => ({
  type: AdminTypes.GET_PICTURE_REQUEST,
  payload: { url },
});

export const getLabelPicture = (labels, user) => ({
  type: AdminTypes.GET_PICTURE_LABEL_REQUEST,
  payload: { labels, user },
});

export const getPictureNotLabel = (labels, user) => ({
  type: AdminTypes.GET_PICTURE_NOT_LABEL_REQUEST,
  payload: { labels, user },
});

export const editLabelPicture = (labels, url, label, user) => ({
  type: AdminTypes.EDIT_PICTURE_LABEL_REQUEST,
  payload: { labels, url, label, user },
});

export const getAllPicture = (user) => ({
  type: AdminTypes.GET_ALL_PICTURE_REQUEST,
  payload: { user },
});

export const addNewPicture = (name, taken) => ({
  type: AdminTypes.ADD_PICTURE_REQUEST,
  payload: { name, taken },
});

export const setAllButPics = (val) => ({
  type: AdminTypes.SET_ALL_BUT_PICS,
  payload: val,
});

export const addToCluster = (values, labels, user) => ({
  type: AdminTypes.ADD_TO_CLUSTER_REQUEST,
  payload: { values, labels, user },
});

export const addFromDrive = (items, user) => ({
  type: AdminTypes.ADD_PICTURE_DRIVE_REQUEST,
  payload: { items, user },
});

export const clearPics = () => ({
  type: AdminTypes.CLEAR_PICS,
  payload: {},
});
