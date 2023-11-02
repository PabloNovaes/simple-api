import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, "..", "db", "users.json");

export class UserController {
  async create(req, res) {
    const { email, password } = req.body;
    const data = { email, password };
    try {
      fs.readFile(filePath, "utf8", (err, fileData) => {
        if (err) {
          res.status(400).json({ message: "error!" });
        }
        let users = [];
        users = JSON.parse(fileData);
        users.push(data);
        fs.writeFile(filePath, JSON.stringify(users, null, 1), (err) => {
          if (err) {
            return res.status(400).json({ message: "error!" });
          }
          res.status(201).json({ message: "created" });
        });
      });
    } catch (error) {
      res.status(400).json({ message: "error" });
    }
  }

  async read(req, res) {
    try {
      fs.readFile(filePath, "utf-8", (err, data) => {
        res.status(200).send(JSON.stringify(data));
      });
    } catch (error) {
      return res.status(400).json({ message: "error" });
    }
  }

  async update(req, res) {
    try {
      const { password, email, newPassword } = req.body;

      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          return res.status(400).json({ message: "error!" });
        }

        const users = [...JSON.parse(data)];
        const userPosition = users.findIndex((user) => {
          if (user.email === email) return user;
        });

        if (users[userPosition].password !== password) {
          return res.status(400).json({ message: "senha incorreta!" });
        }

        users[userPosition].password = newPassword;

        fs.writeFile(filePath, JSON.stringify(users, null, 1), (err) => {
          if (err) throw err;
          res.status(200).json({ message: "updated!" });
        });
      });
    } catch (error) {
      return res.status(400).json({ message: "Ocorreu um erro insesperado!" });
    }
  }

  async delete(req, res) {
    const { email } = req.body;

    try {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          res.status(400).json({ message: "error" });
        }

        if (data) {
          const users = JSON.parse(data);
          const userPosition = users.findIndex((user) => user.email === email);
          if (users[userPosition] == undefined)
            return res.status(400).json({ message: "Essa conta não existe!" });

          users.splice(userPosition);
          fs.writeFile(filePath, JSON.stringify(users, null, 1), (err) => {
            if (err) throw err;

            res.status(200).json({ message: "Usuário deletado!" });
          });
        }
      });
    } catch (error) {
      return res.status(400).json({ message: "Ocorreu um erro insesperado!" });
    }
  }
}
