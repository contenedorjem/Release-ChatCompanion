// Importación necesaria de Angular para crear un servicio inyectable.
import { Injectable } from '@angular/core';
// Importación del plugin TextToSpeech de la comunidad de Capacitor.
import { TextToSpeech } from '@capacitor-community/text-to-speech';

// Decorador Injectable que marca la clase como un servicio que puede ser inyectado, con ámbito en toda la aplicación.
@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  // Constructor del servicio. No se inyectan dependencias en este caso.
  constructor() { }

  // Método asincrónico speak para convertir texto en habla. Retorna una promesa que se resuelve sin valor.
  async speak(text: string): Promise<void> {
    try {
      // Llamada al método speak del plugin TextToSpeech, pasando un objeto con las opciones deseadas.
      await TextToSpeech.speak({
        text: text, // Texto a convertir en voz.
        lang: 'es-ES', // Código del idioma para la voz (español de España en este caso).
        rate: 1.0, // Velocidad de la voz. 1.0 es la velocidad normal.
        pitch: 1.0, // Tono de la voz. 1.0 es el tono normal.
        volume: 1.0, // Volumen de la voz. 1.0 es el volumen máximo.
      });
    } catch (e) {
      // Captura y registro de errores en caso de fallo al convertir el texto en habla.
      console.error("Error al usar TTS:", e);
    }
  }
}