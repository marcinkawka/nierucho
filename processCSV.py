# -*- coding: utf-8 -*-
#
#	Parsing CSV files into SQLite database
#
#TODO: Porządek z cenami
from pprint import pprint
from datetime import datetime
import urllib, json
import csv
import sqlite3
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

db = sqlite3.connect('/home/marcin/Dropbox/nierucho/nierucho.sqlite')
db.text_factory = str
cursor = db.cursor()

with open('lokale2.csv','r') as csvfile:
	reader = csv.reader(csvfile, delimiter=',')
	i=0
	next(reader, None)  # skip the headers
	for row in reader:
		adres=(row[1].split("(")[0]).encode('utf8')
		przezna=row[2].encode('utf8')
		nazwa_podmiotu=row[3].encode('utf8')
		i=i+1
	
		try:
			pow1=float(row[4].replace(',','.'))
		except ValueError:
			
			pow1 =0 #powierzchnia w postaci stringa
			pow1str = str(row[4])
		
		#powierzchnia2 to powierzchnia do aneksu	
		try:
			pow2=float(row[5].replace(',','.'))
		except ValueError:
			pow2 =0
			pow2str = str(row[5])
		

		usyt=row[6].encode('utf8')
		info=row[7].encode('utf8')	
		
		czynszStr=""
		try:
			czynsz09=float(row[8].replace(',','.'))
		except ValueError:
			czynsz09 =0 
			if("".join(row[8].split())): #in case there is a text info
				czynszStr = czynszStr + str("2009: "+row[8]+"\n")
		
		try:
			czynsz10=float(row[9].replace(',','.'))
		except ValueError:
			czynsz10 =0
			if("".join(row[9].split())): #in case there is a text info 
				czynszStr = czynszStr + str("2010: "+row[9]+"\n")
		
		try:
			czynsz11=float(row[10].replace(',','.'))
		except ValueError:
			czynsz11 =0
			if("".join(row[10].split())): #in case there is a text info 
				czynszStr = czynszStr + str("2011: "+row[10]+"\n")
		
		try:
			czynsz12=float(row[11].replace(',','.'))
		except ValueError:
			czynsz12 =0
			if("".join(row[11].split())): #in case there is a text info 
				czynszStr = czynszStr + str("2012: "+row[11]+"\n")
		
		try:
			czynsz13=float(row[12].replace(',','.'))
		except ValueError:
			czynsz13 =0
			if("".join(row[12].split())): #in case there is a text info 
				czynszStr = czynszStr + str("2013: "+row[12]+"\n")
		try:
			czynsz14=float(row[13].replace(',','.'))
		except ValueError:
			czynsz14 =0
			if("".join(row[13].split())): #in case there is a text info 
				czynszStr = czynszStr + str("2014: "+row[13]+"\n")
		try:
			czynsz15=float(row[14].replace(',','.'))
		except ValueError:
			czynsz15 =0
			if("".join(row[14].split())): #in case there is a text info 
				czynszStr = czynszStr + str("2015: "+row[14]+"\n")
		try:
			czynsz16=float(row[15].replace(',','.'))
		except ValueError:
			czynsz16 =0
			if("".join(row[15].split())): #in case there is a text info 
				czynszStr = czynszStr + str("2016: "+row[15]+"\n")						
		try:
			czynsz17=float(row[16].replace(',','.'))
		except ValueError:
			czynsz17 =0
			if("".join(row[16].split())): #in case there is a text info 
				czynszStr = czynszStr + str("2017: "+row[16]+"\n")
				
		dataStr=row[17]
		data1="" #zabezpieczenei przed poprzednia wartościa
		data2=""
		dataPocz=""
		dataKoncowa =""
		daty=row[17].split('-')
		if(daty.__len__()>0):
			dataPocz=daty[0].replace(" ", "").replace("od","").replace("dnia","")
		
		try:
			data1 = datetime.strptime(dataPocz, '%d.%m.%Y')
		except ValueError:
			pass	#zostajemy przy dacie tekstowej
			
		if(daty.__len__()>1):
			dataKoncowa = daty[1].replace(" ", "").replace("do","").replace("dnia","")
		
		try:
			data2 = datetime.strptime(dataKoncowa, '%d.%m.%Y')
		except ValueError:
			pass	#zostajemy przy dacie tekstowej
		
		#Podstawa prawna użytkowania (Umowa + aneksy)
		umowa =str(row[18])
		
		#Uwagi dotyczące stanu prawnego
		stanPrawny	= str(row[19]);
		#Podstawa prawna nieprzeprowadzania waloryzacji
		waloryzacja = str(row[20]);
		
		#tu można zrobić dodatkową flage do bazy SQL
		typ=0
		if((waloryzacja.lower()).find("zwolnienie")>-1):
			typ=2
		
		if(waloryzacja.lower().find("jednostka")>-1):
			typ=1 #docelowo to powinno iść z bazy 
		
		cursor.execute('''INSERT INTO nieruchomosci1(ADRES, nazwa,przeznaczenie,powierzchnia1,powierzchnia2,info,usyt,
					czynsz09,czynsz10,czynsz11,czynsz12,czynsz13,czynsz14,czynsz15,czynsz16,czynsz17,czynszStr,
					dataPocz,dataKonc,dataStr,umowa,stanPrawny,waloryzacja,typSpecjalny) 
                  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)''', (adres,nazwa_podmiotu,przezna,pow1,pow2,info,usyt,
                  czynsz09,czynsz10,czynsz11,czynsz12,czynsz13,czynsz14,czynsz15,czynsz16,czynsz17,czynszStr,
                  data1,data2,dataStr,umowa,stanPrawny,waloryzacja,typ))
		db.commit()
		
		
		print(str(i)+" "+adres+"\t added")

	
