import init, { convert_hex_to_ttlv } from "./pkg/wasm_converter.js";

// Inicializa o Wasm e configura os botões
async function run() {
    await init();

    document.getElementById("convert").onclick = () => {
        let hexInputValue = document.getElementById("hex_input").value;
        const outputContainer = document.getElementById("output");

        hexInputValue = hexInputValue.replace(/\/\/.*$/gm, '');

        hexInputValue = hexInputValue.replace(/[^A-Fa-f0-9]/g, '');

    const tagMappings = {
        "420001": "ACTIVATION_DATE",
        "420002": "APPLICATION_DATA",
        "420003": "APPLICATION_NAMESPACE",
        "420004": "APPLICATION_SPECIFIC_INFORMATION",
        "420005": "ARCHIVE_DATE",
        "420006": "ASYNCHRONOUS_CORRELATION_VALUE",
        "420007": "ASYNCHRONOUS_INDICATOR",
        "420008": "ATTRIBUTE",
        "420009": "ATTRIBUTE_INDEX",
        "42000A": "ATTRIBUTE_NAME",
        "42000B": "ATTRIBUTE_VALUE",
        "42000C": "AUTHENTICATION",
        "42000D": "BATCH_COUNT",
        "42000E": "BATCH_ERROR_CONTINUATION_OPTION",
        "42000F": "BATCH_ITEM",
        "420010": "BATCH_ORDER_OPTION",
        "420011": "BLOCK_CIPHER_MODE",
        "420012": "CANCELLATION_RESULT",
        "420013": "CERTIFICATE",
        "420018": "CERTIFICATE_REQUEST",
        "420019": "CERTIFICATE_REQUEST_TYPE",
        "42001D": "CERTIFICATE_TYPE",
        "42001E": "CERTIFICATE_VALUE",
        "42001F": "COMMON_TEMPLATE_ATTRIBUTE",
        "420020": "COMPROMISE_DATE",
        "420021": "COMPROMISE_OCCURRENCE_DATE",
        "420022": "CONTACT_INFORMATION",
        "420023": "CREDENTIAL",
        "420024": "CREDENTIAL_TYPE",
        "420025": "CREDENTIAL_VALUE",
        "420026": "CRITICALITY_INDICATOR",
        "420027": "CRT_COEFFICIENT",
        "420028": "CRYPTOGRAPHIC_ALGORITHM",
        "420029": "CRYPTOGRAPHIC_DOMAIN_PARAMETERS",
        "42002A": "CRYPTOGRAPHIC_LENGTH",
        "42002B": "CRYPTOGRAPHIC_PARAMETERS",
        "42002C": "CRYPTOGRAPHIC_USAGE_MASK",
        "42002D": "CUSTOM_ATTRIBUTE",
        "42002E": "D",
        "42002F": "DEACTIVATION_DATE",
        "420030": "DERIVATION_DATA",
        "420031": "DERIVATION_METHOD",
        "420032": "DERIVATION_PARAMETERS",
        "420033": "DESTROY_DATE",
        "420034": "DIGEST",
        "420035": "DIGEST_VALUE",
        "420036": "ENCRYPTION_KEY_INFORMATION",
        "420037": "G",
        "420038": "HASHING_ALGORITHM",
        "420039": "INITIAL_DATE",
        "42003A": "INITIALIZATION_VECTOR",
        "42003C": "ITERATION_COUNT",
        "42003D": "IV_COUNTER_NONCE",
        "42003E": "J",
        "42003F": "KEY",
        "420040": "KEY_BLOCK",
        "420041": "KEY_COMPRESSION_TYPE",
        "420042": "KEY_FORMAT_TYPE",
        "420043": "KEY_MATERIAL",
        "420044": "KEY_PART_IDENTIFIER",
        "420045": "KEY_VALUE",
        "420046": "KEY_WRAPPING_DATA",
        "420047": "KEY_WRAPPING_SPECIFICATION",
        "420048": "LAST_CHANGE_DATE",
        "420049": "LEASE_TIME",
        "42004A": "LINK",
        "42004B": "LINK_TYPE",
        "42004C": "LINKED_OBJECT_IDENTIFIER",
        "42004D": "MAC_SIGNATURE",
        "42004E": "MAC_SIGNATURE_KEY_INFORMATION",
        "42004F": "MAXIMUM_ITEMS",
        "420050": "MAXIMUM_RESPONSE_SIZE",
        "420051": "MESSAGE_EXTENSION",
        "420052": "MODULUS",
        "420053": "NAME",
        "420054": "NAME_TYPE",
        "420055": "NAME_VALUE",
        "420056": "OBJECT_GROUP",
        "420057": "OBJECT_TYPE",
        "420058": "OFFSET",
        "420059": "OPAQUE_DATA_TYPE",
        "42005A": "OPAQUE_DATA_VALUE",
        "42005B": "OPAQUE_OBJECT",
        "42005C": "OPERATION",
        "42005E": "P",
        "42005F": "PADDING_METHOD",
        "420060": "PRIME_EXPONENT_P",
        "420061": "PRIME_EXPONENT_Q",
        "420062": "PRIME_FIELD_SIZE",
        "420063": "PRIVATE_EXPONENT",
        "420064": "PRIVATE_KEY",
        "420065": "PRIVATE_KEY_TEMPLATE_ATTRIBUTE",
        "420066": "PRIVATE_KEY_UNIQUE_IDENTIFIER",
        "420067": "PROCESS_START_DATE",
        "420068": "PROTECT_STOP_DATE",
        "420069": "PROTOCOL_VERSION",
        "42006A": "PROTOCOL_VERSION_MAJOR",
        "42006B": "PROTOCOL_VERSION_MINOR",
        "42006C": "PUBLIC_EXPONENT",
        "42006D": "PUBLIC_KEY",
        "42006E": "PUBLIC_KEY_TEMPLATE_ATTRIBUTE",
        "42006F": "PUBLIC_KEY_UNIQUE_IDENTIFIER",
        "420070": "PUT_FUNCTION",
        "420071": "Q",
        "420072": "Q_STRING",
        "420073": "QLENGTH",
        "420074": "QUERY_FUNCTION",
        "420075": "RECOMMENDED_CURVE",
        "420076": "REPLACED_UNIQUE_IDENTIFIER",
        "420077": "REQUEST_HEADER",
        "420078": "REQUEST_MESSAGE",
        "420079": "REQUEST_PAYLOAD",
        "42007A": "RESPONSE_HEADER",
        "42007B": "RESPONSE_MESSAGE",
        "42007C": "RESPONSE_PAYLOAD",
        "42007D": "RESULT_MESSAGE",
        "42007E": "RESULT_REASON",
        "42007F": "RESULT_STATUS",
        "420080": "REVOCATION_MESSAGE",
        "420081": "REVOCATION_REASON",
        "420082": "REVOCATION_REASON_CODE",
        "420083": "KEY_ROLE_TYPE",
        "420084": "SALT",
        "420085": "SECRET_DATA",
        "420086": "SECRET_DATA_TYPE",
        "420088": "SERVER_INFORMATION",
        "420089": "SPLIT_KEY",
        "42008A": "SPLIT_KEY_METHOD",
        "42008B": "SPLIT_KEY_PARTS",
        "42008C": "SPLIT_KEY_THRESHOLD",
        "42008D": "STATE",
        "42008E": "STORAGE_STATUS_MASK",
        "42008F": "SYMMETRIC_KEY",
        "420090": "TEMPLATE",
        "420091": "TEMPLATE_ATTRIBUTE",
        "420092": "TIME_STAMP",
        "420093": "UNIQUE_BATCH_ITEM_ID",
        "420094": "UNIQUE_IDENTIFIER",
        "420095": "USAGE_LIMITS",
        "420096": "USAGE_LIMITS_COUNT",
        "420097": "USAGE_LIMITS_TOTAL",
        "420098": "USAGE_LIMITS_UNIT",
        "420099": "USERNAME",
        "42009A": "VALIDITY_DATE",
        "42009B": "VALIDITY_INDICATOR",
        "42009C": "VENDOR_EXTENSION",
        "42009D": "VENDOR_IDENTIFICATION",
        "42009E": "WRAPPING_METHOD",
        "42009F": "X",
        "4200A0": "Y",
        "4200A1": "PASSWORD",
        "4200A2": "DEVICE_IDENTIFIER",
        "4200A3": "ENCODING_OPTION",
        "4200A4": "EXTENSION_INFORMATION",
        "4200A5": "EXTENSION_NAME",
        "4200A6": "EXTENSION_TAG",
        "4200A7": "EXTENSION_TYPE",
        "4200A8": "FRESH",
        "4200A9": "MACHINE_IDENTIFIER",
        "4200AA": "MEDIA_IDENTIFIER",
        "4200AB": "NETWORK_IDENTIFIER",
        "4200AC": "OBJECT_GROUP_MEMBER",
        "4200AD": "CERTIFICATE_LENGTH",
        "4200AE": "DIGITAL_SIGNATURE_ALGORITHM",
        "4200AF": "CERTIFICATE_SERIAL_NUMBER",
        "4200B0": "DEVICE_SERIAL_NUMBER",
        "4200B1": "ISSUER_ALTERNATIVE_NAME",
        "4200B2": "ISSUER_DISTINGUISHED_NAME",
        "4200B3": "SUBJECT_ALTERNATIVE_NAME",
        "4200B4": "SUBJECT_DISTINGUISHED_NAME",
        "4200B5": "X_509_CERTIFICATE_IDENTIFIER",
        "4200B6": "X_509_CERTIFICATE_ISSUER",
        "4200B7": "X_509_CERTIFICATE_SUBJECT",
        "4200B8": "KEY_VALUE_LOCATION",
        "4200B9": "KEY_VALUE_LOCATION_VALUE",
        "4200BA": "KEY_VALUE_LOCATION_TYPE",
        "4200BB": "KEY_VALUE_PRESENT",
        "4200BC": "ORIGINAL_CREATION_DATE",
        "4200BD": "PGP_KEY",
        "4200BE": "PGP_KEY_VERSION",
        "4200BF": "ALTERNATIVE_NAME",
        "4200C0": "ALTERNATIVE_NAME_VALUE",
        "4200C1": "ALTERNATIVE_NAME_TYPE",
        "4200C2": "DATA",
        "4200C3": "SIGNATURE_DATA",
        "4200C4": "DATA_LENGTH",
        "4200C5": "RANDOM_IV",
        "4200C6": "MAC_DATA",
        "4200C7": "ATTESTATION_TYPE",
        "4200C8": "NONCE",
        "4200C9": "NONCE_ID",
        "4200CA": "NONCE_VALUE",
        "4200CB": "ATTESTATION_MEASUREMENT",
        "4200CC": "ATTESTATION_ASSERTION",
        "4200CD": "IV_LENGTH",
        "4200CE": "TAG_LENGTH",
        "4200CF": "FIXED_FIELD_LENGTH",
        "4200D0": "COUNTER_LENGTH",
        "4200D1": "INITIAL_COUNTER_VALUE",
        "4200D2": "INVOCATION_FIELD_LENGTH",
        "4200D3": "ATTESTATION_CAPABLE_INDICATOR",
        "4200D4": "OFFSET_ITEMS",
        "4200D5": "LOCATED_ITEMS",
        "4200D6": "CORRELATION_VALUE",
        "4200D7": "INIT_INDICATOR",
        "4200D8": "FINAL_INDICATOR",
        "4200D9": "RNG_PARAMETERS",
        "4200DA": "RNG_ALGORITHM",
        "4200DB": "DRBG_ALGORITHM",
        "4200DC": "FIPS186_VARIATION",
        "4200DD": "PREDICTION_RESISTANCE",
        "4200DE": "RANDOM_NUMBER_GENERATOR",
        "4200DF": "VALIDATION_INFORMATION",
        "4200E0": "VALIDATION_AUTHORITY_TYPE",
        "4200E1": "VALIDATION_AUTHORITY_COUNTRY",
        "4200E2": "VALIDATION_AUTHORITY_URI",
        "4200E3": "VALIDATION_VERSION_MAJOR",
        "4200E4": "VALIDATION_VERSION_MINOR",
        "4200E5": "VALIDATION_TYPE",
        "4200E6": "VALIDATION_LEVEL",
        "4200E7": "VALIDATION_CERTIFICATE_IDENTIFIER",
        "4200E8": "VALIDATION_CERTIFICATE_URI",
        "4200E9": "VALIDATION_VENDOR_URI",
        "4200EA": "VALIDATION_PROFILE",
        "4200EB": "PROFILE_INFORMATION",
        "4200EC": "PROFILE_NAME",
        "4200ED": "SERVER_URI",
        "4200EE": "SERVER_PORT",
        "4200EF": "STREAMING_CAPABILITY",
        "4200F0": "ASYNCHRONOUS_CAPABILITY",
        "4200F1": "ATTESTATION_CAPABILITY",
        "4200F2": "UNWRAP_MODE",
        "4200F3": "DESTROY_ACTION",
        "4200F4": "SHREDDING_ALGORITHM",
        "4200F5": "RNG_MODE",
        "4200F6": "CLIENT_REGISTRATION_METHOD",
        "4200F7": "CAPABILITY_INFORMATION",
        "4200F8": "KEY_WRAP_TYPE",
        "4200F9": "BATCH_UNDO_CAPABILITY",
        "4200FA": "BATCH_CONTINUE_CAPABILITY",
        "4200FB": "PKCS_12_FRIENDLY_NAME",
        "4200FC": "DESCRIPTION",
        "4200FD": "COMMENT",
        "4200FE": "AUTHENTICATED_ENCRYPTION_ADDITIONAL_DATA",
        "4200FF": "AUTHENTICATED_ENCRYPTION_TAG",
        "420100": "SALT_LENGTH",
        "420101": "MASK_GENERATOR",
        "420102": "MASK_GENERATOR_HASHING_ALGORITHM",
        "420103": "P_SOURCE",
        "420104": "TRAILER_FIELD",
        "420105": "CLIENT_CORRELATION_VALUE",
        "420106": "SERVER_CORRELATION_VALUE",
        "420107": "DIGESTED_DATA",
        "420108": "CERTIFICATE_SUBJECT_CN",
        "420109": "CERTIFICATE_SUBJECT_O",
        "42010A": "CERTIFICATE_SUBJECT_OU",
        "42010B": "CERTIFICATE_SUBJECT_EMAIL",
        "42010C": "CERTIFICATE_SUBJECT_C",
        "42010D": "CERTIFICATE_SUBJECT_ST",
        "42010E": "CERTIFICATE_SUBJECT_L",
        "42010F": "CERTIFICATE_SUBJECT_UID",
        "420110": "CERTIFICATE_SUBJECT_SERIAL_NUMBER",
        "420111": "CERTIFICATE_SUBJECT_TITLE",
        "420112": "CERTIFICATE_SUBJECT_DC",
        "420113": "CERTIFICATE_SUBJECT_DN_QUALIFIER",
        "420114": "CERTIFICATE_ISSUER_CN",
        "420115": "CERTIFICATE_ISSUER_O",
        "420116": "CERTIFICATE_ISSUER_OU",
        "420117": "CERTIFICATE_ISSUER_EMAIL",
        "420118": "CERTIFICATE_ISSUER_C",
        "420119": "CERTIFICATE_ISSUER_ST",
        "42011A": "CERTIFICATE_ISSUER_L",
        "42011B": "CERTIFICATE_ISSUER_UID",
        "42011C": "CERTIFICATE_ISSUER_SERIAL_NUMBER",
        "42011D": "CERTIFICATE_ISSUER_TITLE",
        "42011E": "CERTIFICATE_ISSUER_DC",
        "42011F": "CERTIFICATE_ISSUER_DN_QUALIFIER",
        "420120": "SENSITIVE",
        "420121": "ALWAYS_SENSITIVE",
        "420122": "EXTRACTABLE",
        "420123": "NEVER_EXTRACTABLE",
        "420124": "REPLACE_EXISTING"
        };
        try {
            let result = convert_hex_to_ttlv(hexInputValue);

            // Array para armazenar as tags encontradas
            const tags = [];

            // Processa o texto para remover "0x", substituir "Data" por "Value", e estilizar conteúdos
            const lines = result
                .split('\n')
                .map(line => {
                    line = line.replace(/0x/g, '');  // Remove "0x"
                    line = line.replace(/\bData\b/g, 'Value');  // Substitui "Data" por "Value"
                    line = line.trimStart();  // Remove espaços no início da linha

                    // Captura e armazena os 6 caracteres antes de ", Type:" como Tag
                    const tagMatch = line.match(/([A-Za-z0-9]{6})(?=, Type:)/);
                    if (tagMatch) {
                        const tag = tagMatch[0];
                        tags.push(tag);  // Adiciona a tag ao array
                    }
                    line = line.replace(/\([A-Za-z0-9]{6}\)(?=\s*Value:)/, '');
                    // Destaca o conteúdo após "Value:"
                    line = line.replace(/(Value:\s*)(.*)/g, '$1<span class="highlight-content">$2</span>');

                    // Destaca os 6 caracteres antes de ", Type:" em verde escuro
                    line = line.replace(/([A-Za-z0-9]{6})(?=, Type:)/, '<span class="highlight-tag">$1</span>');

                    // Destaca todos os tipos possíveis em azul escuro
                    line = line.replace(/\b(Integer|LongInteger|BigInteger|Enumeration|Boolean|Byte String|DateTime|Interval|Structure|ByteString|TextString)\b/g, '<span class="highlight-type">$1</span>');

                    return line;
                });

            document.getElementById("exportSvg").onclick = function () {
                const container = document.getElementById("output-section");

                // Função para ativar o estilo de hover em elementos específicos
                function activateHoverStyles() {
                    const elements = container.querySelectorAll(".line-container");

                    elements.forEach(element => {
                        // Estilo simulado para hover
                        const dataTag = element.getAttribute("data-tag");
                        if (dataTag) {
                            element.setAttribute("data-original-content", element.innerHTML);
                            element.innerHTML += `<span style="
                    position: absolute;
                    left: 100%;
                    margin-left: 10px;
                    padding: 4px 8px;
                    background-color: #333;
                    color: #fff;
                    border-radius: 4px;
                    font-size: 12px;
                    white-space: nowrap;
                    z-index: 10;
                    border: 1px solid #ddd;
                ">${dataTag}</span>`;
                        }
                    });
                }

                // Função para reverter os estilos de hover
                function deactivateHoverStyles() {
                    const elements = container.querySelectorAll(".line-container");

                    elements.forEach(element => {
                        if (element.getAttribute("data-original-content")) {
                            element.innerHTML = element.getAttribute("data-original-content");
                            element.removeAttribute("data-original-content");
                        }
                    });
                }

                // Ativa os estilos de hover simulados
                activateHoverStyles();

                // Converte o contêiner para SVG usando `dom-to-image`
                domtoimage.toSvg(container)
                    .then(function (dataUrl) {
                        // Cria um link de download para o SVG
                        const link = document.createElement("a");
                        link.href = dataUrl;
                        link.download = "container.svg"; // Nome do arquivo SVG
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        // Remove os estilos de hover após a exportação
                        deactivateHoverStyles();
                    })
                    .catch(function (error) {
                        console.error("Erro ao exportar o contêiner como SVG:", error);

                        // Remove os estilos de hover em caso de erro
                        deactivateHoverStyles();
                    });
            };


            // Renderiza a saída com hierarquia visual e define o conteúdo do hover com base no mapeamento
            outputContainer.innerHTML = ''; // Limpa a saída anterior
            lines.forEach((line, index) => {
                const match = line.match(/^(\d+)Tag:/);  // Captura o nível da linha

                const lineContainer = document.createElement("div");
                line = line.replace(/Type: /g, '');  //

                if (match) {
                    const level = parseInt(match[1], 10);

                    // Adiciona o número correto de barras `|` conforme o nível
                    const hierarchyPrefix = '| '.repeat(level / 2);
                    lineContainer.innerHTML = `${hierarchyPrefix}${line.slice(match[0].length).trim()}`; // Remove "Tag:" e adiciona hierarquia
                } else {
                    lineContainer.innerHTML = line; // Insere o HTML da linha
                }

                // Define o valor do hover com base no mapeamento do enum
                const tag = tags[index];
                if (tag) {
                    const mappedValue = tagMappings[tag] || "Tag não mapeada"; // Exibe "Tag não mapeada" se não houver mapeamento
                    lineContainer.setAttribute('data-tag', mappedValue);
                }

                // Adiciona estilo de hierarquia para cada linha
                lineContainer.classList.add('line-container');
                outputContainer.appendChild(lineContainer);
            });

            // Exibe todas as tags encontradas no console
            console.log("Tags encontradas:", tags);

        } catch (error) {
            outputContainer.innerText = `Erro: ${error}`;
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
