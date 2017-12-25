# -*- coding: utf-8 -*-
#
#	Getting coordinates, based on address in Warsaw
#
from pprint import pprint
import urllib, json
import csv
import sqlite3
import time

prefix="http://www.punktyadresowe.pl/lokalizacja.php?adres=Warszawa,"
sufix="&crs=4326&format=json"

adres="ul. Stawki 5/7"

url=prefix+urllib.quote(adres)+sufix


#response = urllib.urlopen(url)
#data = json.loads(response.read())
#pprint(data['wyniki'][0]['wspolrzedne_punktu'])



db = sqlite3.connect('/home/marcin/Dropbox/nierucho/nierucho.sqlite')
db.text_factory = str
cursor = db.cursor()
cursor2 = db.cursor()	

i=0;	
for m in cursor.execute('SELECT ADRES,ID,LONG,LAT FROM nieruchomosci1 WHERE (long is NULL OR lat is NULL)'):
	
	addr=m[0].replace("..",".")
	
	if((addr.split("."))[0]=="Al"):
		addr=(addr.split("."))[1]
		
	idd=m[1]
	#print(str(idd)+" "+addr.split(".")[0])
	url=prefix+(urllib.quote(addr.rstrip())) #rstrip usuwa spacę nakońcu
	url=url+sufix
	
	response = urllib.urlopen(url.encode('utf-8'))
	data = json.loads(response.read())
	
	if(len(data)>0 and len(data['wyniki'])>0):
		print("Dodane "+addr.split(".")[0])
	
		cursor2.execute('UPDATE nieruchomosci1 set lat = ?, long = ? WHERE ID = ?',(data['wyniki'][0]['wspolrzedne_punktu'][1],data['wyniki'][0]['wspolrzedne_punktu'][0],idd))
		db.commit()
	else:
		print("Nie udało się znaleźć dla "+addr.split(".")[0])
		print(url)
			
	
	time.sleep(3)

db.close()
