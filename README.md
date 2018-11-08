# Security_Awareness_Game
A prototype of a Serious Game to teach employees IT-Security and add to other Security Awareness measures.

 Die Seite ist unter der Domain https://game.twenska.de gehostet.
 
 # Setup (Selber Hosten)
 (Hintergründe siehe Ausarbeitung)
Benötigte Software:
1. Apache
2. NodeJS
3. MySQL

Das hier verfügbare Verzeichnis "public_html" muss als root-Verzeichnis des Apache konfiguriert werden.
Einrichten der Weiterleitungen zum NodeJS via ProxyPass(https://stackoverflow.com/questions/8541182/apache-redirect-to-another-port)

  /fe -> localhost:3000
  
  /be -> localhost:3001

Zur Einrichtung der MySQL Datenbank muss das Skript DB_create_script.sql ausgeführt werden. (User mit entsprechender Berechtigung wird angelegt)
Testdaten befinden sich in dem Skript DB_test_data.sql

Zur Installation der NodeJS-Dependencies muss in den Verzeichnissen BE_Server und FE_Server der Befehl "npm install" ausgeführt werden.
Anschließend können die Nodejs Server mithilfe von "node Server.js" gestartet werden. Eventuelle Fehler werden in den standardout ausgegeben.

Die Dienste sollten möglichst in der Reihenfolge mysql -> BE_Server -> FE_Server gestartet werden.
Das Spiel sollte dann verfügbar sein.

# Mögliche Fehlerquellen

Verweise im Code auf die Domain (game.twenska.de):
  Anpassen der hosts Datei, sodass 127.0.0.1 auf game.twenska.de zeigt
  
Bei sonstigen Fehlern, Problemen oder Fragen stehe ich unter leon.twenning@krone.de zur Verfügung.
