use axum::{
    routing::post,
    Router,
    Json,
    response::IntoResponse,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;

#[derive(Deserialize)]
struct HexInput {
    hex_string: String,
}

#[derive(Serialize)]
struct ConversionResult {
    ttlv_text: String,
}

async fn convert_hex(Json(payload): Json<HexInput>) -> impl IntoResponse {
    // Remove espaços, quebras de linha e outras pontuações indesejadas da string hexadecimal
    let mut ttlv_hex_str = payload.hex_string;
    for string_to_remove in &[" ", "\n", r#"""#, ","] {
        ttlv_hex_str = ttlv_hex_str.replace(string_to_remove, "");
    }

    // Decodifica a string hexadecimal para binário
    let ttlv_bin = match hex::decode(&ttlv_hex_str) {
        Ok(bin) => bin,
        Err(_) => return (axum::http::StatusCode::BAD_REQUEST, "Invalid hex format").into_response(),
    };

    // Converte o binário para o formato TTLV
    let ttlv_text = kmip_ttlv::PrettyPrinter::new().to_string(&ttlv_bin);

    // Retorna o resultado como JSON e converte para `IntoResponse`
    Json(ConversionResult { ttlv_text }).into_response()
}

#[tokio::main]
async fn main() {
    // Configura a rota POST /convert para a função `convert_hex`
    let app = Router::new().route("/convert", post(convert_hex));

    // Define o endereço do servidor
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Servidor rodando em http://{}", addr);

    // Inicia o servidor
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
