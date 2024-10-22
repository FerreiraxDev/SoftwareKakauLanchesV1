document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('burguer-content').classList.remove('d-none');

    function toggleCategory(categoryToShow) {
        const categories = document.querySelectorAll('.category-items');
        categories.forEach(category => {
            if (category.id === categoryToShow) {
                category.classList.remove('d-none');
            } else {
                category.classList.add('d-none');
            }
        });
    }

    document.getElementById('btnradio1').addEventListener('click', function() {
        toggleCategory('burguer-content');
    });

    document.getElementById('btnradio2').addEventListener('click', function() {
        toggleCategory('hotdog-content');
    });

    document.getElementById('btnradio3').addEventListener('click', function() {
        toggleCategory('churrasco-content');
    });

    document.getElementById('btnradio4').addEventListener('click', function() {
        toggleCategory('espaguete-content');
    });

    document.getElementById('btnradio5').addEventListener('click', function() {
        toggleCategory('pizza-content');
    });

    document.getElementById('btnradio6').addEventListener('click', function() {
        toggleCategory('bebidas-content');
    });

    document.getElementById('btnradio7').addEventListener('click', function() {
        toggleCategory('sobremesas-content');
    });

    let contadorCarrinho = 0;
    let valorTotal = 0; // Variável para armazenar o valor total
    const buttons = document.querySelectorAll('.btn-contador');
    const contadorSpan = document.getElementById('contador-span');
    const itensAdicionadosDiv = document.getElementById('itens-adicionados');
    const valorTotalDiv = document.querySelector('.Valor-total-items'); // Seleciona a div do total

    // Objeto para armazenar a quantidade e total de cada item
    const itensNoCarrinho = {};

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            contadorCarrinho++;
            contadorSpan.textContent = contadorCarrinho;

            // Obtenha o nome e o preço do item
            const nomeItem = button.closest('.accordion-item').querySelector('.accordion-header button').textContent.trim();
            const precoItem = parseFloat(button.getAttribute('data-price')); // Preço em formato numérico

            // Verifica se o item já foi adicionado
            if (itensNoCarrinho[nomeItem]) {
                // Incrementa a quantidade e atualiza o texto
                itensNoCarrinho[nomeItem].quantidade++;
                const itemDiv = itensNoCarrinho[nomeItem].div;
                const totalItem = precoItem * itensNoCarrinho[nomeItem].quantidade;
                itemDiv.querySelector('.item-quantidade').textContent = 'x' + itensNoCarrinho[nomeItem].quantidade;

                // Atualiza o texto do item
                itemDiv.querySelector('.item-total').textContent = `Total: R$${totalItem.toFixed(2)}`; // Atualiza o valor total

                // Atualiza o valor total geral
                valorTotal += precoItem; // Adiciona o preço do item
            } else {
                // Adiciona o novo item ao carrinho
                const novoItemDiv = document.createElement('div');
                novoItemDiv.classList.add('item-div'); // Classe para estilizar, se necessário

                const itemNome = document.createElement('span');
                itemNome.textContent = `${nomeItem} - R$${precoItem.toFixed(2)}`; // Exibe nome e preço unitário

                const itemQuantidade = document.createElement('span');
                itemQuantidade.classList.add('item-quantidade', 'ms-2');
                itemQuantidade.textContent = 'x1'; // Inicialmente 1

                const itemTotal = document.createElement('span'); // Cria um span para o total
                itemTotal.classList.add('item-total', 'ms-2');
                itemTotal.textContent = `Total: R$${precoItem.toFixed(2)}`; // Valor inicial é o preço unitário

                const removerButton = document.createElement('button'); // Botão de remover
                removerButton.textContent = 'Remover';
                removerButton.classList.add('btn', 'btn-danger', 'ms-2');

                // Evento de clique para remover o item
                removerButton.addEventListener('click', () => {
                    if (itensNoCarrinho[nomeItem].quantidade > 1) {
                        // Diminui a quantidade se for maior que 1
                        itensNoCarrinho[nomeItem].quantidade--;
                        contadorCarrinho--; // Diminui o contador global
                        contadorSpan.textContent = contadorCarrinho;
                        const itemDiv = itensNoCarrinho[nomeItem].div;
                        const totalItem = precoItem * itensNoCarrinho[nomeItem].quantidade;
                        itemDiv.querySelector('.item-quantidade').textContent = 'x' + itensNoCarrinho[nomeItem].quantidade;

                        // Atualiza o texto do item
                        itemDiv.querySelector('.item-total').textContent = `Total: R$${totalItem.toFixed(2)}`; // Atualiza o valor total

                        // Atualiza o valor total geral
                        valorTotal -= precoItem; // Remove o preço do item
                    } else {
                        // Remove completamente se a quantidade for 1
                        contadorCarrinho--;
                        contadorSpan.textContent = contadorCarrinho;
                        novoItemDiv.remove(); // Remove o item da lista
                        delete itensNoCarrinho[nomeItem]; // Remove o item do objeto

                        // Atualiza o valor total geral
                        valorTotal -= precoItem; // Remove o preço do item
                    }
                    atualizarValorTotal(); // Atualiza o valor total na div
                });

                // Estrutura do novo item
                novoItemDiv.appendChild(itemNome);
                novoItemDiv.appendChild(itemQuantidade);
                novoItemDiv.appendChild(itemTotal);
                novoItemDiv.appendChild(removerButton);
                itensAdicionadosDiv.appendChild(novoItemDiv);

                // Armazena o item, quantidade e a referência à div
                itensNoCarrinho[nomeItem] = {
                    div: novoItemDiv,
                    quantidade: 1
                };

                // Atualiza o valor total geral
                valorTotal += precoItem; // Adiciona o preço do item
            }

            atualizarValorTotal(); // Atualiza o valor total na div
        });
    });

    // Função para atualizar o valor total na div
    function atualizarValorTotal() {
        valorTotalDiv.textContent = `Total itens: R$${valorTotal.toFixed(2)}`; // Exibe o total formatado
    }



    const mainButton = document.getElementById('mainButton');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            const selectedOption = this.getAttribute('data-option');
            mainButton.textContent = `Pagar com: ${selectedOption}`;
        });
    });

    // Função para enviar o pedido via WhatsApp
    function enviarPedido(formaPagamento) {
        const itensAdicionados = Object.keys(itensNoCarrinho).map(item => {
            return `${item} (x${itensNoCarrinho[item].quantidade})`;
        }).join(', '); // Formata os itens adicionados

        const pedido = {
            descricao: itensAdicionados,
            formaPagamento: formaPagamento
        };

        fetch('/pedido/enviarPedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.text();
        })
        .then(urlWhatsApp => {
            // Redirecionar para o WhatsApp com a mensagem
            window.open(urlWhatsApp, '_blank');
        })
        .catch(error => {
            console.error('Erro ao enviar o pedido:', error);
        });
    }

    // Adicionar evento de clique no botão principal
    mainButton.addEventListener('click', function() {
        const formaPagamento = mainButton.textContent.replace('Pagar com: ', '');
        if (formaPagamento !== 'Pagar com:') {
            enviarPedido(formaPagamento);
        } else {
            alert('Por favor, selecione uma forma de pagamento!');
        }
    });
});

// Função para mostrar e esconder o carrinho
function hide() {
    var showDiv = document.getElementById("show");
    if (showDiv.style.display === "none") {
        showDiv.style.display = "flex";
    } else {
        showDiv.style.display = "none";
    }
}
