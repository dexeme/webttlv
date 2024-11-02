use wasm_bindgen::prelude::*;
use kmip_ttlv::PrettyPrinter;
use hex;

// Função que será chamada a partir do JavaScript
#[wasm_bindgen]
pub fn convert_hex_to_ttlv(hex_string: &str) -> Result<String, JsValue> {
    // Limpa a string, removendo espaços e quebras de linha
    let mut ttlv_hex_str = hex_string.replace(" ", "").replace("\n", "").replace(r#"""#, "").replace(",", "");

    // Converte a string hexadecimal para bytes
    let ttlv_bin = hex::decode(&ttlv_hex_str).map_err(|e| JsValue::from_str(&format!("Invalid hex format: {:?}", e)))?;

    // Converte os bytes para o formato TTLV
    let ttlv_text = PrettyPrinter::new().to_string(&ttlv_bin);

    Ok(ttlv_text)
}
