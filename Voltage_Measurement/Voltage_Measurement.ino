#include<LiquidCrystal.h>
LiquidCrystal lcd(7,8,9,10,11,12);
const int Volt=A5;
//Voltage mesurment variable
unsigned int Vstate;
unsigned int Dec;
unsigned long sum=0;
float VL=0,m=0;
void setup()
{
  lcd.begin(16,2);
  lcd.setCursor(0,0);
  lcd.print("V:");
}
void loop()
{
  Measure_Voltage();
}
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
  }
  else
  {
    lcd.setCursor(7,1);
    lcd.print("  ");
    delay(500);
  } 
  delay(1000);
}
