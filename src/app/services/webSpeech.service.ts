//SERVICIO ACTUALMENTE NO IMPLEMENTADO, SE IMPLEMENTA PARA PRUEBAS EN NAVEGADOR
// Importación necesaria de Angular para crear un servicio inyectable.
import { Injectable } from '@angular/core';

// Extensión de la interfaz Window para incluir la propiedad webkitSpeechRecognition.
interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

// Declaración para extender el objeto window global con la interfaz extendida.
declare var window: IWindow;

// Decorador Injectable para permitir que este servicio sea inyectado en otros componentes o servicios.
@Injectable({
  providedIn: 'root' // Indica que el servicio está disponible en el inyector raíz y puede ser usado en toda la aplicación.
})
export class WebSpeechService {
  // Inicialización de la API de reconocimiento de voz del navegador.
  recognition = new window.webkitSpeechRecognition();
  
  constructor() {
    this.recognition.continuous = true; // Configura el reconocimiento de voz para que sea continuo.
    this.recognition.lang = 'es-ES'; // Establece el idioma del reconocimiento de voz a español de España.
  }

  // Método para iniciar el reconocimiento de voz.
  startListening(): void {
    this.recognition.start(); // Inicia el reconocimiento de voz.
  }

  // Método para detener el reconocimiento de voz.
  stopListening(): void {
    this.recognition.stop(); // Detiene el reconocimiento de voz.
  }

  // Método para manejar los resultados del reconocimiento de voz.
  // Recibe un callback que se ejecutará con el evento de resultado.
  onResult(callback: (event: any) => void): void {
    this.recognition.onresult = callback;
  }

  // Método para manejar los errores del reconocimiento de voz.
  // Recibe un callback que se ejecutará con el evento de error.
  onError(callback: (event: any) => void): void {
    this.recognition.onerror = callback;
  }
}