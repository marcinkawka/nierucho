#!/usr/bin/env python
# -*- coding: utf-8 -*- 

from random import randint
from flask import Flask
from flask import render_template
import sqlite3

baza="/home/marcin/nierucho/nierucho.sqlite"
    
app = Flask(__name__)

@app.route('/')
@app.route('/hello')
@app.route('/hello/<name>')


def hello(name=None):
	all_rows=get_nierucho()
	return render_template('default.html',rows=all_rows)
#just an apache test if WSGI works well
#        return render_template('test.html')
        
def get_nierucho():
	db = sqlite3.connect(baza)
	cursor = db.cursor()
#	cursor.execute('''SELECT id,long,lat,adres,cena_wywolawcza FROM test''')
#kolejność jest istotna -> ta sama kolejność będzie w JS.
	cursor.execute('''SELECT id,long,lat,adres,czynsz09,czynsz10,czynsz11,
	czynsz12,czynsz13,czynsz14,czynsz15,czynsz16, czynsz17 ,
	dataPocz,dataKonc,
	umowa,stanPrawny,waloryzacja,
	 nazwa,przeznaczenie,powierzchnia1,powierzchnia2,info FROM nieruchomosci1''')
	all_rows = cursor.fetchall()
	return all_rows;
	
#if __name__ == "__main__":
#    app.run(host='127.0.0.1')

