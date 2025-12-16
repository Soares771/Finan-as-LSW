document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do formulário de recuperação
    const formRecuperar = document.getElementById('form-recuperar');
    const emailInput = document.getElementById('email-recuperar');
    const mensagemInfo = document.getElementById('mensagem-info');
    
    // Configura a cor da mensagem para feedback positivo (verde)
    mensagemInfo.style.color = '#2e7d32'; 

    // Adiciona o evento de submissão do formulário
    formRecuperar.addEventListener('submit', (evento) => {
        evento.preventDefault(); 
        const email = emailInput.value.trim();
        
        mensagemInfo.textContent = ''; // Limpa mensagens anteriores

        if (email) {
            // SIMULAÇÃO DE SUCESSO: Exibe mensagem de sucesso
            mensagemInfo.textContent = `Link de redefinição enviado para ${email}. Verifique sua caixa de entrada!`;
            emailInput.value = ''; // Limpa o campo
        } else {
            // FALHA: Exibe mensagem de erro
            mensagemInfo.textContent = 'Por favor, insira um endereço de e-mail válido.';
            mensagemInfo.style.color = '#d32f2f'; // Muda para vermelho
        }
    });
});