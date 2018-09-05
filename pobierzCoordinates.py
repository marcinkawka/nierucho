# -*- coding: utf-8 -*-
#
#	Getting coordinates, based on address in Warsaw
#
from pprint import pprint
import urllib, json
import csv
import sqlite3
import time

#to przestało działać
#prefix="http://www.punktyadresowe.pl/lokalizacja.php?adres=Warszawa,"


#to działa w sierpniu 2018
prefix="http://www.punktyadresowe.pl/ula/?Request=search&searchValue=Warszawa,%2520"
sufix="&crs=4326&format=json"

adres="Stawki 5/7"

url=prefix+urllib.quote(adres)+sufix


response = urllib.urlopen(url)
data = json.loads(response.read())
pprint(data['items'][0]['point_on_street_coordinates'][0])



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
	print(str(idd)+" "+addr.split(".")[0])
	url=prefix+(urllib.quote(addr.rstrip())) #rstrip usuwa spacę nakońcu
	url=url+sufix
	
	try:
		response = urllib.urlopen(url.encode('utf-8'))
		data = json.loads(response.read())

		if(len(data)>0 and len(data['items'])>0):
			longg=data['items'][0]['point_coordinates'][0]
			latt=data['items'][0]['point_coordinates'][1]
			print("Dodane "+str(longg)+' '+str(latt))
	
			cursor2.execute('UPDATE nieruchomosci1 set lat = ?, long = ? WHERE ID = ?',(latt,longg,idd))
			db.commit()
		else:
			print("Nie udało się znaleźć dla "+addr.split(".")[0])
			print(url)
	except ValueError:
		print("No JSON object")		
	
	time.sleep(3)

db.close()
