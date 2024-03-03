// Importaciones necesarias de Angular, Ionic, Firebase y otras librerías.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // Módulo principal para aplicaciones web.
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'; // Módulo de Ionic para usar sus componentes y estrategias de navegación.
import { RouteReuseStrategy } from '@angular/router'; // Estrategia de reutilización de rutas de Angular.
import { AppComponent } from './app.component'; // Componente raíz de la aplicación.
import { AppRoutingModule } from './app-routing.module'; // Módulo de enrutamiento de la aplicación.

// Configuración de Firebase y AngularFire.
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../environments/firebase-config'; // Configuración de Firebase.

import { HttpClientModule } from '@angular/common/http'; // Módulo para realizar peticiones HTTP.
// Componentes personalizados de la aplicación.
import { VoiceRecognitionModalComponent } from './components/voice-recognition-modal/voice-recognition-modal.component';
import { MoodSelectorComponent } from './components/mood-selector/mood-selector.component';
import { HistorialModalComponent } from './components/historial-modal-component/historial-modal-component.component';

import { IonicStorageModule } from '@ionic/storage-angular'; // Módulo para almacenamiento local usando Ionic Storage.

// Decorador @NgModule que define este archivo como un módulo Angular.
@NgModule({
  declarations: [
    // Componentes declarados en este módulo.
    AppComponent,
    VoiceRecognitionModalComponent,
    MoodSelectorComponent,
    HistorialModalComponent,
  ],
  imports: [
    // Módulos importados.
    BrowserModule, // Proporciona servicios críticos para ejecutar aplicaciones en el navegador.
    IonicModule.forRoot({ mode:'md'}), // Inicializa Ionic con configuración específica. 'md' fuerza el estilo de Material Design.
    AppRoutingModule, // Configuración de rutas de la aplicación.
    HttpClientModule, // Permite hacer peticiones HTTP a APIs externas.
    provideFirebaseApp(() => initializeApp(firebaseConfig)), // Inicializa Firebase con la configuración específica.
    provideAuth(() => getAuth()), // Proporciona el servicio de autenticación de Firebase.
    IonicStorageModule.forRoot(), // Configura Ionic Storage para el almacenamiento local.
  ],
  providers: [
    // Servicios y estrategias proporcionados a la aplicación.
    {
      provide: RouteReuseStrategy, // Define la estrategia de reutilización de rutas.
      useClass: IonicRouteStrategy // Usa la estrategia de Ionic para la gestión de navegación y vistas.
    },
  ],
  bootstrap: [AppComponent] // Componente raíz que se inicia al lanzar la aplicación.
})
export class AppModule {}