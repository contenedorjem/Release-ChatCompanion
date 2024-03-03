// Importar los módulos necesarios
import express from "express"; // Para crear el servidor
import cors from 'cors'; // Para habilitar el uso compartido de recursos entre orígenes (CORS)
import * as dotenv from 'dotenv'; // Para cargar las variables de entorno desde un archivo .env
import { Configuration, OpenAIApi } from 'openai'; // Para interactuar con la API de OpenAI

// Cargar las variables de entorno
dotenv.config();

// Configurar la API de OpenAI con la clave de API de las variables de entorno
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Inicializar el cliente de la API de OpenAI con la configuración proporcionada
const openai = new OpenAIApi(configuration);

// Crear una aplicación de Express
const app = express();
app.use(cors()); // Usar CORS para permitir solicitudes de origen cruzado
app.use(express.json()); // Analizar los cuerpos de las solicitudes JSON

// Definir una ruta GET para la ruta raíz
app.get('/', async (req, res) => {
    // Enviar una respuesta 200 OK con un mensaje de bienvenida
    res.status(200).send({ message: "Servidor GURB activo y funcionando" });
});

// Definir una ruta POST para la ruta raíz
app.post('/', async (req, res) => {
    try {
        // Desestructurar y renombrar 'promt' a 'prompt' del cuerpo de la solicitud
        const { promt: prompt } = req.body;
        // Crear una respuesta de chat con el prompt proporcionado
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", // Especificar el modelo a usar
            messages: [{
                role: "user",
                content: prompt // Mensaje del usuario al modelo
            }],
            temperature: 1, // Creatividad de la respuesta
            max_tokens: 256, // Longitud máxima de la respuesta
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        
        // Enviar una respuesta 200 OK con el mensaje generado
        res.status(200).send({
            bot: response.data.choices[0].message.content
        });
    } catch (error) {
        // Registrar y devolver cualquier error encontrado durante la solicitud
        console.error(error);
        res.status(500).send({ message: "Error", error: error.message });
    }
});

// Iniciar el servidor en el puerto 3000 (SOLO LOCALHOST)
app.listen(3000, () => console.log('Servidor funcionando en el puerto http://localhost:3000'));