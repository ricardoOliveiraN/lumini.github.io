// const int PINO_SENSOR_LDR = A3; // declara a entrada analógica
// int valorLuminosidade; // declara uma variável
// void setup() {
//   Serial.begin(9600);
// }
// // configuração de iniciação e comunicação entre arduino e computador
// void loop() {
//   valorLuminosidade = analogRead(PINO_SENSOR_LDR);
//   // os dados coletados pela porta analogica serão armazenados na variável
//   // definindo labels/variáveis e valores que serão mostrados na tela para melhorar o entendimento do gráfico
//   Serial.print("MiniVoltsMax:");
//   Serial.print(900);
//   Serial.print(" ");
//   Serial.print("Luminosidade:");
//   Serial.print(valorLuminosidade);
//   Serial.print(" ");
//   Serial.print("MiniVoltsMin:");
//   Serial.println(400);
//   delay(1000);
//   // configura para atualizar os dados a cada 2 segundos
// }

int ldr_pin = A3;
int ldr_read = 0;
float vin = 5.00;
float valor_ADC = 0.00488758, r_ohms = 10000;

void setup() {
    Serial.begin(9600);
}



void loop() {
    if (isnan(ldr_read)){
        Serial.println("Erro ao ler o sensor");
    } 
    else{
        ldr_read = analogRead(ldr_pin);
        float volt = valor_ADC * ldr_read;
        float res_ldr = (r_ohms * (vin - volt)) / volt;
        float lux = 500/(res_ldr/1000);
        Serial.println(lux);
      
          
          delay(3300);
         }
    }
  





  /*
        Checando a voltagem
        Quanto maior a incidência de luz menor a resistência do sensor
        */
    //     if(ldr_read > 750){
    //         // Serial.print(ldr_read);
    //         // Serial.print(" ");
    //         // Serial.print("Volt:");
    //         // Serial.print(volt);
    //         // Serial.print(" ");
    //         // Serial.print("R_ldr:");
    //         // Serial.print(res_ldr);
    //         // Serial.print(" ");
    //         Serial.print("Lux:");
    //          Serial.print(" ");
    //         Serial.print(lux);
    //         // Serial.println(" Claro");
    //     }
    //     else{
    //         Serial.print("Volt:"); //imprime na tela a tensão de saída
    //         Serial.print(" ");
    //       // Serial.print(ldr_read);
    //         // Serial.print(" ");
    //         // Serial.print(volt);
    //         // Serial.print(" ");
    //         // Serial.print("R_ldr:"); imprime na tela a resistência do LDR
    //         // Serial.print(res_ldr);
    //         // Serial.print(" ");
    //         // Serial.print("Lux:"); //imprime na tela o valor de lux
    //         // Serial.print(" ");
              // Serial.print(lux);
    //         // Serial.println(" Escuro");