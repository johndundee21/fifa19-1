// * ---
// *
// *
// * external script filter.
// *
// * ---

;(function (window) {

  'use strict';

  $('._menuToggle').click(function () {
    $('.menu-layout').toggleClass('open');
  });

  function searchTabs() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      console.log('hhh');
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          tr[i].classList.add('-disabled');
        } else {
          tr[i].style.display = "none";
          tr[i].classList.remove('-disabled');
        }
      }
    }
  }


  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();

    $("#myTable tbody tr").filter(function() {
      console.log($(this).classList);
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  // code

})(window);
