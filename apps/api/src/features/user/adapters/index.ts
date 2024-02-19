import { User } from "../models";
import { SafeUser } from "../models/user.model";

export class UserAdaper {
  private user: User;

  constructor({ user }: { user: User }) {
    this.user = user;
  }

  toSafeUser(): { user: SafeUser } {
    const { password, ...safeUser } = this.user;
    return { user: safeUser };
  }
}
