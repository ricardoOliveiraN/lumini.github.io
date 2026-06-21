// Alterna entre dois comportamentos:
// - true: envia uma saida serial simples para teste/mock de integracao.
// - false: le o LDR real e estima a iluminancia em lux.
const bool USAR_MODO_MOCK = true;

const int PINO_SENSOR_LDR = A3;
const unsigned long INTERVALO_LEITURA_MS = 3300;

// Parametros usados no modo mockado para alimentar graficos ou testes de serial.
const int MOCK_MINI_VOLTS_MAX = 900;
const int MOCK_MINI_VOLTS_MIN = 400;

// Parametros usados no modo real para conversao da leitura analogica.
const float TENSAO_ENTRADA = 5.00;
const float VALOR_ADC = 0.00488758;
const float RESISTOR_REFERENCIA_OHMS = 10000.0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  if (USAR_MODO_MOCK) {
    executarModoMock();
  } else {
    executarModoReal();
  }

  delay(INTERVALO_LEITURA_MS);
}

void executarModoMock() {
  int valorLuminosidade = analogRead(PINO_SENSOR_LDR);

  // Mantem o formato rotulado da serial para testes de grafico/integracao.
  Serial.print("MiniVoltsMax:");
  Serial.print(MOCK_MINI_VOLTS_MAX);
  Serial.print(" ");
  Serial.print("Luminosidade:");
  Serial.print(valorLuminosidade);
  Serial.print(" ");
  Serial.print("MiniVoltsMin:");
  Serial.println(MOCK_MINI_VOLTS_MIN);
}

void executarModoReal() {
  int leituraLdr = analogRead(PINO_SENSOR_LDR);
  float tensao = VALOR_ADC * leituraLdr;

  if (tensao <= 0.0) {
    Serial.println("Erro ao ler o sensor");
    return;
  }

  float resistenciaLdr = (RESISTOR_REFERENCIA_OHMS * (TENSAO_ENTRADA - tensao)) / tensao;
  float lux = 500.0 / (resistenciaLdr / 1000.0);

  Serial.println(lux);
}
