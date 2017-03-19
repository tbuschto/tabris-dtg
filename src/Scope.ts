import {API} from './TabrisAPI';

export default class Scope {

  private namespaces: {[name: string]: API} = {};

  public addNamespace(name: string, api: API): void {
    this.namespaces[name] = api;
  }

  public getPropertyType(typeName: string, propName: string): string {
    let type: string[] = typeName.split('.');
    if (this.namespaces[type[0]]) {
      return this.namespaces[type[0]].getPropertyType(type[1], propName);
    }
    return null;
  }

}
