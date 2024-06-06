# Desafio para o processo seletivo na Havira

## 🚀 Começando

Antes de utilizar o projeto, é necessario ter Git, Docker/Docker-compose e npm/yarn instalado na máquina.

## 📃 Sobre
  <p>
O Hávira Web Map é uma aplicação web interativa que conecta-se a uma API para recuperar informações de usuários. Esses dados são então exibidos de forma visual e intuitiva através de cartões informativos. Com essa aplicação, os usuários podem explorar os perfis dos usuários e visualizar suas localizações geográficas em um mapa interativo alimentado pela biblioteca Leaflet.  </p>


## 🛠️ Ferramentas

## - Front-End:
Este projeto foi desenvolvido utilizando as seguintes tecnologias:

  - **React**: Biblioteca JavaScript para construir interfaces de usuário interativas e reutilizáveis em aplicações web.
  - **Typescript**: Linguagem de programação que adiciona tipagem estática opcional ao JavaScript, ajudando a detectar e corrigir erros de forma eficiente.
  - **Redux Toolkit**: Biblioteca oficial para Redux, simplificando o gerenciamento de estado em aplicações React com funcionalidades como createSlice.
  - **React Query**: Biblioteca para gerenciamento de estado e cache de dados assíncronos em aplicações React, facilitando operações de busca, atualização e remoção de dados da API.
  - **Chakra UI**: Biblioteca de componentes para React com abordagem de design baseada em sistema de design atômico e acessível, facilitando a criação de interfaces bonitas e responsivas.
  - **Tailwind CSS**: Framework de CSS utilitário para estilização rápida de interfaces de usuário, oferecendo classes pré-definidas aplicáveis diretamente ao React.
  - **Axios**: Biblioteca JavaScript para fazer requisições HTTP a servidores web, proporcionando uma interface simples para operações assíncronas, como buscar dados de uma API.
  - **Docker**: Plataforma para desenvolvimento, envio e execução de aplicações em contêineres, garantindo consistência em diferentes ambientes de desenvolvimento e produção.
  - **React Hook Form**: Uma biblioteca para gerenciar formulários de forma eficiente em React. Oferece uma API simples para validação e manipulação de dados, sendo uma escolha popular para desenvolvedores pela sua facilidade de uso e desempenho.
  - **Leaflet**: Uma biblioteca JavaScript para criar mapas interativos em aplicações web. É leve e fácil de usar, permitindo a integração rápida de mapas personalizados em projetos React.
  - **Yup**: Uma biblioteca JavaScript para validação de esquemas de dados. É amplamente utilizada para garantir a integridade dos dados em formulários de aplicações web, oferecendo uma API simples e expressiva.
  - **Chakra UI Icons**: Uma coleção de ícones prontos para uso com a biblioteca Chakra UI. Esses ícones são projetados para facilitar a criação de interfaces visualmente atraentes em aplicações React, integrando-se perfeitamente aos componentes da Chakra UI.

## ⚙️ Como executar

É necessário que a porta 5173 esteja disponível para a execução da aplicação.

1 - Clone o repositório em uma pasta de sua preferencia 
```
git clone https://github.com/ffernandescs/haviraUserMaps.git
```
2 - Vá até o diretório do projeto.
```
cd <diretório do projeto>
```
3 - Faça a instalação das dependências:
```
  npm install
```
  ou
```
   yarn
```
4 - Confira a apliação:

http://localhost:5173

https://havira-user-maps.vercel.app/

5 - Para iniciar a aplicação dentro de um contêiner Docker:
```
  docker-compose up --build -d
```
