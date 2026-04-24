# Voltinex

## Overview
Voltinex is an IoT-based voltage and current monitoring system designed to capture electrical parameters in real time using embedded hardware. The system focuses on accurate sensing, processing, and transmission of electrical data through a microcontroller-based architecture.

---

## Problem Statement
In many electrical setups, especially at a basic or experimental level, there is a lack of real-time monitoring of voltage and current. This leads to:
- Limited visibility of electrical behavior  
- Difficulty in detecting fluctuations  
- Lack of measurable data for analysis  

Voltinex addresses this by providing a hardware-based monitoring system for continuous data acquisition.

---

## Objectives
- Measure voltage and current in real time  
- Process sensor data using a microcontroller  
- Enable wireless data transmission  
- Ensure stable and continuous data acquisition  
- Build a modular and scalable monitoring system  

---

## System Architecture
The system is structured into the following layers:

1. **Data Acquisition Layer**  
   Sensors capture voltage and current from the electrical system  

2. **Processing Layer**  
   ATmega328 microcontroller processes sensor data  

3. **Communication Layer**  
   ESP8266 module handles wireless transmission  

---

## Tech Stack

### Hardware
- ATmega328 (Arduino Uno)  
- ESP8266 Wi-Fi Module  
- Current Sensor (CT-based)  
- Voltage Sensing Circuit  
- Voltage Regulators (5V, 3.3V)  
- Passive Components (Resistors, Capacitors, Diodes)  
- Breadboard / PCB  

### Software
- Arduino IDE  
- Embedded C/C++  

---

## Features
- Real-time voltage monitoring  
- Real-time current monitoring  
- Embedded data processing  
- Wireless communication capability  
- Modular system design  

---

## Setup Instructions

### 1. Hardware Setup
- Connect voltage and current sensors to the microcontroller  
- Interface ESP8266 using serial communication  
- Provide regulated power supply (5V / 3.3V)  

### 2. Firmware Upload
- Open Arduino IDE  
- Upload code to ATmega328  
- Upload ESP8266 firmware for communication  

---

## Limitations
- Accuracy depends on sensor calibration  
- Requires stable power supply  
- Limited to experimental and small-scale setups  

---

## Future Enhancements
- Improved sensor precision  
- Advanced data handling mechanisms  
- Expansion for multi-device monitoring  
- Integration of additional sensing parameters  

---

## Team Members
- Soham Rathod  
- Sumit Shah  
- Monil Patel  
- Tirth Ankleshwariya  

---

## License
This project is intended for educational and research purposes.

---

## Acknowledgment
Developed as part of an academic initiative focusing on embedded systems and IoT-based electrical monitoring.
