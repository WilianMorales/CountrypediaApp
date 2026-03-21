import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error404-page',
  imports: [RouterLink],
  template: `
    <div class="flex min-h-[100vh] flex-col items-center justify-center px-4 text-center">
      <div class="relative mb-6 select-none">
        <span class="text-[10rem] font-black leading-none text-slate-100 md:text-[14rem]">404</span>
      </div>

      <div class="mb-8 max-w-md">
        <h1 class="mb-3 text-2xl font-bold text-slate-700 md:text-3xl">
          Página no encontrada
        </h1>
        <p class="text-slate-400">
          La ruta que intentas visitar no existe o fue eliminada.
          Verifica la URL o regresa a la pagina de inicio.
        </p>
      </div>

      <div class="mb-8 flex items-center gap-3 text-slate-300">
        <div class="h-px w-16 bg-slate-200"></div>
        <i class="fa-solid fa-compass text-amber-400"></i>
        <div class="h-px w-16 bg-slate-200"></div>
      </div>

      <div class="flex flex-col gap-3 sm:flex-row">
        <a
          routerLink="/"
          class="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-amber-600">
          <i class="fa-solid fa-house text-sm"></i>
          Ir al inicio
        </a>
      </div>
    </div>
  `,
})
export class Error404PageComponent {

}
