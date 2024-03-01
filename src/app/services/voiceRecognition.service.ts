import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { SpeechRecognition } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {
  isListening = false;

  constructor() {
    this.requestPermission();
  }

  async requestPermission(): Promise<void> {
    try {
      await SpeechRecognition['requestPermission']();
    } catch (e: any) { // Tipo explícito any para el parámetro e
      console.error('Error requesting speech recognition permission:', e);
    }
  }

  startListening(callback: (transcript: string) => void): void {
    this.isListening = true;
    SpeechRecognition['start']({
      language: 'es-ES',
      maxResults: 1,
      prompt: 'Habla ahora...',
      partialResults: false // Cambiado a false para obtener solo resultados finales
    }).then((result: any) => { // Tipo explícito any para el parámetro result
      this.isListening = false;
      callback(result.matches[0]);
    }).catch((e: any) => { // Tipo explícito any para el parámetro e
      this.isListening = false;
      console.error('Error during speech recognition:', e);
    });
  }

  stopListening(): void {
    if (this.isListening) {
      SpeechRecognition['stop']();
      this.isListening = false;
    }
  }
}