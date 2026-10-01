import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());

let messages = [
    {
        user: "John",
        message: "Hello"
    },
    {
        user: "Jane",
        message: "Hi"
    }
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/api/v1/messages", (req, res) => {
    const username = req.query.user;

    let resultMessages = messages;

    if (username) {
        resultMessages = messages.filter(message => message.user === username);
    }

    const result = {
        status: "success",
        message: "GETTING MESSAGES",
        data: {
            messages: resultMessages
        }
    };

    res.json(result);
});

app.get("/api/v1/messages/:id", (req, res) => {
    const id = req.params.id;
    const message = messages[id];

    if (!message) {
        return res.status(404).json({
            status: "fail",
            data: {
                message: "Message not found"
            }
        });
    }

    const result = {
        status: "success",
        message: `GETTING messages ${id}`,
        data: {
            messages: [message]
        }
    };

    res.json(result);
});

app.post("/api/v1/messages", (req, res) => {
    const message = req.body.message;

    messages.push(message);

    const result = {
        status: "success",
        message: "Message saved",
        data: {
            message: message
        }
    };

    res.json(result);
});;

app.put("/api/v1/messages/:id", (req, res) => {
    const id = req.params.id;
    const message = messages[id];

    message.text = req.body.message.text;

    const result = {
        status: "success",
        message: "Message updated",
        data: {
            message: message
        }
    };

    res.json(result);
});

app.delete("/api/v1/messages/:id", (req, res) => {
    const id = req.params.id;

    messages.splice(id, 1);

    const result = {
        status: "success",
        message: "Message deleted"
    };

    res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
