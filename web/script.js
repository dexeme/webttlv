import init, { convert_hex_to_ttlv } from "./pkg/wasm_converter.js";

async function run() {
    // Inicializa o Wasm
    await init();

    // Configura o botão para executar a conversão
    document.getElementById("convert").onclick = () => {
        const hexInput = document.getElementById("hex_input").value;
        try {
            const result = convert_hex_to_ttlv(hexInput);
            document.getElementById("output").innerText = result;
        } catch (error) {
            document.getElementById("output").innerText = `Erro: ${error}`;
        }
    };
}

run();
