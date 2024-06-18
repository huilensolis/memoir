export function getRandomString({ length }: { length: number }) {
	if (length > 36) throw new Error("max length exeded, max length is 36");

	return crypto.randomUUID().split("").slice(0, length).join("");
}
