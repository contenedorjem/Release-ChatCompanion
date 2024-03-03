// Importaciones necesarias de Angular y servicios personalizados.
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importación del guardián de autenticación.

// Definición de rutas de la aplicación. Cada ruta determina un componente o módulo a cargar.
const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', // Redirige la ruta raíz a 'login'.
    pathMatch: 'full' // Asegura que toda la URL debe coincidir.
  },
  {
    path: 'login',
    // Carga diferida (lazy loading) del módulo de login para mejorar la eficiencia.
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    // Carga diferida del módulo de registro.
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'home',
    // Carga diferida del módulo de la página de inicio.
    loadChildren: () => import('../app/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard] // Utiliza AuthGuard para proteger la ruta, asegurando que el usuario esté autenticado.
  },
  {
    path: 'password-reset',
    // Carga diferida del módulo para restablecimiento de contraseña.
    loadChildren: () => import('./pages/password-reset/password-reset.module').then( m => m.PasswordResetPageModule)
  },
];

// Decorador @NgModule que marca esta clase como un módulo Angular.
@NgModule({
  imports: [
    // Configura el enrutador de Angular para usar las rutas definidas y la estrategia de precarga.
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule], // Exporta RouterModule para hacerlo accesible en otros módulos de la aplicación.
})
export class AppRoutingModule {}