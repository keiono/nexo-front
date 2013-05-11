var nexo = nexo || {};

//
// Process list of term ID JSON and display it as a Table.
//
$(function () {
    "use strict";

    $("#search").click(function () {

        var searchTerm = $('#search-term').val();
        console.log("Search start! FORM = " + searchTerm);

        // Clear current rows
        $("#result").fadeOut(1000).empty();

        $.getJSON("/search/nexo/" + searchTerm, function (json) {

            console.log("Result: \n" + JSON.stringify(json));
            console.log("len: \n" + json.length);

            var rows = "";

            var header = "<tr><th>Term ID</th><th>Name</th></tr>";
            $("#result").append(header);

            for (var i = 0; i < json.length; i++) {
                var term = json[i];
                var name = term.name.replace("NeXO:", "");
                var termName = term['term name'];

                rows += "<tr><td><a href='/nexoview/" + name + "'>";
                rows += name;
                rows += "</a></td>";

                rows += "<td>";
                rows += termName;
                rows += "</td>";

                rows += "</tr>";
            }

            console.log("ROWS = " + rows);
            $("#result").append(rows).hide().fadeIn(1000);
        });
    });
    //new nexo.NexoTermListView();
});