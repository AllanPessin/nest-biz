# Nest Biz

Projeto para gerenciar empresas e produtos, criado com Framework NestJs e o ORM (Object Relational Mapper) Prisma. Inclui as funcionalidades de autenticação e usuário utilizando JWT e o CRUD de empresas e produtos.

## Funcionalidades

- Cadastro de usuário
- Autenticação de usuário
- Cadastro de empresa
- Atualização de empresa
- Exclusão de empresa
- Listagem de empresa
- Cadastro de produto
- Atualização de produto
- Exclusão de produto
- Listagem de produto

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/AllanPessin/nest-biz.git
```

Entre no diretório do projeto

```bash
  cd nest-biz
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run start
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`DATABASE_URL`

`JWT_SECRET`

## Documentação da API

#### Registra um usuário

```http
  POST /auth/register
```

| Parâmetro  | Tipo     | Descrição                                        |
| :--------- | :------- | :----------------------------------------------- |
| `email`    | `string` | **Obrigatório**. E-mail para cadastro de usuário |
| `password` | `string` | **Obrigatório**. Senha para cadastro de usuário  |

#### Retorna o token JWT do usuário

```http
  POST /auth/login
```

| Parâmetro  | Tipo     | Descrição                              |
| :--------- | :------- | :------------------------------------- |
| `email`    | `string` | **Obrigatório**. E-mail para validação |
| `password` | `string` | **Obrigatório**. Senha para validação  |

#### Retorna o perfil do usuário

```http
  GET /auth/profile
```

| Parâmetro | Tipo     | Descrição                              |
| :-------- | :------- | :------------------------------------- |
| `email`   | `string` | **Obrigatório**. E-mail para validação |

#### Cria uma empresa

```http
  POST /companies
```

| Parâmetro | Tipo     | Descrição                            |
| :-------- | :------- | :----------------------------------- |
| `name`    | `string` | **Obrigatório**. Nome da empresa     |
| `cnpj`    | `string` | **Obrigatório**. CNPJ da empresa     |
| `email`   | `string` | **Obrigatório**. E-mail da empresa   |
| `phone`   | `string` | **Obrigatório**. Telefone da empresa |
| `address` | `string` | **Obrigatório**. Endereço da empresa |

#### Atualiza uma empresa

```http
  PATCH /companies/${id}
```

| Parâmetro | Tipo     | Descrição           |
| :-------- | :------- | :------------------ |
| `name`    | `string` | Nome da empresa     |
| `cnpj`    | `string` | CNPJ da empresa     |
| `email`   | `string` | E-mail da empresa   |
| `phone`   | `string` | Telefone da empresa |
| `address` | `string` | Endereço da empresa |

#### Retorna todas as empresas cadastradas

```http
  GET /companies
```

#### Retorna uma empresa com base no id

```http
  GET /companies/${id}
```

#### Exclui uma empresa com base no id

```http
  DELETE /companies/${id}
```

#### Cria um produto

```http
  POST /products
```

| Parâmetro     | Tipo     | Descrição                                          |
| :------------ | :------- | :------------------------------------------------- |
| `name`        | `string` | **Obrigatório**. Nome do produto                   |
| `sku`         | `string` | **Obrigatório**. Código do produto                 |
| `price`       | `float`  | **Obrigatório**. Preço do produto                  |
| `stock`       | `int`    | **Obrigatório**. Quantidade de estoque do produto  |
| `description` | `string` | **Obrigatório**. Descrição do produto              |
| `companyId`   | `int`    | **Obrigatório**. Empresa a qual o produto pertence |

#### Atualiza um produto

```http
  PATCH /products/${id}
```

| Parâmetro     | Tipo     | Descrição                         |
| :------------ | :------- | :-------------------------------- |
| `name`        | `string` | Nome do produto                   |
| `price`       | `float`  | Preço do produto                  |
| `stock`       | `int`    | Quantidade de estoque do produto  |
| `description` | `string` | Descrição do produto              |
| `companyId`   | `int`    | Empresa a qual o produto pertence |

#### Retorna todos os produto cadastrados

```http
  GET /products
```

#### Retorna um produto com base no id

```http
  GET /products/${id}
```

#### Exclui um produto com base no id

```http
  DELETE /products/${id}
```

## Referência

- [NestJs](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [SQLite](https://sqlite.org/)

## Autores

- [Allan S. Pessin](https://github.com/AllanPessin)
