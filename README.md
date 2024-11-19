# API Urbanino

Bem-vindo à API Urbanino! Esta API foi desenvolvida para gerenciar uma fazenda urbana, permitindo o cadastro e gerenciamento de usuários, produtos, fornecedores, funcionários e muito mais. O objetivo principal é fornecer uma API robusta e segura para facilitar a administração de uma fazenda urbana.

## Tecnologias Utilizadas

- **TypeScript**
- **Docker**
- **Prisma**
- **PostgreSQL**
- **bcrypt**
- **JSON Web Token (JWT)**

## Instalação

Para começar a usar a API, siga os passos abaixo:

1. Clone o repositório:
    ```bash
    git clone https://github.com/dev-fazenda-urbana-pim/backend-fazenda.git
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o Docker para iniciar os serviços necessários:
    ```bash
    docker-compose up -d
    ```

4. Configure as variáveis de ambiente no arquivo `.env` conforme necessário.

5. Rode as migrações do Prisma:
    ```bash
    npx prisma migrate dev
    ```

6. Inicie o servidor:
    ```bash
    npm run dev
    ```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests. Para contribuir:

1. Fork o repositório.
2. Crie uma branch para sua feature: `git checkout -b minha-feature`.
3. Commit suas mudanças: `git commit -am 'Adiciona nova feature'`.
4. Push para a branch: `git push origin minha-feature`.
5. Abra um pull request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido por [DevJoaoPeu](https://github.com/DevJoaoPeu)
