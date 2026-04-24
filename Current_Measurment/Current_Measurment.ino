#include<LiquidCrystal.h>
LiquidCrystal lcd(7,8,9,10,11,12);
double Voltage = 0,AvVoltage=0;
double VRMS = 0;
double AmpsRMS = 0;
const int Current=A4;
void setup()
{
  Serial.begin(9600);
  pinMode(Current,INPUT);
  lcd.begin(16,2);
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("V:      ,T:"); //(2,0), (11,0)
  lcd.setCursor(0,1);
  lcd.print("I:    ,"); //(2,1),(7,1)
  delay(2000);
}
void loop()
{
  MeasureCurrent();
}
void MeasureCurrent()
{
  Imeasure:
  for(char k=0;k<2;k++)
  {
   Voltage = getVPP();
   AvVoltage=(AvVoltage+Voltage);
  }
  Voltage=(AvVoltage/2.0);
  //Serial.println(Voltage,3);
  AvVoltage=0;
  //Serial.print('\t');
  VRMS = (Voltage/2.0) *0.707; 
  VRMS = (VRMS-0.0025);
  if((VRMS>0 && VRMS<0.020) || VRMS<0)
  VRMS=0;
  Serial.println(VRMS,3);
  //Serial.print('\t');
  AmpsRMS = (VRMS*20); //I=(VRMS*2000)/R, R=100R
  lcd.setCursor(2,1);
  lcd.print(AmpsRMS,3);
  delay(1000);
}
float getVPP()
{
  float result;
  int readValue;             //value read from the sensor
  int maxValue = 0;          // store max value here
  int minValue = 1024;          // store min value here
  
   uint32_t start_time = millis();
   while((millis()-start_time) < 1000) //sample for 1 Sec
   {
       readValue = analogRead(Current);
       // see if you have a new maxValue
       if (readValue > maxValue) 
       {
           /*record the maximum sensor value*/
           maxValue = readValue;
       }
       if (readValue < minValue) 
       {
           /*record the maximum sensor value*/
           minValue = readValue;
       }
   }
   
   // Subtract min from max
   result = ((maxValue - minValue) * 5.0)/1024.0;
      
   return result;
 }
