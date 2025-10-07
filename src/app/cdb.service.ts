import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { CdbRequest, CdbResponse } from './models/cdb.model';

@Injectable({
  providedIn: 'root'
})
export class CdbService {
    
  private apiUrl = 'http://localhost:5140/api/Cdb/calcular'; 
  
  private http = inject(HttpClient);

  
  calcularCDB(request: CdbRequest): Observable<CdbResponse> {  
    return this.http.post<CdbResponse>(this.apiUrl, request);
  }
}