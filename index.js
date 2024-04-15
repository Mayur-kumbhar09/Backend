import express from'express'
import bodyParser from 'body-parser'
import axios from 'axios';

const app = express();

// Middleware
app.use(bodyParser.json());
let responses = {};



// Define routes
app.get('/studies', async (req, res) => {
    try {
        const response = await axios.get('https://my-json-server.typicode.com/pratik4488/screener/study');
        const studies = response.data;
        res.json(studies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/study/:id/description', async (req, res) => {
    try {
        const response = await axios.get(`https://my-json-server.typicode.com/pratik4488/screener/study/${req.params.id}`);
        const study = response.data;
        if (!study) {
            return res.status(404).json({ error: 'Study not found' });
        }
        res.json({ description: study.description });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/study/:id/screener', async (req, res) => {
    try {
        const response = await axios.get(`https://my-json-server.typicode.com/pratik4488/screener/study/${req.params.id}`);
        const study = response.data;
        if (!study) {
            return res.status(404).json({ error: 'Study not found' });
        }
        const firstQuestion = study.screeners[0];
        res.json({ question: firstQuestion });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Similar logic for other routes...


app.get('/study/:id/question/:index', async (req, res) => {
    try {
        const response = await axios.get(`https://my-json-server.typicode.com/pratik4488/screener/study/${req.params.id}`);
        const study = response.data;
        if (!study) {
            return res.status(404).json({ error: 'Study not found' });
        }
        const index = parseInt(req.params.index);
        if (index < 0 || index >= study.screeners.length) {
            return res.status(404).json({ error: 'Question not found' });
        }
        const question = study.screeners[index];
        res.json({ question });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/study/:id/response', async (req, res) => {
    try {
        // Capture and validate user response
        const studyId = req.params.id;
        const response = req.body.response;
        // Here you would typically handle the response data, but since we're using a JSON server, we won't actually store the response
        res.json({ message: 'Response captured successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/study/:id/complete', async (req, res) => {
    try {
        // Mark screener completion and store responses
        const studyId = req.params.id;
        res.send(studyId)
        res.json({ message: 'Screener completed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});