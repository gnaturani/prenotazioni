export class TotaleRuolo {
  ruolo!: string;
  titolo!: string;
  totale: number;
  totale_s1!: number;
  totale_s2!: number;
  color!: string;

  constructor() {
    this.totale = 0;
  }
}

export class Turno {
  titolo!: string;
  inizio!: Date;
  fine!: Date;
  id!: string;
  idturnorif!: string;
  idturnopre!: string;
  gruppo!: string;
  preiscrizione: boolean;
  diaria: number;

  auto_gestione!: boolean;

  inizio_isc!: Date;
  fine_isc!: Date;
  isc_aperte!: boolean;

  year!: number;
  id_pre_isc_online!: number;

  static createFromJsonObject(jsonObject: any): Turno {
    const constituent = new Turno();
    const actUser = Object.assign(constituent, jsonObject);
    return actUser;
  }

  constructor() {
    // this.days = TurnoDay.creaGiornatePerTurno(this);
    this.preiscrizione = false;
    this.diaria = 0;
  }



}
