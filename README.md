# DesafioScicrop


-Apelidei o mini Blog de AgroPop e a partir daqui irei referenciar assim o desafio.


# AgroPop
Descrição de como rodar o AgroPop:

# Requisitos
- Instalar o Python (A versão usada no projeto foi a 3.12).
- Instalar o pip (Durante a instalação do python marque a caixinha -> Add python.exe to PATH).

# Download do AgroPop
```bash
git clone https://github.com/joshuadias06/DesafioScicrop.git
```
- Atente-se para clonar o projeto para não usar SSH, utilize o HTTPS.
- Dica: Clone na área de trabalho para ter mais facilidade de navegar pelo PowerShell.

# Pós Download do AgroPop
- Abra o PowerShell
- Navegue até o diretório(pasta) do projeto:
```bash
cd DesafioScicrop
```
- Estando no diretório vamos criar um ambiente virtual para rodar o projeto.
```bash
  python -m venv venv
```
- Com o ambiente virtual já instalado, vamos rodar o ambiente.
```bash
.\venv\Scripts\activate
```
- Com o ambiente virtual rodando vamos instalar o framework Django para rodar o projeto.
```bash
pip install django
```
# Configurar o Banco de Dados
- Para isso execute apenas esse comando.
```bash
python manage.py migrate
```

# Execução Do AgroPop
- Com tudo instalado perfeitamente vamos rodar o projeto. Para isso vamos acessar uma pasta a frente da que estamos.
```bash
cd agropop
```
- Feito isso vamos rodar o projeto.
```bash
python manage.py runserver
```
- Acesse o seu navegador de preferência e coloque esse endereço aqui:
```bash
http://127.0.0.1:8000/
```
# Desafios Técnicos 
<h2>Back-End</h2>
- Eu tenho uma boa experiência em fazer sistemas CRUD simples assim, então a parte do Back-End foi tranquila...
- Porém, durante o projeto eu estava com a intenção de fazer operações com DELETE e PUT usando o atributo title,porém não tinha como identificar isso no banco de dados para fazer a edição e a deleção de objetos.
- Com isso eu tive que fazer alterações em duas funções, a de DELETE e a de PUT.
- E fazer alterações nas URL's de comunicação entre o back-end e o front-end.
- Eu tenho bastante projetos pessoais em Java e usei bastante dessa bagagem para fazer o back-end

<h2>Front-End</h2>
- O Front-End foi bastante desafiador pois decidi inovar um pouco criando um pop-up de criação e edição de postãgens, e isso deu bastante trabalho por conta dos estilos dos componentes e da visibilidade dos pop-up's.
- O que agregou demais para mim foi migrar do VS CODE, onde sempre faço o front-end para fazer no PyCharm, tive uma facilidade melhor em referenciar os atributos dos objetos dentro das tags HTML

<h2>Integração Front-End x Back-End</h2>
- Essa é uma parte que eu gosto bastante de fazer e sempre fico com ela na faculdade junto ao back-end, desde que aprendi isso tenho facilidade em manipulador o DOM no JacaScript e fazer as requisições para o back-end.

# Implementações
<h3>Objeto -> Post</h3>
- id - Automático
- title -> Preenchido no front-end e mandado para o back-end
- content -> Preenchido no front-end e mandado para o back-end
- date_created -> Automático com a hora atual de criação

<h3>Funcões/Metódos</h3>
- list_posts = R -> READ
- post_detail = R -> READ
- add_post = C -> CREATE
- edit_post = U -> UPDATE
- delete_post = D -> DELETE

#Tecnologias Usadas:
[![Techs](https://skillicons.dev/icons?i=python,django,sqlite,html,css,js,git,github&perline=17)](https://skillicons.dev)



