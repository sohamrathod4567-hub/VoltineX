//M_Relay=4;
//AX_P_Relay=3;
//AX_S_Relay=2;
//Voltage=A5
//Current=A4
//Temp=A3
//EF=A2
//LCD: RS=7,E=8,D4=9,D5=10,D6=11,D7=12
#include<LiquidCrystal.h>
LiquidCrystal lcd(7,8,9,10,11,12);
const int M_Relay=4;
const int AXP_Relay=3;
const int AXS_Relay=2;
const int Temp=A3;
const int EF=16;
const int Volt=A5;
const int Current=A4;
//Temperature sensor variable
unsigned int Tstate;
float R1 = 10000;
float logR2, R2, T; 
float c1 = 1.009249522e-03, c2 = 2.378405444e-04, c3 = 2.019202697e-07;
//Voltage mesurment variable
unsigned int Vstate;
unsigned int Dec;
unsigned long sum=0;
float VL=0,m=0;
//Current Sensor Variable
double Voltage = 0,AvVoltage=0;
double VRMS = 0;
double AmpsRMS = 0;
//
boolean Estate;
boolean Vbit=0,EFbit=0,Tbit=0,Ibit=0;
unsigned char Icount=0;
void setup()
{
  Serial.begin(9600);
  pinMode(Temp,INPUT);
  pinMode(EF,INPUT);
  pinMode(Volt,INPUT);
  pinMode(Current,INPUT);
  pinMode(M_Relay,OUTPUT);
  pinMode(AXP_Relay,OUTPUT);
  pinMode(AXS_Relay,OUTPUT);
  All_Relay_OFF();
  //delay(2000);
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
   Again:
   Measure_Voltage();
   if(Vbit==1)  //If Normal voltage
   Earth_Fault();
   else         //If Over voltage or Under voltage
   {
    All_Relay_OFF();
    goto Again;
   }
   //******************************************************//
  if(EFbit==1)  //If No Earth fault
  {
    digitalWrite(M_Relay,LOW); //Main  Relay ON
    delay(2000);
    Temp_Sensor();
  }
  else  //If Earth Fault occur
  {
   All_Relay_OFF();
   goto Again;
  }
  //******************************************************//
  if(Tbit==1)  //If Temperature is Normal
  MeasureCurrent();
  else  //If Over Temperature
  {
   All_Relay_OFF();
   goto Again;
  }
  //********************************************************//
  if(Ibit==1)
  {
    goto Again;
  }
  else
  {
    All_Relay_OFF();
    goto Again;
  }
}
//*****************************************  Earth_Fault() **************************************//
void Earth_Fault()
{
  Estate=digitalRead(EF);
  lcd.setCursor(0,0);
  if(Estate==HIGH)
  {
    lcd.setCursor(11,1);
    lcd.print("EF");
    EFbit=0;
    delay(500);
  }
  else
  {
    lcd.setCursor(11,1);
    lcd.print("  ");
    EFbit=1;
    delay(500);
  }
  delay(1000);
}
//*****************************************  Temp_Sensor() **************************************//
void Temp_Sensor()
{
  Tstate = analogRead(Temp);
  R2 = R1 * (1023.0 / (float)Tstate - 1.0);
  logR2 = log(R2);
  T = (1.0 / (c1 + c2*logR2 + c3*logR2*logR2*logR2));
  T = T - 273.15;
 // T = (T * 9.0)/ 5.0 + 32.0; //celsius to fahrenheit
  lcd.setCursor(11,0);
  lcd.print(T);   
  lcd.print(" C");
  if(T>=40)
  {
   lcd.setCursor(9,1);
   lcd.print("OT"); 
   Tbit=0;
   delay(500); 
  }
  else
  {
   lcd.setCursor(9,1);
   lcd.print("  ");
   Tbit=1;
   delay(500);
  }
  delay(1000); 
}

//***************************************** All_Relay_OFF() **************************************//
void All_Relay_OFF()
{
  digitalWrite(M_Relay,HIGH);
  delay(1000);
  digitalWrite(AXP_Relay,HIGH);
  delay(1000);
  digitalWrite(AXS_Relay,HIGH);
  delay(1000);
}
//*****************************************  Measure_Voltage() **************************************//
void Measure_Voltage()
{
  for(int i=0;i<100;i++)
  {
   Vstate=analogRead(Volt);
   sum=sum+Vstate;
  }
  Dec=(sum/100.0);
  sum=0;
  VL=((Dec*315.0)/(1024.0));
  if(VL!=m)
  {
   lcd.setCursor(2,0);
   lcd.print(VL,2);
   m=VL;
  }
  if(VL>=250 || VL<=180)
  {
    lcd.setCursor(7,1);
    if(VL>=250)
    {
      lcd.print("OV");
      delay(500);
    }
    else if(VL<=180)
    {
      lcd.print("UV");
      delay(500);
    }
    Vbit=0;
  }
  else
  {
    lcd.setCursor(7,1);
    lcd.print("  ");
    Vbit=1;
    delay(500);
  } 
  delay(1000);
}
//************************************ MeasureCurrent()  ***************************************//
void MeasureCurrent()
{
  //Imeasure:
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
  Serial.print(VRMS);
  if((VRMS>0 && VRMS<=0.01) || VRMS<0)
  VRMS=0;
  //Serial.println(VRMS,3);
  //Serial.print('\t');
  AmpsRMS = (VRMS*20.0); //I=(VRMS*2000)/R, R=100R
  /*if(AmpsRMS>=1)
  {
    delay(1500);
    Icount++;
    if(Icount<=2)
    goto Imeasure;
  }*/
  lcd.setCursor(2,1);
  lcd.print(AmpsRMS,3);
  //Serial.print(AmpsRMS,3);
  //Serial.print('\n');
  if(AmpsRMS>1.82)
  {
    lcd.setCursor(13,1);
    lcd.print("OL");
    Ibit=0;
    Icount=0;
    delay(500);
  }
  else
  {
    delay(500);
    lcd.setCursor(13,1);
    lcd.print("  ");
    if(AmpsRMS>=0 && AmpsRMS<0.900)
    {
       digitalWrite(AXP_Relay,HIGH); //Relay OFF
       delay(200);
       digitalWrite(AXS_Relay,HIGH); //Relay OFF
       delay(500);
    }
    else if(AmpsRMS>=950 && AmpsRMS<=1.80)
    {
       digitalWrite(AXP_Relay,LOW); //Relay ON
       delay(200);
       digitalWrite(AXS_Relay,LOW); //Relay ON
       delay(500);
    }
    Ibit=1;
  }
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

