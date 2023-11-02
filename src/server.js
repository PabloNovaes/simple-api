import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./app/routes/routes.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
<<<<<<< HEAD
app.use(routes);
=======

app.get("/users", (req, res) => {
  fs.readFile("./db/users.json", "utf-8", (err, data) => {
    if (data) {
      res.status(200).send(JSON.stringify(data));
    } else {
      res.status(400).json({ message: "error" });
    }
  });
});

app.post("/users/create", (req, res) => {
  const { email, password } = req.body.user;
  const data = { email, password };
  try {
    fs.readFile("./db/users.json", "utf8", (err, fileData) => {
      if (err) {
        res.status(400).json({ message: "error!" });
      }

      let users = [];
      users = JSON.parse(fileData);
      users.push(data);

      fs.writeFile("./db/users.json", JSON.stringify(users, null, 1), (err) => {
        if (err) {
          return res.status(400).json({ message: "error!" });
        }
        res.status(201).json({ message: "created" });
      });
    });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.delete("/users/delete", (req, res) => {
  const { email } = req.body;

  fs.readFile("./db/users.json", "utf8", (err, data) => {
    if (err) {
      res.status(400).json({ message: "error" });
    }

    if (data) {
      const users = JSON.parse(data);
      const userPosition = users.findIndex((user) => user.email === email);
      if (users[userPosition] == undefined)
        return res.status(400).json({ message: "Essa conta não existe!" });

      users.splice(userPosition);

      const newUsersList = users;

      fs.writeFile(
        "./db/users.json",
        JSON.stringify(newUsersList, null, 1),
        (err) => {
          if (err) throw err;

          res.status(200).json({ message: "deleted!" });
        }
      );
    }
  });
});
>>>>>>> 6cda46f19b94ee7d443b51ce99c88d927414f8af

app.put("/users/update", (req, res) => {
  const { password, email, newPassword } = req.body;

  fs.readFile("./db/users.json", "utf-8", (err, data) => {
    if (err) {
      return res.status(200).json({ message: "error!" });
    }

    const users = JSON.parse(data);
    const user = users.find((user) => {
      if(user.email === email) return user
    });
    if (user.password !== password) {
      return res.status(200).json({ message: "senha incorreta!" });
    }
    users[userPosition].password = newPassword;
    console.log(users[userPosition].password)

    const newUsersList = users;

    fs.writeFile(
      "./db/users.js",
      JSON.stringify(newUsersList, null, 1),
      (err) => {
        if (err) throw err;
        res.status(200).json({ message: "updated!" });
      }
    );
  });
});

app.listen(5000, () => console.log("Server is running on port 5000"));
