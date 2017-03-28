import {API} from './TabrisAPI';

export default class Scope {

  private namespaces: {[name: string]: API} = {};

  public addNamespace(name: string, api: API): void {
    this.namespaces[name] = api;
  }

  public getPropertyType(ns: string, typeName: string, propName: string): string {
    if (this.namespaces[ns]) {
      return this.namespaces[ns].getPropertyType(typeName, propName);
    }
    return null;
  }

}
