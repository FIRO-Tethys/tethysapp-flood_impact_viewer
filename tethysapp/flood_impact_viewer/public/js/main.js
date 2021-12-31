
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
   $("#form-group-Province").show();

});

