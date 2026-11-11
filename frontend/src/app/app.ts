import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SaludoService } from './saludo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly saludoService = inject(SaludoService);

  protected readonly cargando = signal(true);
  protected readonly mensaje = signal<string | null>(null);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.cargar();
  }

  protected cargar(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.saludoService.obtenerSaludo().subscribe({
      next: (texto) => {
        this.mensaje.set(texto);
        this.cargando.set(false);
      },
      error: (err: unknown) => {
        this.mensaje.set(null);
        this.error.set(this.mensajeDeError(err));
        this.cargando.set(false);
      },
    });
  }

  private mensajeDeError(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        return 'No hay conexión con Spring Boot en http://localhost:8080.';
      }
      return `Spring Boot respondió con error ${err.status}.`;
    }
    return 'No se pudo obtener el saludo.';
  }
}
