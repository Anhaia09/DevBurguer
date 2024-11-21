# **DEV BURGUER 🍔**

Bem-vindo ao repositório do projeto **DEV BURGUER**!  
Somos uma hamburgueria moderna que une o sabor dos melhores hambúrgueres artesanais com a tecnologia de ponta. Este projeto foi desenvolvido para criar uma interface de pedidos para nossos clientes e integrar os pedidos diretamente ao WhatsApp através de um bot automatizado.

---

## 🚀 **Tecnologias Utilizadas**
Este projeto utiliza as seguintes tecnologias e bibliotecas:

- **HTML**: Estrutura do site.
- **JavaScript**: Funcionalidades e interação da interface.
- **TailwindCSS**: Estilo rápido e responsivo.
- **WhatsApp Web.js**: Integração com o WhatsApp para envio e recebimento de mensagens automatizadas.

---

## 📂 **Estrutura do Projeto**
A estrutura do projeto é organizada da seguinte forma:

Cardapio:
```
   /docs        <- documentação
   /src
  /assets       <- Imagens e arquivos estáticos
  /styles       <- Arquivos Tailwind e CSS
  index.html    <- Página principal
  script.js     <- Lógica principal da interface

```
<br>

ChatBot:
```
  bot.js     <- Lógica principal
```
---

## 🛠️ **Pré-requisitos e Instalação**

### **1. Clonar o Repositório**
Clone o repositório em sua máquina local:
```bash
git clone https://github.com/Anhaia09/DevBurguer.git
```

## 2. **Instalar Dependências**
- Certifique-se de que o Node.js esteja instalado em sua máquina. <br>
(https://nodejs.org/pt)

Instalar as dependências do projeto:
```
npm install (para o cardápio)
npm install whatsapp-web.js (para o bot)
npm install qrcode-terminal (para o bot)
```

Dependências utilizadas:

- qrcode-terminal: Para exibir o QR Code para conexão do bot ao WhatsApp.
- WhatsApp Web.js: Para gerenciar a conexão com o WhatsApp.

## 3. **Instalar o Tailwind CSS**
Se precisar configurar ou ajustar estilos, instale o Tailwind CSS:
```
npm install -D tailwindcss
npx tailwindcss init
```

## 4. **Rodar o Projeto**
Para iniciar o servidor do site:
```
npm run dev
```
Para iniciar o servidor do bot:

```
node bot.js
```

## 🤖 **Funcionalidades do Bot**
O bot de WhatsApp está integrado para:

- Receber pedidos diretamente pelo WhatsApp.
- Confirmar os detalhes do pedido.
- Confirmar a forma de pagamento.
- Notificar a equipe da cozinha sobre novos pedidos.

## 📚 Links úteis com documentações
- https://tailwindcss.com/docs/installation
- https://wwebjs.dev/guide/installation.html#installation-on-macos

