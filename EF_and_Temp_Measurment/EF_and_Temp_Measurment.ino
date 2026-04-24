#include<LiquidCrystal.h>
LiquidCrystal lcd(7,8,9,10,11,12);
unsigned int Tstate;
float R1 = 10000;
float logR2, R2, T;
float c1 = 1.009249522e-03, c2 = 2.378405444e-04, c3 = 2.019202697e-07;
const int Temp=A3;
const int EF=16;
boolean Estate;
void setup()
{
  pinMode(Temp,INPUT);
  pinMode(EF,INPUT);
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
  Earth_Fault();
  Temp_Sensor();
}
void Earth_Fault()
{
  Estate=digitalRead(EF);
  lcd.setCursor(0,0);
  if(Estate==HIGH)
  {
    lcd.setCursor(11,1);
    lcd.print("EF");
    delay(500);
  }
  else
  {
    lcd.setCursor(11,1);
    lcd.print("  ");
    delay(500);
  }
  delay(1000);
}
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
   delay(500); 
  }
  else
  {
   lcd.setCursor(9,1);
   lcd.print("  ");
   delay(500);
  }
  delay(1000); 
}

