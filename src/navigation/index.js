import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import Loading from "../components/Loading";

const HomeScreen = lazy(() => import("../screens/HomeScreen"));
const SinglePhotoScreen = lazy(() => import("../screens/SinglePhotoScreen"));
const ClusteringScreen = lazy(() => import("../screens/ClusteringScreen"));

const Main = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path="/hill-website" component={HomeScreen} />
      <Route exact path="/single" component={SinglePhotoScreen} />
      <Route exact path="/cluster" component={ClusteringScreen} />
    </Switch>
  </Suspense>
);

export default Main;
