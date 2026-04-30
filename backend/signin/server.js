import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("database.db");

db.run(`
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY,
		name TEXT,
		email TEXT UNIQUE,
		password TEXT,
		membership TEXT DEFAULT 'basic'
	)
`);

app.post("/register", (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.json({ success: false, message: "fill all fields" });
	}

	db.run(
		"INSERT INTO users (name, email, password, membership) VALUES (?, ?, ?, ?)",
		[name, email, password, "basic"],
		(err) => {
			if (err) {
				return res.json({ success: false, message: "email already used" });
			}
			res.json({ success: true });
		}
	);
});

app.post("/signin", (req, res) => {
	const { email, password } = req.body;

	db.get(
		"SELECT * FROM users WHERE email = ? AND password = ?",
		[email, password],
		(err, user) => {

			if (!user) {
				return res.json({ success: false, message: "wrong details" });
			}

			res.json({
				success: true,
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					membership: user.membership
				}
			});
		}
	);
});

app.put("/update-membership/:id", (req, res) => {
	const id = req.params.id;
	const { membership } = req.body;

	db.run(
		"UPDATE users SET membership = ? WHERE id = ?",
		[membership, id],
		(err) => {
			if (err) return res.json({ success: false });
			res.json({ success: true });
		}
	);
});
app.get("/check", (req, res) => {
	db.all("SELECT * FROM users", [], (err, rows) => {
		if (err) {
			return res.json([]);
		}
		res.json(rows);
	});
});
app.listen(3001, () => {
	console.log("running on http://localhost:3001");
});