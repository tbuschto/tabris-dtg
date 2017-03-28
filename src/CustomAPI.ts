import { API } from './TabrisAPI';
import Scope from './Scope';

export interface CustomType {
  baseType: string;
  baseNamespace: string;
}

export default class CustomAPI implements API {

  private scope: Scope;
  private types: {[name: string]: CustomType};

  constructor(scope: Scope) {
    this.scope = scope;
    this.types = {};
  }

  public getPropertyType(typeName: string, propName: string): string {
    let customType: CustomType = this.types[typeName];
    return this.scope.getPropertyType(customType.baseNamespace, customType.baseType, propName);
  }

  public addType(name: string, customType: CustomType): void {
    this.types[name] = customType;
  }

}
