import express from 'express';

const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/api/v1/messages", (req, res) => {
    const result = {
        'status': 'success',
        'data': {
            'messages': messages
        }
    };

    res.json(result);
});

app.get("/api/v1/messages/:id", (req, res) => {
    res.send("GET message with ID: " + req.params.id);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
