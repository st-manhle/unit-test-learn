import { AuthStorageService } from './authStorage.service';

export class AuthService extends AuthStorageService {

  constructor() {
    super();
  }

  signIn(token: string) {
    this.setToken(token);
  }

  signOut() {
    this.removeToken();
  }
}
