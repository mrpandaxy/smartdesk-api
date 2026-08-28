# 🚀 SmartDesk - Intelligent IT Helpdesk

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

O SmartDesk é uma plataforma Full-Stack construída para otimizar o fluxo de trabalho de equipes de Suporte de TI (Nível 1 e 2). 

O sistema resolve gargalos do atendimento técnico: a comunicação imprecisa do usuário final. Através da integração com Inteligência Artificial Generativa (LLMs), o SmartDesk intercepta relatos confusos e gera resumos técnicos acionáveis automaticamente, acelerando o tempo de triagem e resolução.

## 🎯 Arquitetura & Tecnologias

Este projeto foi desenhado focando em escalabilidade, integrações modernas e boas práticas de desenvolvimento (Clean Code e Conventional Commits).

| Camada | Tecnologia | Propósito no Projeto |
| :--- | :--- | :--- |
| **Back-end** | Python + Django REST Framework | Construção da API RESTful robusta, orquestração do banco de dados e rotas. |
| **Front-end** | React (Vite) + Axios | Interface reativa para consumo da API e renderização de dados em tempo real. |
| **Inteligência Artificial** | API do Google Gemini (1.5 Flash) | Geração de insights automatizados e tradução de relatos de usuários para linguagem técnica. |

## ✨ Funcionalidades Principais

* **Operações CRUD Completas:** Criação, leitura, atualização e exclusão de chamados de suporte.
* **Integração de IA (AI-Powered Summaries):** No momento da criação do ticket, a API do Gemini atua como um agente de triagem, gerando um resumo de uma linha para o técnico de suporte.
* **Interface Reativa:** Formulários de submissão e listagem atualizados instantaneamente sem recarregamento da página.

## 🚀 Roadmap e Próximos Passos (Evolução Contínua)

Para garantir que o produto opere com tecnologia de ponta, as seguintes features estão na esteira de desenvolvimento:

- [ ] **Infraestrutura e Deploy:** Containerização da aplicação utilizando **Docker** e orquestração básica.
- [ ] **CI/CD:** Criação de pipelines no GitHub Actions para testes automatizados e deploy contínuo.
- [ ] **Automações de Processos:** Integração de Webhooks com **n8n / Make** para disparar alertas em canais corporativos (Discord/Slack/E-mail) quando chamados críticos de hardware forem abertos.

## ⚙️ Como executar o projeto localmente

### 1. Clonar o repositório
```bash
git clone [https://github.com/SEU_USUARIO/smartdesk-api.git](https://github.com/SEU_USUARIO/smartdesk-api.git)
cd smartdesk-api

### 2.Configurar o ambiente

# Crie e ative o ambiente virtual
python -m venv .venv
# Windows: .venv\Scripts\activate | Linux/Mac: source .venv/bin/activate

# Instale as dependências
pip install django djangorestframework django-cors-headers google-generativeai

# Execute as migrações e inicie o servidor (Porta 8000)
python manage.py migrate
python manage.py runserver

### 3.configurar o Front-end

# Em um novo terminal, acesse a pasta do front-end
cd frontend

# Instale os pacotes do Node
npm install

# Inicie o servidor de desenvolvimento (Porta 5173)
npm run dev


