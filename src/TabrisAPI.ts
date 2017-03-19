import {readdirSync, readFileSync} from 'fs';
import {resolve} from 'path';

export interface API {

  getPropertyType(typeName: string, propName: string): string;

}

export default class TabrisAPI {

  private readonly api: TabrisTypeCollection;

  constructor(version: string) {
    const apiPath: string = resolve(__dirname, '../meta/' + version + '/api/');
    const widgetPath: string = resolve(apiPath, 'widgets');
    this.api = Object.assign(readAllJSON(apiPath), readAllJSON(widgetPath));
  }

  public getPropertyType(typeName: string, propName: string): string {
    let tabrisType: TabrisType = this.api[typeName];
    let tabrisProperty: TabrisProperty = null;
    while (tabrisType != null && tabrisProperty == null) {
      tabrisProperty = tabrisType.properties ? tabrisType.properties[propName] : null;
      tabrisType = this.api[tabrisType.extends];
    }
    return tabrisProperty ? tabrisProperty.type : null;
  }

}

function readAllJSON(path: string): TabrisTypeCollection {
  const result: TabrisTypeCollection = {};
  let files: string[] = readdirSync(path);
  for (let file of files) {
    if (!(file.endsWith('.json'))) {
      continue;
    }
    let filePath: string = resolve(path, file);
    let tabrisType: TabrisType = JSON.parse(readFileSync(filePath, 'utf-8'));
    result[tabrisType.type] = tabrisType;
  }
  return result;
}

interface TabrisTypeCollection {
  [type: string]: TabrisType;
}

interface TabrisType {
  readonly type: string;
  readonly extends?: string;
  readonly properties: {readonly [name: string]: TabrisProperty};
}

interface TabrisProperty {
  readonly type: string;
}
