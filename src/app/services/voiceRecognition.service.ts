import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  constructor() { }

  async startListening(): Promise<string> {
    let result = '';
    try {
      const available = await SpeechRecognition.available();
      if (available) {
        // Ajusta las opciones directamente aquí si SpeechRecognitionListeningOptions no está disponible
        const options = {
          language: 'es-ES', // Configuración estándar en español
          maxResults: 1, // Número máximo de resultados de reconocimiento
          prompt: 'Habla ahora', // Mensaje de prompt para el usuario
          partialResults: false, // Obtener resultados parciales
          popup: true // Mostrar popup de reconocimiento
        };
        const { matches } = await SpeechRecognition.start(options);
        result = matches[0] || '';
      }
    } catch (e) {
      console.error("Error al usar reconocimiento de voz:", e);
    }
    return result;
  }
}
