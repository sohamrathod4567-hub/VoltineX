//OK
const int M_Relay=6;
const int AXP_Relay=5;
const int AXS_Relay=4;
void setup()
{
  pinMode(M_Relay,OUTPUT);
  pinMode(AXP_Relay,OUTPUT);
  pinMode(AXS_Relay,OUTPUT);
  digitalWrite(M_Relay,HIGH);
  delay(500);
  digitalWrite(AXP_Relay,HIGH);
  delay(500);
  digitalWrite(AXS_Relay,HIGH);
  delay(500);
}
void loop()
{
   digitalWrite(M_Relay,LOW);
   delay(1000);
   digitalWrite(AXP_Relay,LOW);
   delay(1000);
   digitalWrite(AXS_Relay,LOW);
   delay(5000);
   digitalWrite(M_Relay,HIGH);
   delay(1000);
   digitalWrite(AXP_Relay,HIGH);
   delay(1000);
   digitalWrite(AXS_Relay,HIGH);
   delay(1000);
}

