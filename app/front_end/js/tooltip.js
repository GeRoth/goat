//import map, point,linestring,Overlay
import {map} from './map';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import Overlay from 'ol/Overlay';


var helpTooltip;
var listener_start;
var listener_end;
var tool_tip = function(interaction,modus){
    var sketch;  
   
		map.getOverlays().getArray().slice(0).forEach(function(overlay) {
						if (overlay.getProperties().element.id !='startaddresse'){																	
		 					map.removeOverlay(overlay);
						}		
		});

      var helpTooltipElement;

     
      
      var continueLineMsg = '<b>Single click to draw <br> Double click to finish</b>';
      var pointerMoveHandler = function(evt) {
        if (evt.dragging) {
          return;
        }
        /** @type {string} */
        var helpMsg = '<b>Click for starting to draw<b>';

        
        
		  if(modus=='point'){
				helpMsg = '<b>Click for Calculation</b>'          	
        }
                
        
        if (sketch) {
          var geom1 = (sketch.getGeometry());
          if (geom1 instanceof Point) {
            helpMsg = '<b>Click button again <br> for new calculation</b>';
          } else if (geom1 instanceof LineString) {
            helpMsg = continueLineMsg;
          }
         
        }
		  //console.log(sketch);
        helpTooltipElement.innerHTML = helpMsg;
        helpTooltip.setPosition(evt.coordinate);

        helpTooltipElement.classList.remove('hidden');
      };
      
      
      map.on('pointermove', pointerMoveHandler);

      map.getViewport().addEventListener('mouseout', function() {
        helpTooltipElement.classList.add('hidden');
      });

      var typeSelect = document.getElementById('type');


      function createHelpTooltip() {
        if (helpTooltipElement) {
          helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        }
        helpTooltipElement = document.createElement('div');
        helpTooltipElement.className = 'tooltip hidden';
        helpTooltip = new Overlay({
          element: helpTooltipElement,
          offset: [15, 0],
          positioning: 'center-left'
        });
        map.addOverlay(helpTooltip);
      }
      
      
      createHelpTooltip();
      
      listener_start = interaction.on('drawstart',
            function(evt) {
              // set sketch
              sketch = evt.feature;


            }, this);


      listener_end =  interaction.on('drawend',
            function() {
              if (modus != 'point'){
              sketch = null;
					}
            }, this);
      

///Abbrechen bei ESC
		$(document).keyup(function(e) {
     if (e.keyCode == 27) { 
     		map.removeInteraction(interaction);
     		map.getOverlays().getArray().slice(0).forEach(function(overlay) {
				if (overlay.getProperties().element.id !='startaddresse'){																					 					
		 					map.removeOverlay(overlay);
				}	
		});
    }
});


};

 
export {tool_tip};





var tool_info = {"Starting point calculation ":`You can press this button and click<br> 
                                at any visible place on the map for<br>
                                starting a calculation.`,
           "Load Ways Features":`You can load a subset of the road network into your map<br>
                                 by clicking the button and simply drawing a circle .`,          
                      "Drawing":`There are existing three ways of modifying the network.<br>
                                 You can draw a new way feature, delete an existing feature <br>
                                 or modify the shape of an existing feature.<br>`,
  "Add new lines to network ":`Once this button is clicked the drawn<br>
                                  lines are inserted into the routing<br>
                                  network. Depending on the number of drawn<br>
                                  features the calculation in the back-end<br> 
                                  can take a couple of seconds.`,
              "Travel Time (min) ":`The chosen tavel time is the maximum<br>
                                  travel time of the drawn isochrone and<br>
                                  is the maximum travel time when the<br>
                                  accessibility index gets calculated`, 
                 "Walking Speed ":`The average walking speed is<br>
                                  around 5 km/h, but it can vary depending<br>
                                  on the person.<br>`,
              "Number isochrones ":`The number of isochrones<br>
                                  defines how many isochrones are drawn,<br> 
                                  the division of the the selected travel time<br>
                                  and the number of isochrones is defining<br>
                                  the travel time interval.`,
           "Concavity isochrones ":`An isochrone (in this context) is defining<br> 
                                   the area, which can be reached in a certain<br>
                                   time. The input for creating the <br>
                                   isochrone are the reached points or network<br>
                                   For the calculating of a convex <br> 
                                   isochrone an polygon get spanned, with<br>
                                   the minimum area possible. Although this<br> 
                                   method is the fastest, it can be the least<br> 
                                   accurate. Therefore, it is possible<br> 
                                   to calculate concave hulls instead<br>
                                   Depending on the concavity the<br>
                                   area of the polygon is following more closely<br>
                                   the reached network. This can be an advantage<br>
                                   but also and disadvantage`,
              "Calculation modus ":`Once new links and nodes are added to<br>
                                   the network, it is possible to perform a<br> 
                                   calculation on the default network, on<br>
                                   the modified network or on both networks<br> 
                                   at the same time.`,
                           "GOAT":`<b>Geo Open Accessibility Tool (GOAT)</b><br>
                                    This is tool could be developed thanks to powerful open source<br>
                                    software and the OpenStreetMap-project.`,
                  "Choose basemap ":`You can choose betweeen different basemaps,<br>
                                     please consider if you want to select the<br> 
                                     most up-to-date basemap choose OSM-Standard,<br>
                                     OSM-Carto-DB-Light, OSM-Carto-DB-Dark or <br>
                                     PublicTransport.`        
};

                             
$("body").on('click','.fa-info-circle',function(){
  $('#tool_info').remove();
  var position_top = $(this).offset().top -70;
  $("body").append(`<div id="tool_info" style="border:#2FAC45 solid 1px;:margin-right:0px;position: absolute; z-index: 10001;left:14%;
   top: ${position_top}px; "><div style="background-color:#f8f8f8;padding:10px;"><i id="tool_info_cross" class="fa fa-times"style="font-size:16px"></i></div>
   <div style="font-family: Open Sans;background-color: #f8f8f8;padding: 10px;">${tool_info[$(this).parent().text()]}</div></div>`);
  
})

$("body").on('click','#tool_info_cross',function(){
  $("#tool_info").remove();
})


