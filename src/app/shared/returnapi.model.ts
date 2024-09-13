export class Returnapi {
    success: boolean = false;
    result: boolean = false;
    returnMessages: Array<string> = [];
    returnObject: Object = "";
    link: string = "";

    constructor() {
    }

  static createFromJsonObject(jsonObject: any): Returnapi {
    const constituent = new Returnapi();
    const actUser = Object.assign(constituent, jsonObject);
    return actUser;
  }

  getSuccess() {
    if (this.success !== null && this.success !== undefined ) {
      return this.success;
    } else {
      return this.result;
    }
  }

}
