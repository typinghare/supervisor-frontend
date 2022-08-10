export class LocalUser {
  userId?: number;

  token?: string;

  username?: string;

  isSignedIn: boolean = false;

  signIn(userId: number | string, token: string, username: string) {
    this.userId = parseInt(userId as string);
    this.token = token;
    this.username = username;
    this.isSignedIn = true;
  }

  signOut() {
    this.userId = undefined;
    this.token = undefined;
    this.username = undefined;
    this.isSignedIn = false;
  }

  generalRequestHeader() {
    if (!this.token) {
      throw new UserNotSignInException();
    }

    return { token: this.token };
  }
}

export class UserNotSignInException extends Error {
}

export const localUser = new LocalUser();
