export class Room {
    id!: number;
    nome!: string;
    capienza!: number;

    attiva: boolean = false;

    constructor() {

    }

  static createFromJsonObject(jsonObject: any): Room {
    const constituent = new Room();
    const actUser = Object.assign(constituent, jsonObject);
    return actUser;
  }

}
