/*
  Warnings:

  - Added the required column `qtd` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fornecedor" ALTER COLUMN "status" SET DEFAULT 'ATIVO';

-- AlterTable
ALTER TABLE "Funcionario" ALTER COLUMN "status" SET DEFAULT 'ATIVO';

-- AlterTable
ALTER TABLE "Produto" ADD COLUMN     "qtd" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Usuarios" ADD COLUMN     "nome" TEXT NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'Funcionario';
