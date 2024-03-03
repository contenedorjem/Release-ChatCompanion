// Importaciones de módulos de Angular y Ionic necesarios para el funcionamiento de este módulo
import { NgModule } from '@angular/core'; // Core de Angular, necesario para definir un módulo con @NgModule
import { CommonModule } from '@angular/common'; // Proporciona directivas básicas de Angular y servicios como ngIf y ngFor
import { IonicModule } from '@ionic/angular'; // Módulo de Ionic que permite usar componentes de Ionic en este módulo
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Permiten trabajar con formularios en Angular, tanto template-driven (FormsModule) como reactive forms (ReactiveFormsModule)
import { HomePage } from './home.page'; // El componente de la página de inicio que este módulo va a declarar y utilizar

// Importación del módulo de enrutamiento específico para la página de inicio
import { HomePageRoutingModule } from './home-routing.module';

// Decorador @NgModule que marca esta clase como un módulo de Angular
@NgModule({
  imports: [
    CommonModule, // Importa las funcionalidades comunes de Angular (como ngIf, ngFor, etc.)
    FormsModule, // Permite trabajar con formularios template-driven
    IonicModule, // Habilita los componentes de Ionic en este módulo
    HomePageRoutingModule, // Importa las rutas específicas definidas para la página de inicio
    ReactiveFormsModule, // Permite trabajar con formularios reactivos
  ],
  declarations: [HomePage] // Declara que HomePage es un componente de este módulo, lo que significa que este módulo conoce a HomePage y puede crear instancias de él
})
export class HomePageModule {}