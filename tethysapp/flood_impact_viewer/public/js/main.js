
var flood_map_selected = false
var prev_flood_map_indx

$(document).ready(function() {
   $("#form-group-Flood_Map_Type").hide();
   $("#form-group-Return_Period").hide();
   $("#form-group-Flood_Date").hide();
   $("#form-group-Flow_Rate").hide();

   var map = TETHYS_MAP_VIEW.getMap();
   var layers = map.getLayers();
   // set all the floods maps to hidden
   layers.forEach(layer => {
      if(layer instanceof ol.layer.Vector){
         layer.setVisible(false);
      }
   });

   $('#Country').change(function() {
      var selected = $('#Country').children(':selected').text();
      var provAttrs = document.querySelector('#Province').attributes; //provAttrs are all of the Province options (not just the ones corresponding to the selected country). provAttrs is a string-tuple (in python it was a tuple but in js its a string) like this '(<country>, <province>)'
      provinces = ["Select a Province"]; // provinces will be the list of options corresponding to the selected country. "Select a Province" will be the first option and will be the default display
      for (let i = 4; i < provAttrs.length; i++) { //index 4 is where the provinces list starts in provAttrs. index 0 - 3 are things like id, class, name, etc.
         if (provAttrs[i].value.includes(selected)) { // if '(<country>, <province>)' includes the selected country
            let selIndex = provAttrs[i].value.indexOf(selected); // get the start index of the selected country
            let prov = provAttrs[i].value.slice(selIndex+selected.length+4, provAttrs[i].value.length -2); // prov = <province> from '(<country>,<province>)'
            provinces.push(prov); // add the province to the new list of provinces corresponding to the selected country
         };
      };
      $('#Province').empty(); //before this line, the Province dropdown had all provinces as options. This makes so the only options are those corresponding to the selected country

      //this block repopulates the province options with our defined options (Gio wrote this block)
      $.each(provinces, function (index, value) {
      $('#Province').append($('<option/>', { 
         value: value,
         text : value 
      }));
      });
      let selected_option = $("#Province").val();
      $("#select2-Province-container").html(selected_option);

      // if the selected country is the default option then hide all dropdowns below it
      if (selected === 'Select a Country') {
         $("#form-group-Province").hide();
         $("#form-group-Region").hide();
         $("#form-group-Flood_Map_Type").hide();
         $("#form-group-Return_Period").hide();
         $("#form-group-Flood_Date").hide();
         $("#form-group-Flow_Rate").hide();
      }
      // otherwise only show Province select but hide all others
      else {
         $("#form-group-Province").show();
         $("#form-group-Region").hide();
         $("#form-group-Flood_Map_Type").hide();
         $("#form-group-Return_Period").hide();
         $("#form-group-Flood_Date").hide();
         $("#form-group-Flow_Rate").hide();
      }
   });

   //-------------------------------------------------------------------------

   $('#Province').change(function() {
      let selectedProvince = $('#Province').children(':selected').text();
      // regAttrs is a js string '(<Province>,<Region>)'
      let regAttrs = document.querySelector('#Region').attributes;
      // set the initial option for regions  as 'Select a Region'
      regions = ["Select a Region"];
      for (let i = 4; i < regAttrs.length; i++) {
         // add to regions list the regions that are in the selected province
         if (regAttrs[i].value.includes(selectedProvince)) {
            let selIndex = regAttrs[i].value.indexOf(selectedProvince);
            let reg = regAttrs[i].value.slice(selIndex+selectedProvince.length+4, regAttrs[i].value.length -2);
            regions.push(reg);
         };
      };
      // empty the options from Region dropdown
      $('#Region').empty();

      $.each(regions, function (index, value) {
      $('#Region').append($('<option/>', { 
         value: value,
         text : value 
      }));
      });
      let selected_option = $("#Region").val();
      $("#select2-Region-container").html(selected_option);
      // if the selected option for province is the default, then hide its children dropdowns
      if (selectedProvince === 'Select a Province') {
         $('#form-group-Region').hide();
         $("#form-group-Flood_Map_Type").hide();
         $("#form-group-Return_Period").hide();
         $("#form-group-Flood_Date").hide();
         $("#form-group-Flow_Rate").hide();
      }
      // after a province is selected, show the region dropdown
      else {
         $('#form-group-Region').show();
         $("#form-group-Flood_Map_Type").hide();
         $("#form-group-Return_Period").hide();
         $("#form-group-Flood_Date").hide();
         $("#form-group-Flow_Rate").hide();
      }
   })

   //-------------------------------------------------------------------------

   $('#Region').change(function() {
      let selectedRegion = $('#Region').children(':selected').text();
      if (selectedRegion === 'Select a Region') {
         $("#form-group-Flood_Map_Type").hide();
         $("#form-group-Return_Period").hide();
         $("#form-group-Flood_Date").hide();
         $("#form-group-Flow_Rate").hide();
      }
      else {
         // fmtOpts (flood map type options)
         fmtOpts = ['Select a Flood Map Type'];
         let fmtChildren = document.querySelector('#Flood_Map_Type').children;
         for (let i = 0; i < fmtChildren.length; i++){
            child = fmtChildren[i].value;
            if (child === 'Return Period' && document.querySelector('#Return_Period').children.length > 1){
               fmtOpts.push(child);
            }
            if (child === 'Flow Rate' && document.querySelector('#Flow_Rate').children.length > 1){
               fmtOpts.push(child);
            }
            if (child === 'Flood Date' && document.querySelector('#Flood_Date').children.length > 1){
               fmtOpts.push(child);
            }
         };
         $('#Flood_Map_Type').empty();
         $.each(fmtOpts, function (index, value) {
            $('#Flood_Map_Type').append($('<option/>', { 
               value: value,
               text : value 
            }));
         });
         let selected_option = $("#Flood_Map_Type").val();
         $("#select2-Flood_Map_Type-container").html(selected_option);
         // if the document.querySelector('#Return_Period').children.length == 1 then don't add return_period to available opts
         $("#form-group-Flood_Map_Type").show();
         $("#form-group-Return_Period").hide();
         $("#form-group-Flood_Date").hide();
         $("#form-group-Flow_Rate").hide();
      };
   })

   //-------------------------------------------------------------------------

   $('#Flood_Map_Type').change( function() {
      let selectedFMT = $('#Flood_Map_Type').children(':selected').text();
      let selectedProvince = $('#Province').children(':selected').text();
      let selectedRegion = $('#Region').children(':selected').text();

      if (selectedFMT === 'Return Period') {
         let retPerAttrs = document.querySelector('#Return_Period').attributes
         return_periods = ["Select a Return Period"];
         for (let i = 4; i < retPerAttrs.length; i++) {
            if (retPerAttrs[i].value.includes(selectedProvince) && retPerAttrs[i].value.includes(selectedRegion)) {
               let selRegIndex = retPerAttrs[i].value.indexOf(selectedRegion);
               let retPer = retPerAttrs[i].value.slice(selRegIndex+selectedRegion.length+4, retPerAttrs[i].value.length -2)
               return_periods.push(retPer);
            };
         };
         $('#Return_Period').empty();

         $.each(return_periods, function (index, value) {
         $('#Return_Period').append($('<option/>', { 
            value: value,
            text : value 
         }));
         });
         let selected_option = $("#Return_Period").val();
         $("#select2-Return_Period-container").html(selected_option);

         $("#form-group-Return_Period").show();
         $("#form-group-Flood_Date").hide();
         $("#form-group-Flow_Rate").hide();
         hideFloodMap();
      }
      else if (selectedFMT === 'Flow Rate') {
         let flowRateAttrs = document.querySelector('#Flow_Rate').attributes;
         flow_rates = ["Select a Flow Rate"];
         for (let i = 4; i < flowRateAttrs.length; i++) {
            if (flowRateAttrs[i].value.includes(selectedProvince) && flowRateAttrs[i].value.includes(selectedRegion)) {
               let selRegIndex = flowRateAttrs[i].value.indexOf(selectedRegion);
               let flowRate = flowRateAttrs[i].value.slice(selRegIndex+selectedRegion.length+4, flowRateAttrs[i].value.length -2)
               flow_rates.push(flowRate);
            };
         };
         $('#Flow_Rate').empty();

         $.each(flow_rates, function (index, value) {
         $('#Flow_Rate').append($('<option/>', { 
            value: value,
            text : value 
         }));
         });
         let selected_option = $("#Flow_Rate").val();
         $("#select2-Flow_Rate-container").html(selected_option);

         $("#form-group-Flow_Rate").show();
         $("#form-group-Return_Period").hide();
         $("#form-group-Flood_Date").hide();
         hideFloodMap();
      }
      else if (selectedFMT === 'Flood Date') {
         let floodDateAttrs = document.querySelector('#Flood_Date').attributes;
         flood_dates = ["Select a Flood Date"];
         for (let i = 4; i < floodDateAttrs.length; i++) {
            if (floodDateAttrs[i].value.includes(selectedProvince) && floodDateAttrs[i].value.includes(selectedRegion)) {
               let selRegIndex = floodDateAttrs[i].value.indexOf(selectedRegion);
               let floodDate = floodDateAttrs[i].value.slice(selRegIndex+selectedRegion.length+4, floodDateAttrs[i].value.length -2);
               flood_dates.push(floodDate);
            };
         };
         $('#Flood_Date').empty();

         $.each(flood_dates, function (index, value) {
         $('#Flood_Date').append($('<option/>', { 
            value: value,
            text : value 
         }));
         });
         let selected_option = $("#Flood_Date").val();
         $("#select2-Flood_Date-container").html(selected_option);

         $("#form-group-Flood_Date").show();
         $("#form-group-Return_Period").hide();
         $("#form-group-Flow_Rate").hide();
         hideFloodMap();
      }
      else {
         $("#form-group-Return_Period").hide();
         $("#form-group-Flood_Date").hide();
         $("#form-group-Flow_Rate").hide();
         hideFloodMap();
      }

   })

   $('#Return_Period').change(function() {
      let selectedReturnPer = $('#Return_Period').children(':selected').text();
      hideMaps_showMap(selectedReturnPer);
      let floodMapsAttrs = document.querySelector('#Return_Period').attributes;
      let flood_map = '';
      for (let i=4; i < floodMapsAttrs.length; i++){
         if(floodMapsAttrs[i].value.includes($('#Province').val()) && 
         floodMapsAttrs[i].value.includes($('#Region').val()) &&
         floodMapsAttrs[i].value.includes($('#Return_Period').val())){
            startIndx = $('#Province').val().length + 6;
            endIndx = floodMapsAttrs[i].value.length - ($('#Region').val().length + $('#Return_Period').val().length + 10);
            flood_map = floodMapsAttrs[i].value.slice(startIndx, endIndx);
            centerOnFloodExtent(flood_map);
         }
      }
      // if a flood map has been selected (I.e. this is the second, third, etc. map to be selected)
      if (flood_map_selected){
         reset_impact_table_visibility(prev_flood_map_indx);
      }
      show_row_in_impact_table(flood_map);
      if (selectedReturnPer != 'Select a Return Period'){
         flood_map_selected = true
      }
   })

   $('#Flow_Rate').change(function() {
      let selectedFlowRate = $('#Flow_Rate').children(':selected').text();
      hideMaps_showMap(selectedFlowRate);
      let flowRatesAttrs = document.querySelector('#Flow_Rate').attributes;
      for (let i=4; i < flowRatesAttrs.length; i++){
         if(flowRatesAttrs[i].value.includes($('#Province').val()) && 
         flowRatesAttrs[i].value.includes($('#Region').val()) &&
         flowRatesAttrs[i].value.includes($('#Flow_Rate').val())){
            startIndx = $('#Province').val().length + 6;
            endIndx = flowRatesAttrs[i].value.length - ($('#Region').val().length + $('#Flow_Rate').val().length + 10);
            flood_map = flowRatesAttrs[i].value.slice(startIndx, endIndx);
            centerOnFloodExtent(flood_map);
         }
      }
      // if a flood map has been selected (I.e. this is the second, third, etc. map to be selected)
      if (flood_map_selected){
         reset_impact_table_visibility(prev_flood_map_indx)
      }
      show_row_in_impact_table(flood_map);

      if (selectedFlowRate != 'Select a Flow Rate'){
         flood_map_selected = true
      }
   })

   $('#Flood_Date').change(function() {
      let selectedFloodDate = $('#Flood_Date').children(':selected').text()
      hideMaps_showMap(selectedFloodDate);
      let floodDatesAttrs = document.querySelector('#Flood_Date').attributes;
      for (let i=4; i < floodDatesAttrs.length; i++){
         if(floodDatesAttrs[i].value.includes($('#Province').val()) && 
         floodDatesAttrs[i].value.includes($('#Region').val()) &&
         floodDatesAttrs[i].value.includes($('#Flood_Date').val())){
            startIndx = $('#Province').val().length + 6;
            endIndx = floodDatesAttrs[i].value.length - ($('#Region').val().length + $('#Flood_Date').val().length + 10);
            flood_map = floodDatesAttrs[i].value.slice(startIndx, endIndx);
            centerOnFloodExtent(flood_map);
         }
      }
      // if a flood map has been selected (I.e. this is the second, third, etc. map to be selected)
      if (flood_map_selected){
         reset_impact_table_visibility(prev_flood_map_indx)
      }
      show_row_in_impact_table(flood_map);

      if (selectedFloodDate != 'Select a Flood Date'){
         flood_map_selected = true
      }
   })
});
//-----------------------Helper Functions----------------------
function hideFloodMap(){
   var map = TETHYS_MAP_VIEW.getMap();
   var layers = map.getLayers();
   layers.forEach(layer => {
      if(layer instanceof ol.layer.Vector){
         layer.setVisible(false);
      }
   });
}

