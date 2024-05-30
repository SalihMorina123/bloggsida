const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware för att hantera POST-data
app.use(bodyParser.urlencoded({ extended: true }));

// Statiska filer (som CSS)
app.use(express.static('public'));

// Använd EJS som templating engine
app.set('view engine', 'ejs');

//data för att simulera en databas
let posts = [];

// Hem
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// Visa enskilt inlägg
app.get('/post/:id', (req, res) => {
    const post = posts[req.params.id];
    if (post) {
        res.render('post', { post });
    } else {
        res.status(404).send('Inlägg hittades inte');
    }
});

// Skapa inlägg
app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.redirect('/');
});

// Redigera inlägg
app.get('/edit/:id', (req, res) => {
    const post = posts[req.params.id];
    if (post) {
        res.render('edit', { id: req.params.id, post });
    } else {
        res.status(404).send('Inlägg hittades inte');
    }
});

app.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    posts[req.params.id] = { title, content };
    res.redirect('/');
});

// Ta bort inlägg
app.post('/delete/:id', (req, res) => {
    posts.splice(req.params.id, 1);
    res.redirect('/');
});

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servern kör på port ${PORT}`);
});
