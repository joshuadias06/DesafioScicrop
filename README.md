# DesafioScicrop

Dei o nome do mini Blog de AgroPop e a partir daqui irei referenciar assim o desafio.

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



