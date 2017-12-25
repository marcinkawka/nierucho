# -*- coding: utf-8 -*-
#
#	Parsing CSV files into SQLite database
#
#TODO: Porządek z cenami
from pprint import pprint
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
	spamreader = csv.reader(csvfile, delimiter=',')
	i=0
	for row in spamreader:
		adres=(row[1].split("(")[0]).encode('utf8')
		przezna=row[2].encode('utf8')
		nazwa_podmiotu=row[3].encode('utf8')
	'''	
		try:
			pow1=float(row[4])
		except ValueError:
			pow1 =-1
			
		try:
			pow2=float(row[5])
		except ValueError:
			pow2 =-1
			
		usyt=row[6].encode('utf8')
		info=row[7].encode('utf8')	
		#masa błędów w komórkach z czynszem
		try:
			czynsz17=float((row[16].split("(")[0]).replace(',','.')) #(brutto)
		except ValueError:
			czynsz17=-1
			
		#print(str(i)+" "+adres+"\t"+str(czynsz17)+"\t"+row[16])
'''
	#	cursor.execute('''INSERT INTO nieruchomosci1(ADRES, nazwa,przeznaczenie,powierzchnia1,info,czynsz)
     #             VALUES(?,?,?,?,?,?)''', (adres,nazwa_podmiotu,przezna,pow2,info,czynsz17))
	#	db.commit()
		
		
		print(str(i)+" "+adres+"\t added")

		i=i+1
