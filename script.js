document.addEventListener("DOMContentLoaded", function () {
    const jogo = document.getElementById("jogo");
    const startButtonSoma = document.getElementById("startButton-soma");
    const startButtonSubtracao = document.getElementById("startButton-subtracao");
    const startButtonMultiplicacao = document.getElementById("startButton-multiplicacao");
    const startButtonDivisao = document.getElementById("startButton-divisao");
    let pontuacao = 0;
    let tentativas = 0;
    let tipoOperacao;

    startButtonSoma.addEventListener("click", function () {
        tipoOperacao = "soma";
        iniciarJogo();
    });

    startButtonSubtracao.addEventListener("click", function () {
        tipoOperacao = "subtracao";
        iniciarJogo();
    });

    startButtonMultiplicacao.addEventListener("click", function () {
        tipoOperacao = "multiplicacao";
        iniciarJogo();
    });

    startButtonDivisao.addEventListener("click", function () {
        tipoOperacao = "divisao";
        iniciarJogo();
    });

    function iniciarJogo() {
        if (tentativas < 3) {
            jogo.innerHTML = "";
            const respostaCorreta = gerarConta();
            const opcoes = gerarOpcoes(respostaCorreta);
            exibirPergunta(opcoes, respostaCorreta);
        } else {
            alert(`Fim de jogo! Sua pontuação final é: ${pontuacao}`);
            pontuacao = 0;
            tentativas = 0;
        }
    }

    function gerarConta() {
        const num1 = Math.floor(Math.random() * 99) + 1;
        const num2 = Math.floor(Math.random() * 99) + 1;

        let resposta;
        let pergunta;

        if (tipoOperacao === "soma") {
            resposta = num1 + num2;
            pergunta = `<p>Resolva a conta: ${num1} + ${num2}</p>`;
        } else if (tipoOperacao === "subtracao") {
            resposta = num1 - num2;
            pergunta = `<p>Resolva a conta: ${num1} - ${num2}</p>`;
        } else if (tipoOperacao === "multiplicacao") {
            resposta = num1 * num2;
            pergunta = `<p>Resolva a conta: ${num1} * ${num2}</p>`;
        } else {
            // Evita divisões por zero
            if (num2 !== 0) {
                resposta = (num1 / num2).toFixed(2);
                pergunta = `<p>Resolva a conta: ${num1} ÷ ${num2}</p>`;
            } else {
                // Se o divisor for zero, gera outra conta
                return gerarConta();
            }
        }

        const perguntaElement = document.createElement("div");
        perguntaElement.innerHTML = pergunta;
        jogo.appendChild(perguntaElement);

        return resposta;
    }

    function gerarOpcoes(respostaCorreta) {
        const opcoes = [respostaCorreta];
        while (opcoes.length < 3) {
            const opcao = respostaCorreta + Math.floor(Math.random() * 20) + 1;
            if (!opcoes.includes(opcao)) {
                opcoes.push(opcao);
            }
        }
        return opcoes.sort(() => Math.random() - 0.5);
    }

    function exibirPergunta(opcoes, respostaCorreta) {
        const pergunta = document.createElement("div");
        pergunta.innerHTML = `<p>${opcoes[0]}</p><p>${opcoes[1]}</p><p>${opcoes[2]}</p>`;
        jogo.appendChild(pergunta);

        const botoes = pergunta.querySelectorAll("p");
        botoes.forEach((botao) => {
            botao.addEventListener("click", function () {
                        
        if (parseFloat(botao.textContent) === parseFloat(respostaCorreta)) {
                            alert("Resposta correta! Avançando para a próxima pergunta.");
                            pontuacao++;
                            tentativas = 0;
                            iniciarJogo();
                        } 
                    
        else {
                            alert("Resposta incorreta. Tente novamente.");
                            tentativas++;
                            
                
        iniciarJogo();
                        }
                    });
                });
            }
        });
        