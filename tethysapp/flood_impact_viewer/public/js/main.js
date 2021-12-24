
$('#Country').change(function() {
   console.log('Travis')
   var selected = $('#Country').children(':selected').text()
   var provAttrs = document.querySelector('#Province').attributes
   console.log('selected is ', selected)
   provinces = []
   for (let i = 4; i < provAttrs.length; i++) {
      if (provAttrs[i].value.includes(selected)) {
         console.log(provAttrs[i].value)
         let selIndex = provAttrs[i].value.indexOf(selected)
         let prov = provAttrs[i].value.slice(selIndex+selected.length+4, provAttrs[i].value.length -2)
         provinces.push((prov, prov))
         console.log(prov)
         console.log('type = ', typeof prov)
      };
   };
   // ADD THE LIST OF PROVINCES TO $('#Province').options
})