function hideMaps_showMap(selected){
   var map = TETHYS_MAP_VIEW.getMap();
   var layers = map.getLayers();
   layers.forEach(layer => {
      if(layer instanceof ol.layer.Vector){
         if(layer['tethys_legend_title'].includes(selected)){
            layer.setVisible(true);
         }
         else{
            layer.setVisible(false);
         }
      }
   });   
}

function centerOnFloodExtent(selected){
   var flood_layers = document.querySelector('#map_view').dataset.layers; // flood_layers is a string until make it a json in the next line
   var json_flood_layers = JSON.parse(flood_layers);
   var coords = []
   for (let i = 0; i < json_flood_layers.length; i++){
      if(json_flood_layers[i].legend_title == selected){
         var flood_map = JSON.parse(json_flood_layers[i].options);
         coords.push(flood_map.features[0].geometry.coordinates[0]);
         var poly = new ol.geom.Polygon(coords);
         TETHYS_MAP_VIEW.zoomToExtent(poly.getExtent());
      }
   }
}


function show_row_in_impact_table(flood_map){
   table_rows = document.querySelector('tbody').children
   for (let i=0; i<table_rows.length; i++){
      table_data = table_rows[i].children;
      for (let j=0; j<table_data.length; j++){
         if (table_data[j].innerHTML != flood_map){
            $('tbody > tr').eq(i).toggle();
         }
         else {
            prev_flood_map_indx = i
         }
      }
      
   }
}

function reset_impact_table_visibility(previous_flood_map_indx){
   table_rows = document.querySelector('tbody').children;
   for (let i=0; i<table_rows.length; i++){
      if(i != previous_flood_map_indx){
         $('tbody > tr').eq(i).toggle();   
      }
   }
   if (flood_map_selected){
      flood_map_selected = false
   }
   else {
      flood_map_selected = true
   }
}
//-----------------------End Helper Functions----------------------
