$("#form-group-Flood_Map_Type").hide();
$("#form-group-Return_Period").hide();
$("#form-group-Flood_Date").hide();
$("#form-group-Flow_Rate").hide();

$('#Country').change(function() {
   var selected = $('#Country').children(':selected').text()
   var provAttrs = document.querySelector('#Province').attributes
   provinces = ["Select a Province"]
   for (let i = 4; i < provAttrs.length; i++) {
      if (provAttrs[i].value.includes(selected)) {
         let selIndex = provAttrs[i].value.indexOf(selected)
         let prov = provAttrs[i].value.slice(selIndex+selected.length+4, provAttrs[i].value.length -2)
         provinces.push(prov)
      };
   };
   $('#Province').empty();

   $.each(provinces, function (index, value) {
    $('#Province').append($('<option/>', { 
        value: value,
        text : value 
    }));
   });
   let selected_option = $("#Province").val();
   $("#select2-Province-container").html(selected_option);
   if (selected === 'Select a Country') {
      $("#form-group-Province").hide();
      $("#form-group-Region").hide();
      $("#form-group-Flood_Map_Type").hide();
      $("#form-group-Return_Period").hide();
      $("#form-group-Flood_Date").hide();
      $("#form-group-Flow_Rate").hide();
   }
   else {
      $("#form-group-Province").show();
      $("#form-group-Region").hide();
      $("#form-group-Flood_Map_Type").hide();
      $("#form-group-Return_Period").hide();
      $("#form-group-Flood_Date").hide();
      $("#form-group-Flow_Rate").hide();
   }
});

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
   $("#select3-Region-container").html(selected_option);
 
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

$('#Flood_Map_Type').change( function() {
   let selectedFMT = $('#Flood_Map_Type').children(':selected').text()
   if (selectedFMT === 'Return Period') {
      $("#form-group-Return_Period").show();
      $("#form-group-Flood_Date").hide();
      $("#form-group-Flow_Rate").hide();
   }
   else if (selectedFMT === 'Flow Rate') {
      $("#form-group-Flow_Rate").show();
      $("#form-group-Return_Period").hide();
      $("#form-group-Flood_Date").hide();
   }
   else if (selectedFMT === 'Flood Date') {
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