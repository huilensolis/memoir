import { t } from "elysia";
export const UserSchema = t.Object({
	name: t.String({ maxLength: 50 }),
	email: t.String({ maxLength: 100 }),
	password: t.Optional(t.String({ maxLength: 70, minLength: 14 }), true),
});

export const SafeUserSchema = t.Object({
	name: UserSchema.properties.name,
	email: UserSchema.properties.email,
});
