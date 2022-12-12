#include <SPI.h>
#include <Adafruit_GFX.h> // https://randomnerdtutorials.com/esp8266-0-96-inch-oled-display-with-arduino-ide/
#include <Adafruit_SSD1306.h>
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <string>
#include <DHT.h> // https://github.com/adafruit/DHT-sensor-library  

#define OLED_WIDTH 128
#define OLED_HEIGHT 32
#define OLED_ADDR 0x3C
#define OLED_RESET     0 // Reset pin # (or -1 if sharing Arduino reset pin)
Adafruit_SSD1306 display(OLED_WIDTH, OLED_HEIGHT, &Wire, -1);

#define redPin D5
#define greenPin D8
#define buzzerPin D0
#define Trig  D3   // "Trig"        //     Sensor de distancia Ultrasónico HC-SR04.
#define Echo  D4    // "Echo"
#define ht11  D6    // "DHTPIN"      //     Sensor DHT11-sensor de humedad y temperatura.
#define DHTTYPE DHT11

DHT dht(ht11, DHTTYPE);   // Inicializamos el sensor DHT11.
// LiquidCrystal_I2C lcd(0x27, 16, 2);

#define WIFI_SSID "Tec-IoT"
#define WIFI_PASSWORD "spotless.magnetic.bridge"



HTTPClient httpClient;
WiFiClient wClient;

//Temperatura
String URLGLT = "http://10.22.175.45:3000/api/getLogsTemp/"; //URL1      
String URLLT = "http://10.22.175.45:3000/api/logTemp/"; //URL2
//Humedad
String URLGLH = "http://10.22.175.45:3000/api/getLogsHum/"; //URL3
String URLLH = "http://10.22.175.45:3000/api/logHum/"; //URL4
//Movimiento
String URLGLM = "http://10.22.175.45:3000/api/getLogsMov/";
String URLLM = "http://10.22.175.45:3000/api/logMov/";
//Distancia
String URLGLD = "http://10.22.175.45:3000/api/getlogsDis/";
String URLLD = "http://10.22.175.45:3000/api/logDis/";

//ID de NodeMCU para DB  
String deviceID1 = "1/";    

//long tiempoAnterior = 0;       // Hora  del reporte anterior.
//char msg_G[50];                // Variable para Cadena(string).
int  umbral_A0 = 500;          // Criterio para enviar un mensaje al "broker", Sensor analogico
int  umbral_D =  40; 
float voltage = 0;  

void setup() {
  Serial.begin(9600);
  dht.begin();

  pinMode(buzzerPin, OUTPUT); //Buzzer

  pinMode(redPin, OUTPUT); //Red LED
  pinMode(greenPin, OUTPUT);//Green LED
  
  pinMode(Trig, OUTPUT); //Trig
  pinMode(Echo, INPUT); //Echo
                                 
  pinMode(D0, OUTPUT);//RGB Verde
  pinMode(D5, OUTPUT);//RGB Azul
  pinMode(D6, OUTPUT);//RGB ROJO

  pinMode(D7, INPUT);//Movimiento

  display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR);
  display.clearDisplay();
                                  
  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(100);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conectando a red WiFi \"");
  Serial.print(WIFI_SSID);
  Serial.print("\"");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("\nConectado! IP: ");
  Serial.println(WiFi.localIP());
  delay(500);   

}

