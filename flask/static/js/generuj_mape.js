
var iconFeatures=[];
var lastSelection=[];
 
var stroke = new ol.style.Stroke({color: 'black', width: 0.1});
var fill =   new ol.style.Fill({color: 'red'});



var circleStyle =  new ol.style.Style({
			image: new ol.style.Circle({
			fill: fill,
            stroke: stroke,
            radius: 5
			})
		});
function getStyle2Highlight(czynsz){
	return new ol.style.Style({
			image: new ol.style.Circle({
			fill: new ol.style.Fill({color: [100+0.5*czynsz , 50+0.5*czynsz ,0.5*czynsz]}),
            stroke: stroke,
            radius: 5+czynsz/10
			})
		})
}					       
function getStyle2(czynsz){
	return new ol.style.Style({
			image: new ol.style.Circle({
			fill: new ol.style.Fill({color: [50+0.5*czynsz ,100+0.5*czynsz ,0.5*czynsz]}),
			stroke: stroke,
			radius: 5+czynsz/10
                  })
        })	
}        

function getStylePowierzchnia(pow){
	return new ol.style.Style({
			image: new ol.style.Circle({
			fill: new ol.style.Fill({color: [10+0.2*pow ,200-0.5*pow ,30+0.5*pow]}),
			stroke: stroke,
			radius: 5+pow/10
                  })
        })	
}        


for (var i = 0; i < arr2.length; i++){
    var obj = arr2[i];

	if(obj[1]!=null || obj[2]!=null){ //na wypadek pustych współrzędnych
		var iconFeature = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.transform([obj[1],obj[2]], 'EPSG:4326', 'EPSG:3857')),
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
		/* Styl punktów narzucany jest per warstwa, tu tylko ustawiany jest promień
		 * 
		 * */
		iconFeature.setStyle(getStyle2(iconFeature.get('czynsz17')));
		//iconFeature.setStyle(getStylePowierzchnia(iconFeature.get('powierzchnia1')/7));
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
  style: circleStyle //iconStyle
});



var map = new ol.Map({
        target: 'map',
        layers: [ new ol.layer.Tile({
                      source: new ol.source.OSM()
                      }),vectorLayer 
               ],
        view: new ol.View({
          center: ol.proj.fromLonLat([20.9697, 52.2083]),
          zoom: 14
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
      
      selectedFeatures.on(['add'], function() {
        var names = selectedFeatures.getArray().map(function(feature) {
          
          feature.setStyle(getStyle2Highlight(feature.get('czynsz17')));
		  return [feature.get('adres'),feature.get('nazwa'),feature.get('przeznaczenie'),
			feature.get('powierzchnia1'),feature.get('czynsz17'),feature.get('info')
          ];
        });
              
        for(let ff of selectedFeatures.getArray())
        {	// dodawanie do tablicy zaznaczonych
          lastSelection.push(ff);
        }
        if (names.length > 0) {
          element=names[names.length-1];
          //dodawanie do tabelki
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
        }
      });
      
       selectedFeatures.on(['remove'], function() {
        var names = selectedFeatures.getArray().map(function(feature) {
          
          feature.setStyle(getStyle2(feature.get('czynsz17')));
		  return [feature.get('adres'),feature.get('nazwa'),feature.get('przeznaczenie'),
			feature.get('powierzchnia1'),feature.get('czynsz17'),feature.get('info')
          ];
        });
        for(let element of lastSelection){ //z iconFeatures jest skuteczne ale wolne.
      //    console.log(element.get('adres'));
          element.setStyle(getStyle2(element.get('czynsz17')));
          
        }
        infoBox.innerHTML = 'Aby poznać szczegóły, trzymając <B>Ctrl</B> zaznacz myszką wybrane nieruchomości na mapce powyżej';
        
          var tableRows = resultsTable.getElementsByTagName('tr');
          var rowCount = tableRows.length;
          var tableHeaderRowCount = 1;
          
          for (var i = tableHeaderRowCount; i < rowCount; i++) {
                 resultsTable.deleteRow(tableHeaderRowCount);
            }
       
      });
      
function log(msg) {

//    result.innerHTML += msg + "<br>";
}
function logRange(bottomLeft,topRight){
	// no longer in use
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
		
	
}


map.on('moveend', onMoveEnd);
