
$('#Country').change(function() {
   var selected = $('#Country').children(':selected').text()
   var provAttrs = document.querySelector('#Province').attributes
   console.log('selected is ', selected)
   provinces = ["Select a Province"]
   for (let i = 4; i < provAttrs.length; i++) {
      if (provAttrs[i].value.includes(selected)) {
         console.log(provAttrs[i].value)
         let selIndex = provAttrs[i].value.indexOf(selected)
         let prov = provAttrs[i].value.slice(selIndex+selected.length+4, provAttrs[i].value.length -2)
         provinces.push(prov)
         console.log(prov)
         console.log('type = ', typeof prov)
      };
   };
   console.log(provinces)
   
   // ADD THE LIST OF PROVINCES TO $('#Province').options
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
   }
   else {
      $("#form-group-Province").show();
   }

});

$('#Province').change(function() {
   let selectedProvince = $('#Province').children(':selected').text()
   let regAttrs = document.querySelector('#Region').attributes
   console.log('selected province: ', selectedProvince)
   regions = ["Select a Region"]
   for (let i = 4; i < regAttrs.length; i++) {
      if (regAttrs[i].value.includes(selectedProvince)) {
         console.log(regAttrs[i].value)
         let selIndex = regAttrs[i].value.indexOf(selectedProvince)
         let reg = regAttrs[i].value.slice(selIndex+selectedProvince.length+4, regAttrs[i].value.length -2)
         regions.push(reg)
         console.log(reg)
         console.log('type = ', typeof reg)
      };
   };
   console.log(regions)
   
   // ADD THE LIST OF PROVINCES TO $('#Province').options
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
   }
   else {
      $('#form-group-Region').show()
   }
})

