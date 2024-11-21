/**
 * @fileoverview Gerenciamento de carrinho e interação com um restaurante via WhatsApp.
 * Inclui funcionalidades de carrinho, atualização de itens, checkout e integração com WhatsApp.
 */

// Seletores de elementos do DOM
const menu = document.getElementById("menu");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");
const spanItem = document.getElementById("date-span");

// Estado do carrinho
/** @type {Array<{name: string, price: number, quantity: number}>} */
let cart = [];

/**
 * Mostra o modal do carrinho e atualiza os itens nele.
 * @event ClickEvent
 */
cartBtn.addEventListener("click", function () {
    updateCartModal();
    cartModal.style.display = "flex";
});

/**
 * Fecha o modal do carrinho ao clicar fora da área principal.
 * @event ClickEvent
 */
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
});

/**
 * Fecha o modal do carrinho ao clicar no botão de fechar.
 * @event ClickEvent
 */
closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none";
});

/**
 * Adiciona itens ao carrinho ao clicar no botão de adicionar.
 * Verifica se o botão clicado é válido (botão de adicionar ao lado de cada item) e adiciona o item ao carrinho.
 * @event ClickEvent
 */
menu.addEventListener("click", function (event) {
    const parentButton = event.target.closest(".add-to-cart-btn");

    if (parentButton) {
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        addToCart(name, price);
    }
});

/**
 * Adiciona um item ao carrinho.
 * Se o item já existir, aumenta a quantidade; caso contrário, adiciona um novo.
 * @param {string} name - Nome do item.
 * @param {number} price - Preço do item.
 */
function addToCart(name, price) {
    const existingItem = cart.find((item) => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCartModal();
}

/**
 * Atualiza o modal do carrinho com os itens e o total do pedido.
 */
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col");

        cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <p class="font-bold">${item.name}</p>
                <p>Qtd.: ${item.quantity}</p>
                <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-from-cart-btn" data-name="${item.name}">Remover</button>
        </div>
        `;

        total += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItemElement);
    });

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    cartCounter.textContent = cart.length;
}

/**
 * Adiciona um evento de clique ao contêiner de itens do carrinho. 
 * Quando um botão com a classe "remove-from-cart-btn" é clicado, 
 * chama a função `removeItemCart` passando o nome do item a ser removido.
 * @event InputEvent
 */
cartItemsContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");
        removeItemCart(name);
    }
});

/**
 * Remove um item do carrinho.
 * Se a quantidade for maior que 1, reduz a quantidade; caso contrário, remove o item.
 * @param {string} name - Nome do item a ser removido.
 */

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCartModal();
            return;
        }

        cart.splice(index, 1);
        updateCartModal();  
    }
}

/**
 * Entrada de endereço pelo usuário.
 * Remove avisos e bordas vermelhas ao inserir o endereço.
 * @event InputEvent
 */
addressInput.addEventListener("input", function (event) {
    const inputValue = event.target.value;

    if (inputValue !== "") {
        addressInput.classList.remove("border-red-500");
        addressWarn.classList.add("hidden");
    }
});

/**
 * Finaliza o pedido, verificando se o carrinho não está vazio, se o endereço foi preenchido,
 * e se o restaurante está aberto. Por fim, envia o pedido via WhatsApp.
 * @event ClickEvent
 */
checkoutBtn.addEventListener("click", function () {
    const isOpen = checkRestaurantOpen();

    if (!isOpen) {
        Toastify({
            text: "Ops, o restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: { background: "#ef4444" },
        }).showToast();
        return;
    }

    if (cart.length === 0) return;

    if (addressInput.value === "") {
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500");
        return;
    }

    const cartItems = cart
        .map((item) => ` ${item.name} \nQuantidade: (${item.quantity}) Preço: R$ ${item.price}`)
        .join("\n");
    const address = addressInput.value;
    const message = encodeURIComponent(`Pedido: ${cartItems}\n Endereço: ${address}`);
    const botPhone = "15981051449";

    window.open(`https://wa.me/${botPhone}?text=${message}`, "_blank");

    cart = [];
    updateCartModal();
});

/**
 * Verifica se o restaurante está aberto com base no dia da semana e horário.
 * @returns {boolean} - Retorna `true` se o restaurante estiver aberto.
 */
function checkRestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    const dia = data.getDay();

    return (dia >= 2 || dia === 0) && (hora >= 18 && hora < 22);
}

// Atualiza a exibição do status do restaurante (aberto ou fechado).
const isOpen = checkRestaurantOpen();
if (isOpen) {
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
} else {
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500");
}
