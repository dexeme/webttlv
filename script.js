import init, { convert_hex_to_ttlv } from "./pkg/wasm_converter.js";

// Inicializa o Wasm e configura os botões
async function run() {
    await init();

    document.getElementById("convert").onclick = () => {
        const hexInputValue = document.getElementById("hex_input").value;
        try {
            const result = convert_hex_to_ttlv(hexInputValue);
            document.getElementById("output").innerText = result;
        } catch (error) {
            document.getElementById("output").innerText = `Erro: ${error}`;
        }
    };

    // Gerenciamento de entradas
    const entriesList = document.getElementById("entries-list");
    const saveEntryButton = document.getElementById("save-entry");

    // Inicializa o entryCounter carregando do localStorage (ou 1 se não houver)
    let entryCounter = Number(localStorage.getItem("entryCounter")) || 1;

    // Carrega as entradas do localStorage ao iniciar
    loadEntriesFromLocalStorage();

    // Função para salvar uma entrada
    saveEntryButton.onclick = () => {
        const hexInputValue = document.getElementById("hex_input").value;
        if (!hexInputValue) return; // Não salva entradas vazias

        // Gera a data e hora atuais no formato desejado
        const timestamp = generateTimestamp();
        createEntry(`Entrada ${entryCounter}`, hexInputValue, timestamp);
        entryCounter++;
        saveEntriesToLocalStorage(); // Salva no localStorage após criar uma entrada
    };

    // Função para criar uma entrada e adicionar à lista
    function createEntry(name, value, timestamp) {
        const entryItem = document.createElement("li");
        entryItem.dataset.id = entryCounter;
        entryItem.dataset.value = value; // Armazena o valor do input
        entryItem.dataset.timestamp = timestamp;

        const entryName = document.createElement("input");
        entryName.type = "text";
        entryName.value = name;
        entryName.readOnly = true;

        // Permite renomear ao dar dois cliques
        entryName.ondblclick = () => {
            entryName.readOnly = false;
            entryName.focus();
        };

        // Salva o novo nome ao pressionar Enter
        entryName.onkeypress = (e) => {
            if (e.key === "Enter") {
                entryName.readOnly = true;
                saveEntriesToLocalStorage(); // Atualiza o localStorage com o novo nome
            }
        };

        // Salva o novo nome ao perder o foco (clicar fora)
        entryName.onblur = () => {
            entryName.readOnly = true;
            saveEntriesToLocalStorage(); // Atualiza o localStorage com o novo nome
        };

        // Adiciona a data e hora ao lado do nome da entrada
        const timestampLabel = document.createElement("span");
        timestampLabel.textContent = ` (${timestamp})`;
        timestampLabel.style.fontSize = "10px"; // Deixa a data e hora menor
        timestampLabel.style.color = "#666"; // Cor para menor destaque
        timestampLabel.style.marginLeft = "8px";

        // Botão de execução (play) que copia a entrada para o input e executa a conversão
        const playButton = document.createElement("button");
        playButton.classList.add("play-button");
        playButton.innerHTML = `<img src="icons/play.svg" class="play-icon" alt="Executar" />`;

        playButton.onclick = (event) => {
            event.stopPropagation(); // Impede que o clique aplique a entrada ao input
            document.getElementById("hex_input").value = value; // Copia o valor para o campo de input
            document.getElementById("convert").click(); // Simula o clique no botão "Converter"
            console.log("Entrada copiada e executada:", value);
        };

        // Botão para copiar a entrada para o input
        const copyButton = document.createElement("button");
        copyButton.classList.add("copy-button");
        copyButton.innerHTML = `<img src="icons/copy.svg" class="copy-icon" alt="Copiar" />`;

        copyButton.onclick = (event) => {
            event.stopPropagation(); // Impede que o clique aplique a entrada ao input
            document.getElementById("hex_input").value = value; // Copia o valor para o campo de input
            console.log("Entrada copiada para o campo de input:", value);
        };

        // Botão para deletar a entrada (usando SVG externo)
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = `<img src="icons/trash.svg" class="trash-icon" alt="Deletar" />`;

        deleteButton.onclick = (event) => {
            event.stopPropagation(); // Impede que o clique aplique a entrada ao input
            entriesList.removeChild(entryItem);
            saveEntriesToLocalStorage(); // Atualiza o localStorage após deletar
        };

        entryItem.appendChild(entryName);
        entryItem.appendChild(timestampLabel); // Adiciona a data e hora ao lado do nome
        entryItem.appendChild(playButton); // Adiciona o botão de executar (play)
        entryItem.appendChild(copyButton); // Adiciona o botão de copiar
        entryItem.appendChild(deleteButton); // Adiciona o botão de deletar
        entriesList.appendChild(entryItem);
    }

    // Função para salvar todas as entradas no localStorage
    function saveEntriesToLocalStorage() {
        const entries = [];
        entriesList.querySelectorAll("li").forEach((item) => {
            const name = item.querySelector("input").value;
            const value = item.dataset.value;
            const timestamp = item.dataset.timestamp;
            entries.push({ name, value, timestamp });
        });
        localStorage.setItem("entries", JSON.stringify(entries));
        localStorage.setItem("entryCounter", entryCounter);
    }

    // Função para carregar entradas do localStorage ao iniciar
    function loadEntriesFromLocalStorage() {
        const savedEntries = JSON.parse(localStorage.getItem("entries")) || [];
        savedEntries.forEach((entry) => {
            createEntry(entry.name, entry.value, entry.timestamp);
        });
    }

    // Função para gerar o timestamp no formato DD/MM/YYYY - HH:mm:ss
    function generateTimestamp() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    }
}

run();
