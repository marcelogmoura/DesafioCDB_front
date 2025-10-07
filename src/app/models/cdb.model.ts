/**
 * Interface para a requisição de cálculo do CDB (Input da API)
 */
export interface CdbRequest {
  valorInicial: number;
  prazoEmMeses: number;
}

/**
 * Interface para a resposta do cálculo do CDB (Output da API)
 */
export interface CdbResponse {
  resultadoBruto: number;
  resultadoLiquido: number;
}