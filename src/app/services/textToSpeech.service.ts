import { Injectable } from '@angular/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  constructor() { }

  async speak(text: string): Promise<void> {
    try {
      await TextToSpeech.speak({
        text: text,
        lang: 'es-ES',
        //lang: 'default', // Configuración estándar en español
        rate: 1.0, // Velocidad de la voz
        pitch: 1.0, // Tono de la voz
        volume: 1.0, // Volumen
        //voice: 2.0,
      });
    } catch (e) {
      console.error("Error al usar TTS:", e);
    }
  }
}