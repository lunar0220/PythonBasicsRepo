const express = require("express");
const crypto = require("crypto");
const app = express();

const users = [];

app.use(express.json());
app.use(express.static("public"));

app.get("/api/users", async(req, resp) => resp.send(users));
app.get("/api/users/:id", async(req, resp) => {
    const id = req.params.id;
    const user = users.find(u => u.id == id);
    if(user) resp.send(user);
    else resp.sendStatus(404);
});

app.post("/api/users", async(req, resp) => {
    if(!req.body) return resp.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    const user = {
        id: crypto.randomUUID(),
        name: userName,
        age: userAge
    };

    users.push(user);
    resp.send(user);
});

app.delete("/api/users/:id", async(req, resp) => {
    const id = req.params.id;
    let idx = users.findIndex(u => u.id == id);
    if(idx > -1) {
        const user = users.splice(idx, 1)[0];
        resp.send(user);
    } else {
        resp.status(404).send("Пользователь не найден");
    }
});

app.put("/api/users", async(req, resp) => {
    if(!req.body) return resp.sendStatus(400);

    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;

    const idx = users.findIndex(u => u.id == id);
    if(idx > -1) {
        const user = users[idx];
        user.age = userAge;
        user.name = userName;
        resp.send(user);
    } else {
        resp.status(404).send("Пользователь не найден");
    }
});


app.listen(5000, () => {
    console.log("Сервер запущен....")
});
