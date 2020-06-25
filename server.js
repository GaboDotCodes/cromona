const express = require('express');
const app = express();

const { PORT } = process.env;
const { log } = console;


app.listen(PORT, () => {
    log(`Server on http://localhost:${PORT}`)
})