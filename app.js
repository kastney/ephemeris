// Função para realizar a pesquisa de eventos
function pesquisar() {
    // Obtém a seção onde os resultados da pesquisa serão exibidos
    let secaoResultados = document.getElementById("resultados-pesquisa");

    // Obtém o valor do campo de pesquisa
    let campoPesquisa = document.getElementById("campo-pesquisa");

    // Armazena o valor da pesquisa, transformando-o em minúsculas e removendo espaços em branco
    let pesquisa = campoPesquisa.value.toLowerCase().trim();

    // Verifica se a pesquisa está vazia ou contém apenas espaços
    if (/^\s*$/.test(pesquisa)) {
        secaoResultados.innerHTML = "<p>Por favor, digite um termo de pesquisa válido.</p>";
        campoPesquisa.focus();  // Coloca o foco de volta no campo de pesquisa
        return;  // Interrompe a função
    }

    // Inicializa a variável para armazenar os resultados da pesquisa
    let resultados = "<h3>Resultado da Pesquisa</h3>";
    let contador = 0;  // Contador para limitar a quantidade de resultados

    // Obtém a data e a hora atuais no fuso horário de São Paulo
    let dataAtual = moment.tz("America/Sao_Paulo");

    let nome = "";
    let descricao = "";
    let tipo = "";
    let tags = "";

    // Itera sobre cada evento da lista
    for (let evento of eventos) {
        // Transforma o nome, descrição e tipo do evento em minúsculas para facilitar a comparação
        nome = evento.nome.toLowerCase();
        descricao = evento.descricao.toLowerCase();
        tipo = evento.tipo.toLowerCase();
        tags = evento.tags.toLowerCase();

        // Converte a data e a hora do evento em um objeto de data no fuso horário de São Paulo
        let dataEvento = moment.tz(`${evento.data} ${evento.hora}`, "DD/MM/YYYY HH:mm", "America/Sao_Paulo");

        // Verifica se o evento ocorre no futuro e se o nome, descrição, tipo ou tags contêm o termo pesquisado
        if (dataEvento.isAfter(dataAtual) && (nome.includes(pesquisa) || descricao.includes(pesquisa) || tipo.includes(pesquisa) || tags.includes(pesquisa))) {
            // Adiciona o evento à lista de resultados
            resultados += gerarHtmlEvento(evento);           
            contador++;  // Incrementa o contador de eventos encontrados
            // Limita os resultados a 3 eventos
            if (contador === 3) {
                break;  // Interrompe a busca após encontrar 3 eventos
            }
        }
    }

    // Se nenhum evento foi encontrado, exibe uma mensagem apropriada
    if (contador === 0) {
        resultados += `
            <div class="item-resultado">
                <p>Nenhum evento astronômico futuro foi encontrado.</p>
                <p>Digite novamente e Tente Novamente</p>
            </div>
        `;
        campoPesquisa.focus();  // Coloca o foco de volta no campo de pesquisa
    }

    // Atualiza a seção de resultados com o conteúdo gerado
    secaoResultados.innerHTML = resultados;
}

// Função para mostrar o próximo evento astronômico futuro
function mostrarProximoEvento() {
    // Obtém a seção onde o próximo evento será exibido
    let proximoEventoSecao = document.getElementById("proximo-evento");

    // Obtém a data e a hora atuais no fuso horário de São Paulo
    let dataAtual = moment.tz("America/Sao_Paulo");

    // Itera sobre cada evento da lista
    for(let evento of eventos) {
        // Converte a data e a hora do evento em um objeto de data no fuso horário de São Paulo
        let dataEvento = moment.tz(`${evento.data} ${evento.hora}`, "DD/MM/YYYY HH:mm", "America/Sao_Paulo");

        // Verifica se o evento ocorre no futuro
        if (dataEvento.isAfter(dataAtual)) {
            // Atualiza a seção do próximo evento com as informações do evento encontrado
            proximoEventoSecao.innerHTML = `
                <h3>Próximo Evento Astronômico</h3>
                ${gerarHtmlEvento(evento)}
            `;
            break;  // Interrompe a busca após encontrar o próximo evento
        }
    }
}

// Função para gerar o HTML de um evento
function gerarHtmlEvento(evento) {
    return `
        <div class="item-resultado">
            <h2>${evento.nome}</h2>
            <img src="${evento.imagem}" alt="${evento.nome}">
            <table class="evento-tabela">
                <tbody>
                    <tr>
                        <td><strong>Data</strong></td>
                        <td>${evento.data}</td>
                    </tr>
                    <tr>
                        <td><strong>Hora</strong></td>
                        <td>${evento.hora}</td>
                    </tr>
                    <tr>
                        <td><strong>Tipo</strong></td>
                        <td>${evento.tipo}</td>
                    </tr>
                    <tr>
                        <td><strong>Descrição</strong></td>
                        <td class="descricao">${evento.descricao}</td>
                    </tr>
                    <tr>
                        <td><strong>Como Observar</strong></td>
                        <td class="descricao">${evento.comoObservar}</td>
                    </tr>
                    <tr>
                        <td><strong>Visibilidade</strong></td>
                        <td>${evento.visibilidade}</td>
                    </tr>
                    <tr>
                        <td><strong>Constelação</strong></td>
                        <td>${evento.constelacao}</td>
                    </tr>
                    <tr>
                        <td><strong>Planetas Envolvidos</strong></td>
                        <td>${evento.planetasEnvolvidos}</td>
                    </tr>
                    <tr>
                        <td><strong>Magnitude</strong></td>
                        <td>${evento.magnitude}</td>
                    </tr>
                </tbody>
            </table>
            <a href="${evento.linkParaMaisInformacoes}" target="_blank">Mais informações</a>
        </div>
    `;
}

// Chama a função para exibir o próximo evento assim que a página é carregada
mostrarProximoEvento();