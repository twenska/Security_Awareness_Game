<?php

//$verbindung = mysql_connect("localhost","root","");
$verbindung = new mysqli('localhost', 'root', 'root', 'securitygame');

if (!$verbindung) {
   exit ( "keine Verbindung möglich");
   };

//Formular-Daten auslesen

/*

//Abfrage

$sql =


//echo $sql;

$ergebnis= mysql_query ( $sql, $verbindung);

$anzahl= mysql_num_rows($ergebnis) ;

if (!$anzahl) {      // !$anzahl: keine Datensätze
   exit("Es wurden keine Datensätze gefunden!");
   }

//Ausgabevorbereitung z. B. Tabelle


while ($datensatz= mysql_fetch_array($ergebnis))  {

//Ausgabe (Schleife)


};

// Serververbindung schließen
mysql_close($verbindung);
*/
?>