import { Component, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WebSpeechService } from 'src/app/services/webSpeech.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-voice-recognition-modal',
  templateUrl: './voice-recognition-modal.component.html',
  styleUrls: ['./voice-recognition-modal.component.scss'],
})
export class VoiceRecognitionModalComponent implements OnDestroy {
  transcript = '';
  isListening = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private modalCtrl: ModalController,
    private webSpeechService: WebSpeechService) {}

  ngOnDestroy() {
    this.stopListening();
  }

  startListening() {
    this.isListening = true;
    this.webSpeechService.startListening();
    this.webSpeechService.onResult((event: any) => this.handleResult(event));
  }

  stopListening() {
    this.isListening = false;
    this.webSpeechService.stopListening();
  }

  handleResult(event: any) {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        this.transcript += event.results[i][0].transcript + ' ';
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }
    this.transcript += interimTranscript;
  }

  
  sendTranscript() {
    this.modalCtrl.dismiss({ transcript: this.transcript });
  }
}
