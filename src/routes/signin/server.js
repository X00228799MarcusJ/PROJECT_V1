app.post("/signin", (req, res) => {
	const { email, password } = req.body;

	db.get(
		"SELECT * FROM users WHERE email = ? AND password = ?",
		[email, password],
		(err, user) => {

			if (!user) {
				return res.json({
					success: false,
					message: "wrong details"
				});
			}
			res.json({
				success: true,
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					membership: user.membership || "basic"
				}
			});
		}
	);
});