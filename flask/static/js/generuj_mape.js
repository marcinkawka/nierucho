
var iconFeatures=[];
 /*
var text = '{"nierucho":['+
 '{"id":195,"long":21.0357230301,"lat":52.2563376761,"adres":"ul. Wilenska 9","cena":11 },'+ 
 '{"id":714,"long":20.9904972314,"lat":52.2526431237,"adres":"ul. Stawki 5/7","cena":4 },'+ 
 '{"id":743,"long":20.9927316386,"lat":52.2481079687,"adres":"ul. M. Anielewicza 11","cena":8 },'+ 
 '{"id":1005,"long":21.020447909,"lat":52.2257820706,"adres":"ul. Wilcza 9A","cena":10519 },'+ 
 '{"id":1078,"long":20.9865681186,"lat":52.2207452629,"adres":"ul. J. U. Niemcewicza 7/9","cena":40 },'+ 
 '{"id":1127,"long":20.9934453925,"lat":52.2452368975,"adres":"ul. Nowolipki 15","cena":3659 },'+ 
 '{"id":1729,"long":21.0433050263,"lat":52.2540381793,"adres":"ul. Zabkowska 30","cena":15 },'+ 
 '{"id":2170,"long":20.9802868025,"lat":52.2124865522,"adres":"ul. Wolnej Wszechnicy 4","cena":13 },'+ 
 '{"id":2195,"long":20.9930528288,"lat":52.2455045732,"adres":"ul. Nowolipki 10","cena":12 },'+ 
 '{"id":2228,"long":21.0087377411,"lat":52.2071212254,"adres":"al. Niepodleglosci 158","cena":11.48 },'+ 
 '{"id":2885,"long":20.9769776452,"lat":52.2198845566,"adres":"ul. T. Joteyki 20","cena":20 },'+ 
 '{"id":2968,"long":21.0251210286,"lat":52.1878320432,"adres":"ul. Pulawska 115","cena":38.5 },'+ 
 '{"id":3095,"long":20.9898026808,"lat":52.2244550852,"adres":"ul. Raszynska 3","cena":30 },'+ 
 '{"id":3100,"long":20.9792711069,"lat":52.220859022,"adres":"ul. Bialobrzeska 66A","cena":13 },'+ 
 '{"id":3262,"long":21.0185228368,"lat":52.218400998,"adres":"ul. Marszalkowska 27/35","cena":199440 },'+ 
 '{"id":4587,"long":21.0193910904,"lat":52.2337522061,"adres":"ul. Nowy Swiat 34","cena":200 },'+ 
 '{"id":4598,"long":21.045747411,"lat":52.2061216517,"adres":"ul. Luzycka 10","cena":11.5 },'+ 
 '{"id":4706,"long":20.9936408802,"lat":52.2255463731,"adres":"Al. Jerozolimskie 113/115","cena":40 },'+ 
 '{"id":5022,"long":21.0156480509,"lat":52.2240744516,"adres":"ul. Marszalkowska 60","cena":14 },'+ 
 '{"id":5040,"long":21.0159699857,"lat":52.2250186108,"adres":"ul. Wilcza 32","cena":40 },'+ 
 '{"id":5107,"long":20.955737497,"lat":52.2471912858,"adres":"ul. Obozowa 61","cena":17 },'+ 
 '{"id":5209,"long":21.0240735019,"lat":52.2369292403,"adres":"ul. Tamka 36","cena":40 },'+ 
 '{"id":5247,"long":21.0462933903,"lat":52.2173881522,"adres":"ul. Czerniakowska 126A","cena":20 },'+ 
 '{"id":5402,"long":20.9991366674,"lat":52.2504299836,"adres":"ul. gen. W. Andersa 10","cena":18 },'+ 
 '{"id":5946,"long":21.0074033025,"lat":52.1849749946,"adres":"ul. Samochodowa 3/5","cena":8 },'+ 
 '{"id":6122,"long":21.0149109839,"lat":52.2292509278,"adres":"ul. Nowogrodzka 23","cena":14 },'+ 
 '{"id":6175,"long":21.0080404096,"lat":52.207025499,"adres":"al. Niepodleglosci 165","cena":10.5 },'+ 
 '{"id":6310,"long":20.9919697215,"lat":52.2281680386,"adres":"ul. Twarda 64","cena":35.5 },'+ 
 '{"id":6706,"long":21.0086999259,"lat":52.2537260645,"adres":"Rynek Nowego Miasta 6/8/10","cena":9.17 }'+ 
']}';
 
var arr = JSON.parse(text);

for (var i = 0; i < arr["nierucho"].length; i++){
    var obj = arr["nierucho"][i];
	
	var iconFeature = new ol.Feature({
		geometry: new ol.geom.Point(ol.proj.transform([obj["long"],obj["lat"]], 'EPSG:4326',     
			'EPSG:3857')),
		atrybut1: obj["adres"]
	});
	iconFeatures.push(iconFeature);
}
*/
 var styleKeys = [ 'triangle', 'square'];
 
 var stroke = new ol.style.Stroke({color: 'black', width: 2});
var fill = new ol.style.Fill({color: 'red'});

var styles = {
        'square': new ol.style.Style({
          image: new ol.style.RegularShape({
            fill: fill,
            stroke: stroke,
            points: 4,
            radius: 10,
            angle: Math.PI / 4
          })
        }),
        'triangle': new ol.style.Style({
          image: new ol.style.RegularShape({
            fill: fill,
            stroke: stroke,
            points: 3,
            radius: 10,
            rotation: Math.PI / 4,
            angle: 0
          })
        })};
