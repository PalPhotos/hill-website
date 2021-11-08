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

export const getLabelPicture = (user) => ({
  type: AdminTypes.GET_PICTURE_LABEL_REQUEST,
  payload: { user },
});

export const getPictureNotLabel = (labels, user) => ({
  type: AdminTypes.GET_PICTURE_NOT_LABEL_REQUEST,
  payload: { labels, user },
});

export const editLabelPicture = (labels, url, label, user) => ({
  type: AdminTypes.EDIT_PICTURE_LABEL_REQUEST,
  payload: { labels, url, label, user },
});

export const getAllPicture = (user, pageNumber) => ({
  type: AdminTypes.GET_ALL_PICTURE_REQUEST,
  payload: { user, pageNumber },
});

export const getAllPictureNext = (user, pageNumber) => ({
  type: AdminTypes.GET_ALL_PICTURE_REQUEST_NEXT,
  payload: { user, pageNumber },
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

export const addPictureForLabelling = (items, user) => ({
  type: AdminTypes.ADD_PICTURE_FOR_LABELLING_REQUEST,
  payload: { items, user },
});

export const getPictureForLabelling = () => ({
  type: AdminTypes.GET_PICTURE_FOR_LABELLING_REQUEST,
  payload: {},
});

export const setPictureForLabelling = (items) => ({
  type: AdminTypes.UPDATE_PICTURE_FOR_LABELLING,
  payload: items,
});

export const setPictureAfterLabelling = (_id, labels) => ({
  type: AdminTypes.UPDATE_PICTURE_AFTER_LABELLING,
  payload: { _id, labels },
});

export const setSelectedIndex = (items) => ({
  type: AdminTypes.SET_SELECTED_INDEXES,
  payload: items,
});

export const clearPics = () => ({
  type: AdminTypes.CLEAR_PICS,
  payload: {},
});
