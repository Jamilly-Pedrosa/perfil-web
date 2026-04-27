document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Interatividade nos Cards ---
    // Selecionar todos os cards (querySelectorAll)
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        // Adicionar addEventListener('click') a cada card
        card.addEventListener('click', () => {
            // Primeiro, remover a classe 'ativo' de todos os outros cards
            cards.forEach(c => c.classList.remove('ativo'));
            
            // Depois, adicionar a classe 'ativo' apenas ao card clicado (classList.add)
            card.classList.add('ativo');
        });
    });


    // --- 2. Contador de Caracteres no Textarea ---
    const textareaMensagem = document.querySelector('#mensagem');
    const contadorCaracteres = document.querySelector('#contador-caracteres');
    const limiteMaximo = parseInt(textareaMensagem.getAttribute('maxlength')) || 300;

    // Escutar o evento 'input' (Obrigatório)
    textareaMensagem.addEventListener('input', () => {
        const totalCaracteres = textareaMensagem.value.length;
        
        // Exibir dinamicamente quantos caracteres foram digitados (Obrigatório)
        contadorCaracteres.textContent = `${totalCaracteres} / ${limiteMaximo} caracteres`;

        // Mudar a cor para vermelho ao atingir o limite (Obrigatório)
        if (totalCaracteres >= limiteMaximo) {
            contadorCaracteres.style.color = '#dc3545'; // Vermelho de erro
            contadorCaracteres.style.fontWeight = 'bold';
        } else {
            // Cor padrão (usando style.style para limpar a propriedade inline anterior)
            contadorCaracteres.style.color = ''; 
            contadorCaracteres.style.fontWeight = '';
        }
    });


    // --- 3. Validação de Formulário com JavaScript ---
    const formContato = document.querySelector('#form-contato');

    // Interceptar o 'submit' (Obrigatório)
    formContato.addEventListener('submit', (event) => {
        // Chamar preventDefault() para evitar o envio padrão (Obrigatório)
        event.preventDefault();

        // Limpar mensagens de erro anteriores
        const errosAnteriores = formContato.querySelectorAll('.mensagem-erro');
        errosAnteriores.forEach(erro => erro.remove());

        let formularioValido = true;

        // Validação do Nome
        const inputNome = document.querySelector('#nome');
        // Verificar se nome possui ao menos 3 caracteres (Obrigatório)
        if (inputNome.value.trim().length < 3) {
            // Exibir mensagem de erro personalizada criando elemento (Obrigatório)
            exibirErro(inputNome, 'O nome deve conter pelo menos 3 caracteres.');
            formularioValido = false;
        }

        // Validação do E-mail com RegExp
        const inputEmail = document.querySelector('#email');
        // Expressão regular padrão para e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Verificar formato de e-mail (Obrigatório)
        if (!emailRegex.test(inputEmail.value.trim())) {
            exibirErro(inputEmail, 'Por favor, insira um e-mail válido.');
            formularioValido = false;
        }

        // Validação opcional do select (apenas para garantir que foi selecionado)
        const selectAssunto = document.querySelector('#assunto');
        if (selectAssunto.value === "") {
            exibirErro(selectAssunto, 'Por favor, selecione um assunto.');
            formularioValido = false;
        }

        // Ações finais
        if (formularioValido) {
            // Ao envio válido, exibir mensagem de sucesso (Obrigatório)
            alert('Obrigado, ' + inputNome.value.trim() + '! Sua mensagem foi "enviada" com sucesso (simulação).');
            
            // Limpar o formulário (Obrigatório)
            formContato.reset();
            // Resetar o contador de caracteres manualmente
            contadorCaracteres.textContent = `0 / ${limiteMaximo} caracteres`;
            contadorCaracteres.style.color = '';
        }
    });

    // Função utilitária para criar e inserir elementos de erro (createElement)
    function exibirErro(elementoInput, mensagem) {
        // Criar elemento dinamicamente (Obrigatório)
        const spanErro = document.createElement('span');
        spanErro.classList.add('mensagem-erro');
        spanErro.textContent = mensagem; // Usar textContent (Obrigatório)

        // Inserir a mensagem logo após o input correspondente
        elementoInput.parentNode.insertBefore(spanErro, elementoInput.nextSibling);
        
        // Focar no primeiro campo com erro
        elementoInput.focus();
    }

});