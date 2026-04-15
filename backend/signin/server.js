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
    password TEXT
  )
`);

app.get("/", (req, res) => {
  res.send("backend is working");
});

app.post("/register", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!password || password.trim() === "") {
    return res.json({ success: false, message: "please enter a password" });
  }
  if (!email || email.trim() === "") {
    return res.json({ success: false, message: "please enter a email" });
  }
  if (!name || name.trim() === "") {
    return res.json({ success: false, message: "please enter a name" });
  }


  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (user) {
      return res.json({ success: false, message: "email already used" });
    }

    db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password],
      (err) => {
        if (err) {
          console.log(err);
          return res.json({ success: false, message: "something went wrong" });
        }

        res.json({ success: true, message: "account made" });
      }
    );
  });
});

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, user) => {
      if (!user) {
        return res.json({ success: false, message: "wrong details" });
      }

      res.json({ success: true, message: "logged in" });
    }
  );
});

app.get("/check", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    res.json(rows);
  });
});

app.listen(3001, () => {
  console.log("running on http://localhost:3001");
});