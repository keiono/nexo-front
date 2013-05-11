/**
 * Created with JetBrains WebStorm.
 * User: kono
 * Date: 2013/05/10
 * Time: 13:31
 * To change this template use File | Settings | File Templates.
 */
$(function () {
    "use strict";

    var locUrl = location.href;
    var urlParts = locUrl.split("/");
    var termID = urlParts[urlParts.length - 1];

    console.log("Target ID = " + termID);

    $.getJSON("/nexo/" + termID, function (json) {

        console.log("Result: \n" + JSON.stringify(json));
        console.log("len: \n" + json.length);

        // Create score


        $("#summary-tab").append("<h3>" + json.name + "</h3>");
        $("#summary-tab").append("<table id='summary-table' class='table table-striped'></table>");
        $("#summary-table").append("<tr><td>Name</td><td>" + json["term name"] + "</td></tr>");
        $("#summary-table").append("<tr><td>DEF</td><td>" + json["def"] + "</td></tr>");
        $("#summary-table").append("<tr><td>Score</td><td>" + json["comment"] + "</td></tr>");

    });
});