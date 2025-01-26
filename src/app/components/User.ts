export class User {
    userName: string;
    password: string;
    role: boolean;
  
    constructor( userName: string, password: string, role: boolean) {
      this.userName = userName;
      this.password = password;
      this.role = role;
    }
  }