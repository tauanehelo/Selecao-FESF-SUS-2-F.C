# Seleção FESF-SUS – 2 F.C

Este repositório atende integralmente aos requisitos do **Item 02** da Formação Complementar do edital FESF-SUS. Toda a aplicação (Backend e Frontend) foi containerizada e configurada para rodar de forma orquestrada.

---

## Como Executar com Docker

### Pré-requisitos

* Possuir o **Docker** e o **Docker Compose** instalados na máquina.

### Passo Único

Abra o terminal na raiz do projeto e execute o comando abaixo para construir as imagens e iniciar os serviços:

```bash
docker compose up --build
```

* Frontend (Interface do Usuário): Disponível em <http://localhost:3000>

* Backend (API FastAPI): Disponível em <http://localhost:8000>

* Documentação Swagger: Disponível em <http://localhost:8000/docs>

Para encerrar a execução dos containers, utilize o comando ```Ctrl + C``` no terminal ou execute ```docker compose down```.
