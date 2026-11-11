import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const SALUDO_URL = 'http://localhost:8080/api/saludo';

@Injectable({ providedIn: 'root' })
export class SaludoService {
  private readonly http = inject(HttpClient);

  obtenerSaludo(): Observable<string> {
    return this.http.get(SALUDO_URL, { responseType: 'text' });
  }
}
