# Utiliza a imagem oficial do Node.js
FROM node:20-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do frontend
COPY . .

# Expõe a porta padrão do servidor de desenvolvimento do Next.js
EXPOSE 3000

# Comando para rodar o Next.js em modo de desenvolvimento dentro do container
CMD ["npm", "run", "dev"]