import { User } from "@/features/user/models";

export type TCookiePayload = {
	user: {
		id: User["id"];
	};
};
