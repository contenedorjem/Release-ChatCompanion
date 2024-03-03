// Importaciones de Angular necesarias para crear un módulo de enrutamiento
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

// Definición de las rutas para este módulo. En este caso, solo se define una ruta.
const routes: Routes = [
  {
    path: '', // La ruta de la URL. Una cadena vacía indica que esta es la ruta raíz o de inicio.
    component: HomePage, // El componente que se debe cargar cuando se navega a esta ruta.
  }
];

// Decorador @NgModule que marca esta clase como un módulo de Angular.
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa el RouterModule y le añade las rutas definidas anteriormente como rutas hijas.
  exports: [RouterModule] // Exporta RouterModule para que las rutas estén disponibles en el resto de la aplicación.
})
export class HomePageRoutingModule {}