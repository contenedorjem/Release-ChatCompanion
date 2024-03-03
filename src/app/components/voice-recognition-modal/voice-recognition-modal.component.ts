import { Component, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VoiceRecognitionService } from 'src/app/services/voiceRecognition.service';
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
    private voiceRecognitionService: VoiceRecognitionService) {}

  ngOnDestroy() {
    this.voiceRecognitionService.stopListening();
  }

  startListening() {
    this.isListening = true;
    this.voiceRecognitionService.startListening(transcript => {
      this.transcript = transcript;
      this.isListening = false;
      this.changeDetectorRef.detectChanges();
    });
  }

  stopListening() {
    this.voiceRecognitionService.stopListening();
  }

  sendTranscript() {
    console.log('Transcript to send:', this.transcript);
    this.modalCtrl.dismiss({ transcript: this.transcript });
  }
}



/*GUARDAMOS ESTE CODIGO EN CASO DE NECESITAR DEL WEB SPEECH QUE ES UN RECONOCIMIENTO DE VOZ PARA NAVEGADOR*/
// import { Component, OnDestroy } from '@angular/core';
// import { ModalController } from '@ionic/angular';
// import { WebSpeechService } from 'src/app/services/webSpeech.service';
// import { ChangeDetectorRef } from '@angular/core';

// @Component({
//   selector: 'app-voice-recognition-modal',
//   templateUrl: './voice-recognition-modal.component.html',
//   styleUrls: ['./voice-recognition-modal.component.scss'],
// })
// export class VoiceRecognitionModalComponent implements OnDestroy {
//   transcript = '';
//   isListening = false;

//   constructor(
//     private changeDetectorRef: ChangeDetectorRef,
//     private modalCtrl: ModalController,
//     private webSpeechService: WebSpeechService) {}

//   ngOnDestroy() {
//     this.stopListening();
//   }

//   startListening() {
//     this.isListening = true;
//     this.webSpeechService.startListening();
//     this.webSpeechService.onResult((event: any) => this.handleResult(event));
//   }

//   stopListening() {
//     this.isListening = false;
//     this.webSpeechService.stopListening();
//   }

//   handleResult(event: any) {
//     let interimTranscript = '';
//     for (let i = event.resultIndex; i < event.results.length; ++i) {
//       if (event.results[i].isFinal) {
//         this.transcript += event.results[i][0].transcript + ' ';
//       } else {
//         interimTranscript += event.results[i][0].transcript;
//       }
//     }
//     this.transcript += interimTranscript;
//   }

  
//   sendTranscript() {
//     this.modalCtrl.dismiss({ transcript: this.transcript });
//   }
// }