
export class Setting {
    id: string = "";
    chiave: string = "";
    etichetta: string = "";
    contenuto: string = "";
    tipo: string = "";

    constructor() {
    }


  static createFromJsonObject(jsonObject: any): Setting {
    const constituent = new Setting();
    const actUser = Object.assign(constituent, jsonObject);
    return actUser;
  }

}
