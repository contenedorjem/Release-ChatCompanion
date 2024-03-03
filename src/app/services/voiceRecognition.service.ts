// Importación de Angular core y Capacitor core para el servicio.
import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { SpeechRecognition } = Plugins;

// Decorador que marca la clase como un servicio que puede ser inyectado. 'providedIn: root' indica que el servicio está disponible globalmente.
@Injectable({
  providedIn: 'root' 
})
export class VoiceRecognitionService {
  isListening = false; // Bandera de escucha

  constructor() {
    this.requestPermission(); // Llama al método para solicitar permisos de reconocimiento de voz al usuario.
  }

  // Método asincrónico para solicitar permisos de reconocimiento de voz al usuario.
  async requestPermission(): Promise<void> {
    try {
      await SpeechRecognition['requestPermission'](); 
    } catch (e: any) {
      console.error('Error requesting speech recognition permission:', e); 
    }
  }

  // Método para iniciar el reconocimiento de voz.
  startListening(callback: (transcript: string) => void): void {
    this.isListening = true;
    SpeechRecognition['start']({
      language: 'es-ES', // Código del idioma para la voz.
      maxResults: 1, // Cantidad de resultados que se devolverá.
      prompt: 'Habla ahora...', // Mensaje que se mostrará antes de comenzar el reconocimiento de voz.
      partialResults: false // Indica si se devolverá la transcripción parcial o completa.
    }).then((result: any) => { 
      this.isListening = false; // Restablece la bandera de escucha
      callback(result.matches[0]); // Llama a la función callback con el resultado
    }).catch((e: any) => {
      this.isListening = false; // Restablece la bandera de escucha en caso de error
      console.error('Error during speech recognition:', e); 
    });
  }

  // Método para detener el reconocimiento de voz.
  stopListening(): void {
    if (this.isListening) {
      SpeechRecognition['stop'](); 
      this.isListening = false;
    }
  }
}