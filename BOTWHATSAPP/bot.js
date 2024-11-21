/**
 * @fileoverview Bot de WhatsApp para interagir com clientes da Dev Burguer.
 * Usa a biblioteca whatsapp-web.js para processar mensagens.
 */

const { Client } = require('whatsapp-web.js'); 
const qrcode = require('qrcode-terminal');


/**
 * Instância do cliente do WhatsApp.
 * @type {Client}
 */
const client = new Client();


/**
 * Evento acionado quando o QR Code para autenticação é gerado.
 * 
 * @event Client#qr
 * @param {string} qr - Código QR gerado para autenticação.
 */
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

/**
 * Evento acionado quando o cliente do WhatsApp está pronto.
 * 
 * @event Client#ready
 */
client.on('ready', () => {
    console.log('Bot está pronto para receber pedidos!');
});


/**
 * Evento acionado ao receber uma mensagem no WhatsApp.
 * 
 * @event Client#message
 * @param {Object} message - Mensagem recebida.
 * @param {string} message.body - Conteúdo da mensagem.
 * @param {string} message.from - Identificador do remetente.
 */

client.on('message', message => {
    if (message.body.includes('Endereço:')) {
        client.sendMessage(message.from, `Recebemos seu pedido:\n\n${message.body}\n\nEscolha uma opção de pagamento:\n1. Cartão de Crédito\n2. Débito\n3. PIX\n4. Dinheiro`);
    } 
    

    // Confirma o pedido de acordo com a escolha do pagamento
    else if (message.body === '1' || message.body === '2' || message.body === '3' || message.body === '4') {
        client.sendMessage(message.from, `Salvamos o seu pedido e ele já está sendo preparado com muito carinho e amor! 😋
            
            🔜 Em breve, seu lanche delicioso estará chegando até você! 

            ⏰ Estimativa de chegada: até 60min.
            
            Agradecemos pela preferência! 🙏
            
            Até logo! 🍔`);
            
    }
    // Se for a primeira interação, envia a saudação
    else if (message.body.toLowerCase() === 'olá', 'boa noite', 'oi') {
        client.sendMessage(message.from, `Olá! Eu sou a assistente virtual da Dev Burguer 😄. 

            Acesse nosso site para realizar o seu pedido: http://127.0.0.1:5500/`);
    }
});

/**
 * Inicializa o cliente do WhatsApp.
 */

client.initialize();