import { SafeUser } from "@/features/user/models/user.model";

export type TUserContext = {
  id: SafeUser["id"];
  name: SafeUser["name"];
  email: SafeUser["email"];
};