void loop() {
  float d,tE;
  int porcentaje, estatusCapacidad;

  //Ultrasonico
    digitalWrite(Trig, LOW);
    delayMicroseconds(4);
    digitalWrite(Trig,HIGH);
    delayMicroseconds(10);
    digitalWrite(Trig,LOW);
    tE = pulseIn(Echo,HIGH);
    d = tE/59;
    porcentaje = (d*100)/15;
  //Ultrasonico

  //Seccion LedRGB
    if(porcentaje >= 100){
      porcentaje = 100;
      digitalWrite(greenPin, HIGH);
      digitalWrite(redPin, LOW);
    }else if(porcentaje < 32){
      porcentaje = 0;
      digitalWrite(greenPin, LOW);
      digitalWrite(redPin, HIGH);
      } else{
      digitalWrite(greenPin, HIGH);
      digitalWrite(redPin, LOW);
    }
   //Termina Seccion LedRGB

  //Seccion LCD
  if(porcentaje < 100){
    display.clearDisplay();
    display.setTextSize(3);
    display.setTextColor(WHITE);
    display.setCursor(30,10);
    display.println(porcentaje);
    display.setCursor(70,10);
    display.println("%");
    display.display();
    }
    else{
      display.clearDisplay();
      display.setTextSize(3);
      display.setTextColor(WHITE);
      display.setCursor(30,10);
      display.println(porcentaje);
      display.setCursor(85,10);
      display.println("%");
      display.display();
      }
   //Termina Seccion LCD

  
   //Seccion Movimiento
   int movimiento = digitalRead(D7); // Si detecta movimiento se hace todo
   //Termina Seccion Movimiento
   
   if(movimiento == HIGH){

      //Seccion Buzzer
      digitalWrite(buzzerPin, HIGH);
      delay(1500);
      digitalWrite(buzzerPin, LOW);
      //Termina Seccion Buzzer

      delay(15000);
      movimiento = 1;

      
      
      //Seccion Ultrasonico
      delay(2000); //Se hacen mediciones cada 2 segundos

      //Ultrasonico
      digitalWrite(Trig, LOW);
      delayMicroseconds(4);
      digitalWrite(Trig,HIGH);
      delayMicroseconds(10);
      digitalWrite(Trig,LOW);
      tE = pulseIn(Echo,HIGH);
      d = tE/59;
      porcentaje = (d*100)/15;
      //Ultrasonico
      
    if(porcentaje >= 100){
      porcentaje = 100;
      digitalWrite(greenPin, HIGH);
      digitalWrite(redPin, LOW);
    }else if(porcentaje < 32){
      porcentaje = 0;
      digitalWrite(greenPin, LOW);
      digitalWrite(redPin, HIGH);
      } else{
      digitalWrite(greenPin, HIGH);
      digitalWrite(redPin, LOW);
    }
      
      if(porcentaje == 100){
        estatusCapacidad = 1;
      } else{
        estatusCapacidad = 0;
      }
      //Termina Seccion Ultrasonico

    
      //Seccion DHT11
      float hum = dht.readHumidity(); //Leer humedad 
      float temp = dht.readTemperature(); //Leer temperatura
      //Termina Seccion DHT11
           
      Serial.print(F("Humedad: "));
      Serial.print(hum);
      Serial.print(F("%  Temperatura: "));
      Serial.print(temp);
      Serial.print("C \n");
      Serial.println("Distancia de Ultrasonico: ");
      Serial.print(d);
      Serial.print(" cm");
      Serial.print("\n");
      Serial.print("Movimiento: ");
      Serial.print(movimiento);      
     
      if ( isnan(temp) == 0 || isnan(hum) == 0 || isnan(d) == 0 || isnan(porcentaje) == 0 || isnan(estatusCapacidad) == 0 || isnan(movimiento) == 0){
         // logIntentoGETselect(deviceID1);
         // delay(2000);
    
          // Usamos metodo POST para insertar en la base de datos
          logIntentoPOSinsert(deviceID1, temp, hum, d, movimiento, porcentaje, estatusCapacidad);
      }
            
       
   }else{ // Si no detecta movimiento no se hace nada y se repite loop
    movimiento = 0;
    delay(1000);
   }  

}

/*
// Metodo GET para consultar la base de datos
void logIntentoGETselect(String deviceID){
  //if(WiFi.status() == WL_CONNECTED){
  String data = URL;
  data = data + deviceID;
  //data = http://10.22.162.83:3000/api/getLogsTemp/1/
  Serial.println(data); 
  if(WiFi.status() == WL_CONNECTED){
    httpClient.begin(wClient, data.c_str()); 
    int httpResponseCode = httpClient.GET();
    Serial.println(httpResponseCode);
    if (httpResponseCode>0) {
      Serial.println(httpClient.getString());
    }
    httpClient.end(); 
  }
  return;
}*/


// Metodo POST para insertar en la base de datos
void logIntentoPOSinsert(String deviceID, float temp, float hum, float d, int movimiento, int porcentaje, int estatusCapacidad ){
  
  //if(WiFi.status() == WL_CONNECTED){
  //Nuevo
  String dataLT = URLLT + deviceID + temp;
  String dataLH = URLLH + deviceID + hum;
  String dataLM = URLLM + deviceID + movimiento;
  String dataLD = URLLD + deviceID + estatusCapacidad + "/" + d + "/" + porcentaje;
  int httpResponseCode;
  
  if(WiFi.status() == WL_CONNECTED){
    //Temp
    httpClient.begin(wClient, dataLT.c_str()); 
    httpClient.addHeader("Content-Type", "Content-Type: application/json");
    httpResponseCode = httpClient.POST(dataLT.c_str());
    Serial.println("Ya posteo");
    Serial.println(httpResponseCode); 
    //if (httpResponseCode>0) {
    Serial.println(httpClient.getString());
    //}
    httpClient.end(); 

    //Hum
    httpClient.begin(wClient, dataLH.c_str()); 
    httpClient.addHeader("Content-Type", "Content-Type: application/json");
    httpResponseCode = httpClient.POST(dataLH.c_str());
    Serial.println(httpResponseCode); 
    //if (httpResponseCode>0) {
    Serial.println(httpClient.getString());
    //}
    httpClient.end();

    //Mov
    httpClient.begin(wClient, dataLM.c_str()); 
    httpClient.addHeader("Content-Type", "Content-Type: application/json");
    httpResponseCode = httpClient.POST(dataLM.c_str());
    Serial.println(httpResponseCode); 
    //if (httpResponseCode>0) {
    Serial.println(httpClient.getString());
    //}
    httpClient.end();

    //Dis
    httpClient.begin(wClient, dataLD.c_str()); 
    httpClient.addHeader("Content-Type", "Content-Type: application/json");
    httpResponseCode = httpClient.POST(dataLD.c_str());
    Serial.println(httpResponseCode);
    //if (httpResponseCode>0) {
    Serial.println(httpClient.getString());
    //}
    httpClient.end();
    
  }
  return;
}
