import { Injectable } from '@angular/core';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

declare var window: IWindow;

@Injectable({
  providedIn: 'root'
})
export class WebSpeechService {
  recognition = new window.webkitSpeechRecognition();
  
  constructor() {
    this.recognition.continuous = true;
    this.recognition.lang = 'es-ES';
  }

  startListening(): void {
    this.recognition.start();
  }

  stopListening(): void {
    this.recognition.stop();
  }

  onResult(callback: (event: any) => void): void {
    this.recognition.onresult = callback;
  }

  onError(callback: (event: any) => void): void {
    this.recognition.onerror = callback;
  }
}
