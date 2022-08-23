"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const middleWare = express_1.default.json();
app.use(middleWare);
const db = {
    lib: [
        { id: 1, title: 'react js' },
        { id: 2, title: 'vue' },
        { id: 3, title: 'angular' },
        { id: 4, title: 'vue' },
        { id: 5, title: 'redux js' },
        { id: 6, title: 'svetle' },
    ],
};
app.get('/api', (req, res) => {
    let found = db.lib;
    if (req.query.title) {
        found = found.filter((obj) => obj.title.indexOf(req.query.title) > -1);
    }
    res.json(found);
});
app.get('/api/:id', (req, res) => {
    const find = db.lib.find((obj) => obj.id === +req.params.id);
    if (!find) {
        res.sendStatus(404);
        return;
    }
    res.json(find);
});
app.post('/api', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const createLib = {
        id: +new Date(),
        title: req.body.title,
    };
    db.lib.push(createLib);
    res.json(createLib);
});
app.delete('/api/:id', (req, res) => {
    db.lib = db.lib.filter((obj) => obj.id !== +req.params.id);
    res.sendStatus(204);
});
app.put('/api/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const find = db.lib.find((obj) => obj.id === +req.params.id);
    if (!find) {
        res.sendStatus(404);
        return;
    }
    find.title = req.body.title;
    res.json(find);
});
app.listen(port, () => {
    console.log(`listen on ${port}`);
});
