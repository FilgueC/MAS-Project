# MAS-Project

# Loop
## Project Abstract


## Project Team

| Name                       
|---------------------------- |
| Rúben Marques  - 133155      |
| Rodrigo Cerejo - 133153       |
| Miguel Fernandes - 119187   |
| Pedro Ferreira - 132745      |

## Branches WorkFlow

**Master:** Colocar aqui apenas os resultados finais de cada coisa nova que desenvolvemos e que nao vamos provavelmente mexer mais.

**Develop:** Onde vamos ter o trabalho a maioritariamente das vezes.

**feature/-:** uma feature por branch Ex.: feature/US1, feature/api

## Fluxo:

1 - criar feature a partir de develop
2 - abrir PR para develop
3 - review + checks
4 - merge
5 - no fim do sprint: PR de develop → master

## Comandos a fazer: Nova branch

git branch : vai listar as branches disponiveis, se nao estiveres na develop faz **git checkout develop**

git pull origin : vai te sacar tudo novo do github para o vscode

git fetch

git pull

git checkout -b feature/US1  (mudem o US1 para o nome do que estao a fazer nessa nova branch)
Switched to a new branch 'feature/US1'

Agora ja devem estar numa nova branch que tem como "pai" a develop

## Mandar coisas para o github

Quando quiserem mandar o trabalho que fizeram ou só uma parte.
(Ainda na branch que criaram)

git add . (Seleciona todas as novas mudanças que fizeram na pasta que estiverem)

git commit -m "" (Entre os "" coloquem o texto do que fizeram)

git push (Manda as coisas para o github)

git fetch

git merge origin/develop

E se aparecer "Already up to date." deve estar tudo bem.


## No github

Depois de terem enviado tudo para o github.

Abram o [projeto](https://github.com/FilgueC/MAS-Project)

Vao a pull request -> new PR-> base develop, compare feature/US1 -> (rezar que diga able to merge) -> Create PR -> escrever o que foi feito -> create a PR -> esperar que alguem aceite o PR 