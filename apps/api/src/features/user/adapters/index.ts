import { User } from "../models";
import { SafeUser } from "../models/user.model";

export class UserAdapter {
  static toSafeUser({ user }: { user: User }): { user: SafeUser } {
    const { password, ...safeUser } = user;
    return { user: safeUser };
  }

  static toOnlyActive({ user }: { user: User }): { user: User | null } {
    if (typeof user.end_date !== null) {
      return { user };
    }

    return { user: null };
  }
}
