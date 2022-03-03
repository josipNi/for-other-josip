import { GridLayoutApi } from "./grid-layout.api";

export type AllApis = typeof allApis;

const allApis = {
  gridLayoutApi: new GridLayoutApi(),
};

export default allApis;
