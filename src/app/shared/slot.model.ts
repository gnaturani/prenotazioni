import { Time } from "@angular/common";

export class Slot {
    id!: number;
    inizio!: Time;
    fine!: Time;
    attivo!: boolean;

    constructor() {

    }

  static createFromJsonObject(jsonObject: any): Slot {
    const constituent = new Slot();
    const actUser = Object.assign(constituent, jsonObject);
    return actUser;
  }

}
