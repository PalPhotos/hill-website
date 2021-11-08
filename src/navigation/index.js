import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Loading from "../components/Loading";

const HomeScreen = lazy(() => import("../screens/HomeScreen"));
const SinglePhotoScreen = lazy(() => import("../screens/SinglePhotoScreen"));
const ClusteringScreen = lazy(() => import("../screens/ClusteringScreen"));
const LoginScreen = lazy(() => import("../screens/LoginScreen"));
const ImportPhotosScreen = lazy(() => import("../screens/ImportPhotosScreen"));
const LabellingScreen = lazy(() => import("../screens/LabellingScreen"));
const StroopRegScreen = lazy(() => import("../screens/StroopReg"));
const DownloadScreen = lazy(() => import("../screens/DownloadScreen"));
const PostRegScreen = lazy(() => import("../screens/PostRegScreen"));
const FailReg = lazy(() => import("../screens/FailReg"));
const PrivacyPolicy = lazy(() => import("../screens/PrivacyPolicy"));
const DownloadInternalScreen = lazy(() =>
  import("../screens/DownloadInternalScreen")
);

const Main = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path="/" component={HomeScreen} />
      <Route exact path="/single" component={SinglePhotoScreen} />
      <Route exact path="/labelled" component={ClusteringScreen} />
      <Route exact path="/login" component={LoginScreen} />
      <Route exact path="/import" component={ImportPhotosScreen} />
      <Route exact path="/labelling" component={LabellingScreen} />
      <Route exact path="/stroopreg" component={StroopRegScreen} />
      <Route exact path="/download" component={DownloadScreen} />
      <Route exact path="/calcomp" component={PostRegScreen} />
      <Route exact path="/failcomp" component={FailReg} />
      <Route exact path="/privacypolicy" component={PrivacyPolicy} />
      <Route
        exact
        path="/download/internal"
        component={DownloadInternalScreen}
      />
    </Switch>
  </Suspense>
);

export default Main;
