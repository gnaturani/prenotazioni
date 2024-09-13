
export class App {
    id!: string;
    title!: string;
    url!: string;
    constructor() {
    }


  static createFromJsonObject(jsonObject: any): App {
    const constituent = new App();
    const actUser = Object.assign(constituent, jsonObject);
    return actUser;
  }

}
