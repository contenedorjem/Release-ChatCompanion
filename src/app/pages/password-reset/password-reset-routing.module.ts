// Importaciones necesarias de Angular para definir un módulo y configurar rutas.
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Importación del componente PasswordResetPage, que es la página para restablecer la contraseña.
import { PasswordResetPage } from './password-reset.page';

// Definición de las rutas para este módulo. En este caso, se define una única ruta.
const routes: Routes = [
  {
    path: '', // Define el path como una cadena vacía, lo que indica que esta es la ruta predeterminada del módulo.
    component: PasswordResetPage // Asocia el componente PasswordResetPage a esta ruta.
  }
];

// Decorador @NgModule que marca esta clase como un módulo Angular.
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa RouterModule y registra las rutas definidas como rutas hijas.
  exports: [RouterModule], // Exporta RouterModule para que las rutas estén disponibles en el resto de la aplicación.
})
export class PasswordResetPageRoutingModule {}