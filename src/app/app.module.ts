import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importaciones de Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../environments/firebase-config';

import { HttpClientModule } from '@angular/common/http';
import { VoiceRecognitionModalComponent } from './components/voice-recognition-modal/voice-recognition-modal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
@NgModule({
  declarations: [
    AppComponent,
    VoiceRecognitionModalComponent,
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode:'md'}),
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
     },
    provideAnimationsAsync()],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}