export function getCookieMaxAge(): number {
	const currentDate = new Date();

	// set date on the next 14 days future
	const dateInFuture14Days =
		new Date().getTime() +
		1000 /* 1 second */ *
			60 /* 1 minute */ *
			60 /* 1 hour */ *
			24 /* 1 day */ *
			14; /*14 days */

	return dateInFuture14Days;
}
