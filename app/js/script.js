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
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }


  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();

    $("#myTable tbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  // code

})(window);
