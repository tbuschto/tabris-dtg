import {API} from './TabrisAPI';
import CustomAPI, {CustomType} from './CustomAPI';

export default class Scope {

  private namespaces: {[name: string]: API} = {};

  public addNamespace(name: string, api: API): void {
    this.namespaces[name] = api;
  }

  public addType(namespace: string, name: string, customType: CustomType): void {
    if (!this.namespaces[namespace]) {
      this.namespaces[namespace] = new CustomAPI(this);
    }
    let api: CustomAPI = this.namespaces[namespace] as CustomAPI;
    api.addType(name, customType);
  }

  public getPropertyType(ns: string, typeName: string, propName: string): string {
    if (this.namespaces[ns]) {
      return this.namespaces[ns].getPropertyType(typeName, propName);
    }
    return null;
  }

}
