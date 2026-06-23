from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List

app = FastAPI(title="FESF-SUS - Sistema de Triagem")

# Configuração do CORS para permitir o acesso do Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção usaríamos a URL do front
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Banco de dados simulado em memória
db_pacientes = []

# Modelo de Dados com Pydantic (Validação)
class Paciente(BaseModel):
    id: int | None = None
    nome: str = Field(..., min_length=3, description="Nome completo do paciente")
    cns: str = Field(..., min_length=15, max_length=15, description="Cartão Nacional de Saúde")
    sintomas: str = Field(..., description="Relato dos sintomas/queixas")

# Rota 1: Listar pacientes (GET)
@app.get("/pacientes", response_model=List[Paciente])
def listar_pacientes():
    return db_pacientes

# Rota 2: Cadastrar paciente (POST)
@app.post("/pacientes", response_model=Paciente, status_code=201)
def cadastrar_paciente(paciente: Paciente):
    # Simula a geração de um ID incremental
    paciente.id = len(db_pacientes) + 1
    db_pacientes.append(paciente)
    return paciente

# Rota de teste de saúde da API
@app.get("/")
def read_root():
    return {"status": "API FESF-SUS Rodando com sucesso!"}