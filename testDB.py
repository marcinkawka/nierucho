# -*- coding: utf-8 -*-
#
#	Test select from test database
#
from pprint import pprint
import urllib, json
import csv
import sqlite3

# Create a database in RAM

db = sqlite3.connect('/home/marcin/Dropbox/nierucho/nierucho.sqlite')
cursor = db.cursor()
cursor.execute('''SELECT id,long,lat,adres,cena_wywolawcza FROM test''')

#user1 = cursor.fetchone() #retrieve the first row
#print(user1[0]) #Print the first column retrieved(user's name)

all_rows = cursor.fetchall()
for row in all_rows:
#	print('%s,%s,%s,%s,%s'%(row[0],row[1] , row[2],row[3],row[4]))
	print(' \'{"id":%s,"long":%s,"lat":%s,"adres":"%s","cena":%s },\'+ '%(row[0],row[1] , row[2],row[3],row[4]))
db.close()
