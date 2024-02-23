import express from "express";
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({ message: "Hello World" });
});

app.post('/', async (req, res) => {
    try {
        // Asumiendo que el cuerpo de la petición tiene una propiedad llamada 'promt'
        const { promt: prompt } = req.body; // Renombrar la propiedad 'promt' a 'prompt'
          const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: prompt
            }],
            temperature: 1,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        
        res.status(200).send({
            bot: response.data.choices[0].message.content
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error", error: error.message });
    }
});

app.listen(3000, () => console.log('Server is running on port http://localhost:3000'));