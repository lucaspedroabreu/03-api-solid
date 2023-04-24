### App

# GymPass like app

## RN (Regras de Negócio)
- [X] Deve haver um sistema de cadastro e autenticação de usuários;
- [ ] Deve haver registro do histórico de check-ins de um usuário para manipulação dos dados;
- [ ] O sistema deve ter acesso à localização de um usuário;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário deve estar a 100m da academia para poder fazer check-in;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] O check-in só pode ser validade até 20 minutos após realizado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RF (Requisitos Funcionais)
- [X] Deve ser possível se cadastrar no app;
- [ ] É necessário se autenticar para usar o app;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário autenticado;
- [ ] Deve ser possível obter o histórico de check-ins pelo usuário autenticado;
- [ ] Deve ser possível buscar academias próximas a um endereço (gps ou estático);
- [ ] Deve ser possível buscar academias por nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia próxima;
- [ ] Deve ser possível cadastrar uma academia;


## RNF (Requisitos Não Funcionais)
- [X] A Senha do usuário precisa estar hasheada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por páginas;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);


## Restrições