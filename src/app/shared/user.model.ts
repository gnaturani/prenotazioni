export class App {
    id!: string;
    title!: string;
    url!: string;

    selected!: boolean;
}

export class User {
    id!: string;
    name!: string;
    surname!: string;
    username!: string;
    token!: string;
    nome!: string;
    cognome!: string;

    data_nascita!: Date;
    cell1!: string;
    cell2!: string;

    email1!: string;
    email2!: string;

    privacy_accepted: boolean;
    updated_at!: Date;

    confirmed!: boolean;

    apps!: Array<App>;

    constructor() {
      this.privacy_accepted = false;
    }


  static createFromJsonObject(jsonObject: any): User {
    const constituent = new User();
    const actUser = Object.assign(constituent, jsonObject);
    if (actUser.privacy_accepted === undefined) {
      actUser.privacy_accepted = false;
    }
    return actUser;
  }

}
