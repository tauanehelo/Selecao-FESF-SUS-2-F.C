# Utiliza uma imagem leve e oficial do Python
FROM python:3.12-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas o arquivo de requisitos para aproveitar o cache do Docker
COPY requirements.txt .

# Instala as dependências do sistema e do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código do backend para o container
COPY . .

# Expõe a porta que a API FastAPI utiliza
EXPOSE 8000

# Comando para rodar a aplicação voltada para produção/container
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]