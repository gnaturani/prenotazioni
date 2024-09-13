export class Prenotazione {
    id!: number;
    id_stanza!: number;
    data: Date = new Date();
    id_slot!: number;
    creato_il!: Date;
    id_utente!: number;
    quante_persone!: number;

    constructor() {
      this.data = new Date();
    }

  static createFromJsonObject(jsonObject: any): Prenotazione {
    const constituent = new Prenotazione();
    const actUser = Object.assign(constituent, jsonObject);
    return actUser;
  }

}
