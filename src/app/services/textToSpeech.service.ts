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
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
      });
    } catch (e) {
      console.error("Error al usar TTS:", e);
    }
  }
}