function getStyle2(rad){
	return new ol.style.Style({
          image: new ol.style.RegularShape({
            fill: new ol.style.Fill({color: [0,255,0]}),
            stroke: stroke,
            points: 4,
            radius: rad,
            angle: Math.PI / 4
          })})
}        
var iconStyle = new ol.style.Style({
  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    anchor: [0.5, 50],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    opacity: 0.75,
    src: 'http://hydrologia.net/~marcin/static/png/pointMarker.png'
  }))
});


for (var i = 0; i < arr2.length; i++){
    var obj = arr2[i];

	if(obj[1]!=null || obj[2]!=null){ //na wypadek pustych współrzędnych
		var iconFeature = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.transform([obj[1],obj[2]], 'EPSG:4326',     
				'EPSG:3857')),
			adres: obj[3],
			czynsz09: obj[4],
			czynsz10: obj[5],
			czynsz11: obj[6],
			czynsz12: obj[7],
			czynsz13: obj[8],
			czynsz14: obj[9],
			czynsz15: obj[10],
			czynsz16: obj[11],
			czynsz17: obj[12],
			dataPocz:obj[13],
			dataKonc: obj[14],
			umowa:	obj[15],
			stanPrawny:	obj[16],
			waloryzacja: obj[17],
			nazwa: obj[18],
			przeznaczenie: obj[19],
			powierzchnia1: obj[20],
			powierzchnia2: obj[21],
			
			info: obj[22],
			
		});
		/*var style=styles[styleKeys[Math.floor(Math.random() * 2)]];
		console.log(style.getImage().getRadius());
		style.getImage().radius=(Math.floor(Math.random() * 100))
			console.log(style.getImage().getRadius());
			*/
		iconFeature.setStyle(getStyle2(iconFeature.get('czynsz17')/10+5));
		iconFeatures.push(iconFeature);
	}
	/*,
	*/
}


var vectorSource = new ol.source.Vector({
  features: iconFeatures 
});



var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: styles['square'] //iconStyle
});



var map = new ol.Map({
        target: 'map',
        layers: [ new ol.layer.Tile({
                      source: new ol.source.OSM()
                      }),vectorLayer 
               ],
        view: new ol.View({
          center: ol.proj.fromLonLat([20.91, 52.32]),
          zoom: 10
        })         
          
        
});

var select = new ol.interaction.Select();
map.addInteraction(select);

   var selectedFeatures = select.getFeatures();

      // a DragBox interaction used to select features by drawing boxes
      var dragBox = new ol.interaction.DragBox({
        condition: ol.events.condition.platformModifierKeyOnly
      });

      map.addInteraction(dragBox);


      dragBox.on('boxend', function() {
        // features that intersect the box are added to the collection of
        // selected features
        var extent = dragBox.getGeometry().getExtent();
        vectorSource.forEachFeatureIntersectingExtent(extent, function(feature) {
          selectedFeatures.push(feature);
        });
      });
 
       // clear selection when drawing a new box and when clicking on the map
      dragBox.on('boxstart', function() {
        selectedFeatures.clear();
      });
      
      var infoBox = document.getElementById('result');
      var resultsTable = document.getElementById('resultsTable');
      
      selectedFeatures.on(['add', 'remove'], function() {
        var names = selectedFeatures.getArray().map(function(feature) {
          //console.log(feature.get('adres'));
          //console.log(feature.get('nazwa'));
          
          //return feature.get('atrybut1');
    
          return [feature.get('adres'),feature.get('nazwa'),feature.get('przeznaczenie'),
          feature.get('powierzchnia1'),feature.get('czynsz17'),feature.get('info')
          ];
        });
        
        if (names.length > 0) {
        //  infoBox.innerHTML = names.join(', ');
         // console.log(selectedFeatures.getArray())
           //to jest wywoływane dla każdego elementu, więc dodajemy tylko ostatni
          element=names[names.length-1];
          //console.log();
          
          row=resultsTable.insertRow(-1);
          
          cell=row.insertCell(-1);
          cell.innerHTML=element[0];
          cell=row.insertCell(-1);
          cell.innerHTML=element[1];
          cell=row.insertCell(-1);
          cell.innerHTML=element[2];
          cell=row.insertCell(-1);
          cell.innerHTML=element[3];
          cell=row.insertCell(-1);
          cell.innerHTML=element[4];
          cell=row.insertCell(-1);
          cell.innerHTML=element[5];
        } else {
          infoBox.innerHTML = 'Aby poznać szczegóły, trzymając <B>Ctrl</B> zaznacz myszką wybrane nieruchomości';
        
          var tableRows = resultsTable.getElementsByTagName('tr');
          var rowCount = tableRows.length;
          var tableHeaderRowCount = 1;
          
          for (var i = tableHeaderRowCount; i < rowCount; i++) {
                 resultsTable.deleteRow(tableHeaderRowCount);
            }
        }
      });
      
function log(msg) {

    result.innerHTML += msg + "<br>";
}
function logRange(bottomLeft,topRight){
	document.getElementById('range').innerHTML =bottomLeft[0].toFixed(4)+" "+
	bottomLeft[1].toFixed(4)+" "+
	topRight[0].toFixed(4)+" "+
	topRight[1].toFixed(4);

}
   

function onMoveEnd(evt) {
        var map = evt.map;
        var extent = map.getView().calculateExtent(map.getSize());
        var bottomLeft = ol.proj.transform(ol.extent.getBottomLeft(extent),
            'EPSG:3857', 'EPSG:4326');
        var topRight = ol.proj.transform(ol.extent.getTopRight(extent),
            'EPSG:3857', 'EPSG:4326');
		logRange(bottomLeft,topRight);
	
}


map.on('moveend', onMoveEnd);
