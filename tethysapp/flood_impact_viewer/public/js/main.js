$("#form-group-Flood_Map_Type").hide();
$("#form-group-Return_Period").hide();
$("#form-group-Flood_Date").hide();
$("#form-group-Flow_Rate").hide();
//-------------------------------------------------------------------------
$('#Country').change(function() {
   var selected = $('#Country').children(':selected').text()
   var provAttrs = document.querySelector('#Province').attributes //provAttrs are all of the Province options (not just the ones corresponding to the selected country). provAttrs is a string-tuple (in python it was a tuple but in js its a string) like this '(<country>, <province>)'
   provinces = ["Select a Province"] // provinces will be the list of options corresponding to the selected country. "Select a Province" will be the first option and will be the default display
   for (let i = 4; i < provAttrs.length; i++) { //index 4 is where the provinces list starts in provAttrs. index 0 - 3 are things like id, class, name, etc.
      if (provAttrs[i].value.includes(selected)) { // if '(<country>, <province>)' includes the selected country
         let selIndex = provAttrs[i].value.indexOf(selected) // get the start index of the selected country
         let prov = provAttrs[i].value.slice(selIndex+selected.length+4, provAttrs[i].value.length -2) // prov = <province> from '(<country>,<province>)'
         provinces.push(prov) // add the province to the new list of provinces corresponding to the selected country
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
   let selectedProvince = $('#Province').children(':selected').text()
   let regAttrs = document.querySelector('#Region').attributes
   regions = ["Select a Region"]
   for (let i = 4; i < regAttrs.length; i++) {
      if (regAttrs[i].value.includes(selectedProvince)) {
         let selIndex = regAttrs[i].value.indexOf(selectedProvince)
         let reg = regAttrs[i].value.slice(selIndex+selectedProvince.length+4, regAttrs[i].value.length -2)
         regions.push(reg)
      };
   };
   $('#Region').empty();

   $.each(regions, function (index, value) {
    $('#Region').append($('<option/>', { 
        value: value,
        text : value 
    }));
   });
   let selected_option = $("#Region").val();
   $("#select2-Region-container").html(selected_option);
 
   if (selectedProvince === 'Select a Province') {
      $('#form-group-Region').hide()
      $("#form-group-Flood_Map_Type").hide();
      $("#form-group-Return_Period").hide();
      $("#form-group-Flood_Date").hide();
      $("#form-group-Flow_Rate").hide();
   }
   else {
      $('#form-group-Region').show()
      $("#form-group-Flood_Map_Type").hide();
      $("#form-group-Return_Period").hide();
      $("#form-group-Flood_Date").hide();
      $("#form-group-Flow_Rate").hide();
   }
})

//-------------------------------------------------------------------------

$('#Region').change(function() {
   let selectedRegion = $('#Region').children(':selected').text()
   if (selectedRegion === 'Select a Region') {
      $("#form-group-Flood_Map_Type").hide();
      $("#form-group-Return_Period").hide();
      $("#form-group-Flood_Date").hide();
      $("#form-group-Flow_Rate").hide();
   }
   else {
      fmtOpts = ['Select a Flood Map Type']
      let fmtChildren = document.querySelector('#Flood_Map_Type').children
      for (let i = 0; i < fmtChildren.length; i++){
         child = fmtChildren[i].value
         if (child === 'Return Period' && document.querySelector('#Return_Period').children.length > 1){
            fmtOpts.push(child)
         }
         if (child === 'Flow Rate' && document.querySelector('#Flow_Rate').children.length > 1){
            fmtOpts.push(child)
         }
         if (child === 'Flood Date' && document.querySelector('#Flood_Date').children.length > 1){
            fmtOpts.push(child)
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
   let selectedFMT = $('#Flood_Map_Type').children(':selected').text()
   let selectedCountry = $('#Country').children(':selected').text()
   let selectedProvince = $('#Province').children(':selected').text()
   let selectedRegion = $('#Region').children(':selected').text()

   if (selectedFMT === 'Return Period') {
      let retPerAttrs = document.querySelector('#Return_Period').attributes
      return_periods = ["Select a Return Period"]
      for (let i = 4; i < retPerAttrs.length; i++) {
         // console.log(retPerAttrs[i].textContent)
         if (retPerAttrs[i].value.includes(selectedProvince) && retPerAttrs[i].value.includes(selectedRegion)) {
            // let selProvIndex = regAttrs[i].value.indexOf(selectedProvince)
            let selRegIndex = retPerAttrs[i].value.indexOf(selectedRegion)
            let retPer = retPerAttrs[i].value.slice(selRegIndex+selectedRegion.length+4, retPerAttrs[i].value.length -2)
            // console.log(retPer)
            return_periods.push(retPer)
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
   }
   else if (selectedFMT === 'Flow Rate') {
      let flowRateAttrs = document.querySelector('#Flow_Rate').attributes
      flow_rates = ["Select a Flow Rate"]
      for (let i = 4; i < flowRateAttrs.length; i++) {
         console.log(flowRateAttrs[i].textContent)
         if (flowRateAttrs[i].value.includes(selectedProvince) && flowRateAttrs[i].value.includes(selectedRegion)) {
            // let selProvIndex = regAttrs[i].value.indexOf(selectedProvince)
            let selRegIndex = flowRateAttrs[i].value.indexOf(selectedRegion)
            let flowRate = flowRateAttrs[i].value.slice(selRegIndex+selectedRegion.length+4, flowRateAttrs[i].value.length -2)
            // console.log(retPer)
            flow_rates.push(flowRate)
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
   }
   else if (selectedFMT === 'Flood Date') {
      let floodDateAttrs = document.querySelector('#Flood_Date').attributes
      flood_dates = ["Select a Flood Date"]
      for (let i = 4; i < floodDateAttrs.length; i++) {
         console.log(floodDateAttrs[i].textContent)
         if (floodDateAttrs[i].value.includes(selectedProvince) && floodDateAttrs[i].value.includes(selectedRegion)) {
            // let selProvIndex = regAttrs[i].value.indexOf(selectedProvince)
            let selRegIndex = floodDateAttrs[i].value.indexOf(selectedRegion)
            let floodDate = floodDateAttrs[i].value.slice(selRegIndex+selectedRegion.length+4, floodDateAttrs[i].value.length -2)
            // console.log(retPer)
            flood_dates.push(floodDate)
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
   }
   else {
      $("#form-group-Return_Period").hide();
      $("#form-group-Flood_Date").hide();
      $("#form-group-Flow_Rate").hide();
   }
})