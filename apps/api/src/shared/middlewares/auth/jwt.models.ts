import { type User } from "@/features/user/models/user.model";

export type TUserContext = {
	id: User["id"];
};
