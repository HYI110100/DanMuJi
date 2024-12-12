import { ConfigDataType } from "./configData";
export {};

declare global {
  var config: ConfigDataType;
  var env: 'development' | 'production'
  var SEVER_PORT: number
  var SEVER_PATH: string
}
