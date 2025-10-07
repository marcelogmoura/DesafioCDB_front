# Desafio Técnico - CDB (Cálculo de Certificado de Depósito Bancário)

![.NET](https://img.shields.io/badge/.NET-9.0-blueviolet)
![C#](https://img.shields.io/badge/C%23-512BD4?style=flat&logo=csharp&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Tests](https://img.shields.io/badge/xUnit-802580?style=flat&logo=xunit&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📜 Documentação
O enunciado original do desafio pode ser encontrado aqui:
[**Desafio de Cálculo de CDB (PDF)**](./Pdf/DesafioCDB.pdf)


## ✨ O backend do projeto se encontra 

[https://github.com/marcelogmoura/DesafioCDB_back](https://github.com/marcelogmoura/DesafioCDB_back)


---

## ✨ Objetivo do Projeto

Este projeto implementa uma solução completa para o cálculo do **Certificado de Depósito Bancário (CDB)**, seguindo os princípios **SOLID**, com alta cobertura de **Testes Unitários** (na camada de negócio) e **Containerização** completa com **Docker Compose**.

A solução é dividida em duas partes: uma Web API em .NET para a lógica de cálculo e um Frontend em Angular para a interface de usuário.


---

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia | Versão/Framework |
| :--- | :--- | :--- |
| **Backend** | **ASP.NET Core** | 9.0 |
| **Linguagem** | **C#** | 12.0 |
| **Frontend** | **Angular** | 19+ (Standalone) |
| **Build Tool (Front)** | **Vite / Esbuild** | - |
| **Testes** | **xUnit** | - |
| **Containerização** | **Docker** e **Docker Compose** | - |
| **Padrões** | **SOLID**, **Clean Architecture** (adaptada), **DTOs** | - |

---

## 🏗️ Arquitetura da Solução

A solução segue um padrão de arquitetura em camadas para garantir a **separação de responsabilidades** e a aderência aos princípios **SOLID**.

| Camada | Projeto | Responsabilidade Principal |
| :--- | :--- | :--- |
| **Frontend** | `DesafioCDB.Web` | Interface de usuário (SPA) desenvolvida em **Angular** para consumir a API. |
| **Application** | `DesafioCDB.API` | Ponto de entrada (Controller), configuração de injeção de dependência e *CORS*. |
| **Domain** | `DesafioCDB.Domain` | Contém a regra de negócio (`CdbService`), DTOs e Interfaces. **É a camada principal de lógica de negócio testada.** |
| **Infra** | `DesafioCDB.Infra` | Camada placeholder para infraestrutura (Banco de Dados, Repositórios, etc.). |
| **Tests** | `DesafioCDB.Tests` | Testes unitários utilizando **xUnit** com alta cobertura na camada de *Domain*. |

---

## 💼 Regra de Negócio (Cálculo do CDB)

O cálculo do rendimento utiliza juros compostos com taxas fixas para o exercício e aplica as alíquotas de Imposto de Renda (IR) de forma regressiva sobre o **lucro** (rendimento bruto - valor inicial).

| Prazo | Alíquota de IR |
| :--- | :--- |
| Até 6 meses | 22.5% |
| De 7 a 12 meses | 20.0% |
| De 13 a 24 meses | 17.5% |
| Acima de 24 meses | 15.0% |

**Parâmetros Fixos:**
* **TB (Taxa do Banco):** 108% (1.08)
* **CDI (Taxa de Referência):** 0.9% (0.009)

---

## 🔗 Endpoints da API

A API expõe um único endpoint para o cálculo:

| Método | Endpoint | Descrição | Parâmetros (JSON Body) |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/cdb/calcular` | Calcula o rendimento do CDB (Bruto e Líquido). | `{ "valorInicial": 1000.0, "prazoEmMeses": 12 }` |

---

## 🚀 Como Executar a Solução (Containerização)

A solução utiliza **Docker Compose** para orquestrar a Web API (.NET Core) e o Frontend (Angular/Nginx), garantindo um ambiente isolado e de fácil inicialização.

### Pré-requisitos

* **Docker Desktop** instalado e em execução.

### Instruções

1.  **Navegue até o Diretório Raiz:** Abra o terminal na raiz da solução (onde o arquivo `docker-compose.yml` está localizado).

2.  **Construa e Suba os Containers:**
    Execute o comando para construir as imagens e iniciar os serviços em modo *detached* (`-d`):

    ```bash
    docker compose up --build -d
    ```

3.  **Acesse a Aplicação:**
    Após a inicialização (que pode levar alguns segundos, dependendo da sua máquina), acesse o Frontend no seu navegador:

    ```
    http://localhost:80
    ```
    A porta `80` expõe o container Nginx com o frontend Angular. Este, por sua vez, se comunica com a API .NET no container `cdb-api`.

4.  **Parar e Remover Containers:**
    Para encerrar a execução e remover os containers e redes:

    ```bash
    docker compose down
    ```

---


## 🖼️ Demonstração Visual (Frontend Angular)

A tela abaixo demonstra a interface simples, desenvolvida em Angular, que recebe o valor inicial e o prazo, e exibe os resultados Bruto e Líquido calculados pela Web API.

![Demonstração do Cálculo de CDB](https://i.postimg.cc/yYHmPW5y/Screenshot-9.jpg)

---



## 💻 Execução Local (Alternativa)

Para rodar os projetos localmente (sem Docker), siga o fluxo padrão:

1.  **Backend (API):**
    * Abra a solução `DesafioCDB.sln` no Visual Studio 2022 ou VS Code.
    * Inicie o projeto `DesafioCDB.API`. A API rodará em `http://localhost:5140`.

2.  **Frontend (Angular):**
    * Navegue até a pasta `DesafioCDB.Web/`.
    * Execute `npm install`.
    * Execute `ng serve --open`. O Frontend rodará em `http://localhost:4200` (padrão Angular CLI) e se comunicará com a API em `http://localhost:5140`.

---

## ⚖️ Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Marcelo Moura**

* 📧 **Email:** [mgmoura@gmail.com](mailto:mgmoura@gmail.com) | [admin@allriders.com.br](mailto:admin@allriders.com.br)
* 🐙 **GitHub:** [github.com/marcelogmoura](https://github.com/marcelogmoura)
* 👔 **LinkedIn:** [linkedin.com/in/marcelogmoura](https://www.linkedin.com/in/marcelogmoura/)
