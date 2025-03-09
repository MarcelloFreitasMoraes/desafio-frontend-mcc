# Front-End Challenge - MCC 🚀

Este repositório contém a solução para o desafio técnico da MCC. O objetivo deste desafio é demonstrar habilidades em desenvolvimento front-end utilizando as tecnologias mais recentes e melhores práticas. O projeto consome dados de uma API pública e apresenta um layout funcional, sem o uso de bibliotecas de componentes prontos.

## 📦 Tecnologias Utilizadas

- **React.js**: Biblioteca JavaScript para a construção da interface.
- **Vite**: Ferramenta de build e desenvolvimento para projetos React, com suporte ao TypeScript.
- **TypeScript**: Superconjunto de JavaScript com tipagem estática.
- **React Router DOM**: Para navegação entre as páginas do aplicativo.
- **TanStack Query**: Para gerenciamento de requisições HTTP de forma eficiente.
- **Zustand**: Biblioteca para gerenciamento de estado global.
- **Tailwind CSS**: Framework de estilização utilitária para um design flexível.
- **Lucide Icons**: Conjunto de ícones customizáveis para o layout.

## 🌐 API Utilizada

A API consumida para este projeto é a [SWAPI](https://swapi.dev/), que fornece dados do universo Star Wars. Foram consumidas várias informações, como:

- **Filmes**
- **Personagens**
- **Espécies**

Através da API, os dados são carregados dinamicamente e exibidos nas telas do aplicativo.

## 🛠 Funcionalidades

### Telas Desenvolvidas

1. **Tela de Login**: 
   - Permite ao usuário realizar login utilizando um formulário simples.
   
2. **Tela de Cadastro**: 
   - Permite ao usuário realizar o cadastro utilizando um formulário de criação de conta.
   
3. **Tela de Listagem**: 
   - Exibe os dados consumidos da API (ex: filmes, personagens, etc.).
   - Implementação de paginação para navegação através de grandes volumes de dados.
   
### Funcionalidades Adicionais

- **Cache (Front-End)**: 
   - Utilização de **TanStack Query** para cache de dados e evitar requisições desnecessárias à API.
   
- **Gerenciamento de Estado**:
   - Uso do **Zustand** para gerenciamento global de estado, facilitando a manutenção e comunicação entre componentes.
   
- **Responsividade**: 
   - O layout é totalmente responsivo, adaptando-se a diferentes tamanhos de tela usando **Tailwind CSS**.

## ⚙️ Como Rodar o Projeto

```bash
1. Clone este repositório:   
   git clone https://github.com/MarcelloFreitasMoraes/desafio-frontend-mcc.git
   

2. Acesse o diretório do projeto:   
  cd desafio-frontend-mcc
   

3. Instale as dependências:
  npm install
  

4. Rode o projeto localmente: 
  npm run dev

5. Abra o navegador e acesse:   
http://localhost:5173/
 ```

 # Autor
 ### Marcelo Moraes
