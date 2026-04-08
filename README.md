Como rodar o projeto
1. Clone o repositório

git clone https://github.com/seu-user/seu-repo.git

cd seu-repo

Backend (FastAPI)

Acesse a pasta do backend:

cd market-api

Crie e ative o ambiente virtual:

Windows:
python -m venv .venv
.venv\Scripts\activate

Mac/Linux:
python3 -m venv .venv
source .venv/bin/activate

Instale as dependências:

pip install -r requirements.txt

(se estiver usando uv, pode usar uv sync)

Crie um arquivo .env com:

SECRET_KEY=sua_chave_secreta
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

Agora rode o backend:

python -m uvicorn app.main:app --reload

O backend vai rodar em:
http://localhost:8000

A documentação automática fica em:
http://localhost:8000/docs

Frontend (Next.js)

Volte para a raiz do projeto:

cd ..

Instale as dependências:

npm install

Crie um arquivo .env.local com:

NEXT_PUBLIC_API_URL=http://localhost:8000

Agora rode o frontend:

npm run dev

Acesse no navegador:
http://localhost:3000

Funcionalidades

Login de usuário
Autenticação com JWT
Dashboard
Cadastro de produtos
Listagem de produtos
Controle de estoque
Navegação entre páginas

Integração

O frontend consome o backend usando a variável NEXT_PUBLIC_API_URL.
Certifique-se de que o backend esteja rodando antes de iniciar o frontend.
