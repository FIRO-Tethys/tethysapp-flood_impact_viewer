$("#form-group-Flood_Map_Type").hide();

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
   }
   else {
      $("#form-group-Province").show();
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
   }
   else {
      $('#form-group-Region').show()
   }
})

$('#Region').change(function() {
   let selectedRegion = $('#Region').children(':selected').text()
   if (selectedRegion === 'Select a Region') {
      $("#form-group-Flood_Map_Type").hide();
   }
   else {
      $("#form-group-Flood_Map_Type").show();
   }
})
