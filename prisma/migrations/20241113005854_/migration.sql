-- CreateEnum
CREATE TYPE "FornecedorStatus" AS ENUM ('ATIVO', 'INATIVO');

-- CreateEnum
CREATE TYPE "PedidoStatus" AS ENUM ('ENTREGUE', 'A_CAMINHO', 'EM_SEPARACAO');

-- CreateEnum
CREATE TYPE "EstoqueStatus" AS ENUM ('SEM_ESTOQUE', 'BAIXO', 'ALTO');

-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Admin', 'Fornecedor', 'Funcionario');

-- CreateEnum
CREATE TYPE "FuncionarioStatus" AS ENUM ('ATIVO', 'INATIVO');

-- CreateTable
CREATE TABLE "Pedido" (
    "id" UUID NOT NULL,
    "nome_cliente" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "numero_rua" INTEGER NOT NULL,
    "data_pedido" TIMESTAMP(3) NOT NULL,
    "data_entrega" TIMESTAMP(3) NOT NULL,
    "qtd_produto" INTEGER NOT NULL,
    "pedido_status" "PedidoStatus" NOT NULL,
    "fornecedorId" UUID,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "imagem" TEXT NOT NULL,
    "fornecedorId" UUID,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fornecedor" (
    "id" UUID NOT NULL,
    "razao_social" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "status" "FornecedorStatus" NOT NULL,
    "admin_FazendaId" UUID,

    CONSTRAINT "Fornecedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin_Fazenda" (
    "id" UUID NOT NULL,

    CONSTRAINT "Admin_Fazenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Roles" NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Funcionario" (
    "id" UUID NOT NULL,
    "funcao" TEXT NOT NULL,
    "status" "FuncionarioStatus" NOT NULL,
    "admin_FazendaId" UUID,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Departamento" (
    "id" UUID NOT NULL,
    "nome_depto" TEXT NOT NULL,
    "qtd_funcionarios" INTEGER NOT NULL,
    "admin_FazendaId" UUID,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estoque" (
    "id" UUID NOT NULL,
    "setor" TEXT NOT NULL,
    "prateleira" TEXT NOT NULL,
    "qtd" INTEGER NOT NULL,
    "data_atualizacao" TIMESTAMP(3) NOT NULL,
    "estoque_status" "EstoqueStatus" NOT NULL,
    "produtoId" UUID,

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PedidoProdutos" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_DepartamentoToFuncionario" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Fornecedor_cnpj_key" ON "Fornecedor"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PedidoProdutos_AB_unique" ON "_PedidoProdutos"("A", "B");

-- CreateIndex
CREATE INDEX "_PedidoProdutos_B_index" ON "_PedidoProdutos"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DepartamentoToFuncionario_AB_unique" ON "_DepartamentoToFuncionario"("A", "B");

-- CreateIndex
CREATE INDEX "_DepartamentoToFuncionario_B_index" ON "_DepartamentoToFuncionario"("B");

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "Fornecedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fornecedor" ADD CONSTRAINT "Fornecedor_admin_FazendaId_fkey" FOREIGN KEY ("admin_FazendaId") REFERENCES "Admin_Fazenda"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_admin_FazendaId_fkey" FOREIGN KEY ("admin_FazendaId") REFERENCES "Admin_Fazenda"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Departamento" ADD CONSTRAINT "Departamento_admin_FazendaId_fkey" FOREIGN KEY ("admin_FazendaId") REFERENCES "Admin_Fazenda"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidoProdutos" ADD CONSTRAINT "_PedidoProdutos_A_fkey" FOREIGN KEY ("A") REFERENCES "Pedido"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PedidoProdutos" ADD CONSTRAINT "_PedidoProdutos_B_fkey" FOREIGN KEY ("B") REFERENCES "Produto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartamentoToFuncionario" ADD CONSTRAINT "_DepartamentoToFuncionario_A_fkey" FOREIGN KEY ("A") REFERENCES "Departamento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DepartamentoToFuncionario" ADD CONSTRAINT "_DepartamentoToFuncionario_B_fkey" FOREIGN KEY ("B") REFERENCES "Funcionario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
