import express from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/users", (req, res) => {
  fs.readFile("./db/users.json", "utf-8", (err, data) => {
    if (data) {
      res.status(200).send(JSON.stringify(data));
    } else {
      res.status(400).json({ message: "error" });
    }
  });
});

app.post("/form", (req, res) => {
  const { email, password } = req.body.user;
  const data = { email, password };
  try {
    fs.readFile("./db/users.json", "utf8", (err, fileData) => {
      if (err) {
        console.error(err);
        return;
      }

      let users = [];
      if (fileData) {
        users = JSON.parse(fileData);
      }

      users.push(data);

      fs.writeFile("./db/users.json", JSON.stringify(users, null, 1), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        res.status(201).json({ message: "created" });
      });
    });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.delete("/users/exclude", (req, res) => {
  const { email } = req.body;

  fs.readFile("./db/users.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).json({ message: "error" });
    }

    if (data) {
      const users = JSON.parse(data);
      const userPosition = users.findIndex((user) => user.email == email);
      users.splice(userPosition);

      const newUsersList = users;

      fs.writeFile(
        "./db/users.json",
        JSON.stringify(newUsersList, null, 1),
        (err) => {
          if (err) throw err;

          res.status(200).json({ message: "excluded" });
        }
      );
    }
  });
});

app.listen(5000, () => console.log("Server is running on port 5000"));
