import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { CdbService } from './cdb.service';
import { CdbRequest, CdbResponse } from './models/cdb.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cálculo de Investimento CDB';
  
  request: CdbRequest = { valorInicial: 0.01, prazoEmMeses: 2 };
  response: CdbResponse | null = null;
  errorMessage: string | null = null;
  loading: boolean = false;
  
  private cdbService = inject(CdbService);

 
  calcularCDB(): void {
    this.errorMessage = null;
    this.response = null;
    
    if (this.request.valorInicial <= 0) {
      this.errorMessage = 'O valor inicial deve ser positivo.';
      return;
    }
        
    if (this.request.prazoEmMeses < 2) { 
      this.errorMessage = 'O prazo em meses deve ser maior que 1 (mínimo 2 meses).';
      return;
    }

    this.loading = true;
    this.cdbService.calcularCDB(this.request)
      .subscribe({
        next: (res) => {
          this.response = res;
          this.loading = false;
        },
        error: (err) => {    
          if (err.error && typeof err.error === 'object') {             
             const errors = Object.values(err.error.errors).flat();
             this.errorMessage = errors.join('; ');
          } else {
             this.errorMessage = 'Erro ao calcular CDB. Verifique a conexão com a API.';
          }
          this.loading = false;
        }
      });
  }

  
  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  }
}