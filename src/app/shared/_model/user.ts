export class User {

  username?: string;
  email?: string;
  password?: string;
  enabled?: boolean;

  public static createUserWithoutId(username: string, email: string, password: string, enabled: boolean): User {
    const user = new User();
    user.username = username;
    user.email = email;
    user.password = password;
    user.enabled = enabled;
    return user;
  }
}
