// Importaciones de Angular y Ionic necesarias para el componente, así como el servicio de reconocimiento de voz.
import { Component, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';
import { VoiceRecognitionService } from 'src/app/services/voiceRecognition.service';

// Decorador @Component que define cómo Angular debe procesar la clase.
@Component({
  selector: 'app-voice-recognition-modal', // Selector CSS para usar este componente
  templateUrl: './voice-recognition-modal.component.html', // Plantilla HTML del componente
  styleUrls: ['./voice-recognition-modal.component.scss'], // Estilos específicos del componente
})
export class VoiceRecognitionModalComponent implements OnDestroy {
  transcript = ''; // Variable para almacenar el texto reconocido
  isListening = false; // Bandera para indicar si el servicio de reconocimiento de voz está activo

  // Constructor del componente, inyecta dependencias necesarias.
  constructor(
    private changeDetectorRef: ChangeDetectorRef, // Detecta cambios para actualizar la vista
    private modalCtrl: ModalController, // Controla los modales de Ionic
    private voiceRecognitionService: VoiceRecognitionService // Servicio personalizado de reconocimiento de voz
  ) {}

  // Método ngOnDestroy se llama automáticamente cuando el componente se destruye.
  ngOnDestroy() {
    this.voiceRecognitionService.stopListening(); // Detiene el reconocimiento de voz al salir
  }

  // Inicia el servicio de reconocimiento de voz.
  startListening() {
    this.isListening = true; // Establece la bandera de escucha a verdadero
    this.voiceRecognitionService.startListening(transcript => {
      this.transcript = transcript; // Actualiza el texto reconocido
      this.isListening = false; // Restablece la bandera de escucha
      this.changeDetectorRef.detectChanges(); // Detecta cambios para actualizar la vista
    });
  }

  // Detiene el servicio de reconocimiento de voz.
  stopListening() {
    this.voiceRecognitionService.stopListening();
    this.isListening = false; // Restablece la bandera de escucha
  }

  // Método para enviar el texto reconocido.
  sendTranscript() {
    console.log('Transcript to send:', this.transcript); // Muestra el texto en la consola
    this.modalCtrl.dismiss({ transcript: this.transcript }); // Cierra el modal y pasa el texto reconocido
  }
}