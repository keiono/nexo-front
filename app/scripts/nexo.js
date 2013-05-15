var nexo = nexo || {};

//
// Process list of term ID JSON and display it as a Table.
//
(function () {
    "use strict";

    var UNNAMED_NEXO_TERM = "Unnamed functional unit";
    var MAX_DISPLAY_GENES = 10;

    var SearchResultRenderer = function () {

    };

    SearchResultRenderer.prototype.render = function (json) {

        console.log("Result: \n" + JSON.stringify(json));
        var rows = "<tr><th>ID</th><th>Name</th><th>Description</th><th>Assigned Genes</th></tr>";

        for (var i = 0; i < json.length; i++) {
            var term = json[i];

            // ID of the term
            var termID = term.name;

            // Name taken from best match or simply gene name
            var name = "";

            // Details about the term or list of assigned genes
            var description = "";

            // List of assigned genes
            var assignedGenes = "";

            // List of all genes
            var genes = term["Assigned Genes"];
            var bestAligned = term["Best Alignment Ontology"];

            if (termID.indexOf("S") === 0) {
                // This is a gene, not term.
                name = term["Term or Gene Label"];
                description = term['SGD Gene Description'];
                assignedGenes = "-";
            } else {
                // Regular term w/ aligned GO term

                var bp = term["BP Annotation"];
                var cc = term["CC Annotation"];
                var mf = term["MF Annotation"];

                var bpDef = term["BP Definition"];
                var ccDef = term["CC Definition"];
                var mfDef = term["MF Definition"];

                name = this.generateTermName(bestAligned, cc, bp, mf);
                description = this.generateTermDescription(bestAligned, ccDef, bpDef, mfDef);
                assignedGenes = this.generateGeneList(genes);
            }

            // Add actual DOM elements
            rows += "<tr><td><a href='/nexoview/" + termID + "'>";
            rows += termID;
            rows += "</a></td>";

            rows += "<td>";
            rows += name;
            rows += "</td>";

            rows += "<td>";
            rows += description;
            rows += "</td>";

            rows += "<td>";
            rows += assignedGenes;
            rows += "</td>";

            rows += "</tr>";
        }

        $("#result").append(rows).hide().fadeIn(1000);
    };

    SearchResultRenderer.prototype.generateGeneList = function (genes) {
        // Add list of genes as description
        var geneListElement = "";
        genes = genes.replace("[", "");
        genes = genes.replace("]", "");
        var geneList = genes.split(",");

        var numberOfGenes = geneList.length;
        var maxItr = MAX_DISPLAY_GENES;
        if(numberOfGenes<MAX_DISPLAY_GENES) {
            maxItr = numberOfGenes;
        }
        for (var geneCount = 0; geneCount < maxItr; geneCount++) {
            geneListElement += geneList[geneCount] + ", ";
        }

        if(numberOfGenes>MAX_DISPLAY_GENES) {
            geneListElement = geneListElement + "<a href='#'>...</a>";
        } else {
            geneListElement = geneListElement.substring(0, geneListElement.length -2);
        }
        return geneListElement;
    };

    SearchResultRenderer.prototype.generateTermName = function (best, cc, bp, mf) {
        var name  = "";

        if(cc === "" && bp == "" && mf == "") {
            return UNNAMED_NEXO_TERM;
        }

        if (best === "cc") {
            name = "<h4>CC: " + cc + "</h4>" +
                "BP: " + bp + ", MF" + mf;
        } else if (best === "bp") {
            name = "<h4>BP: " + bp + "</h4>" +
                "CC: " + cc + ", MF: " + mf;
        } else if (best === "mf") {
            name = "<h4>MF: " + mf + "</h4>" +
                "BP: " + bp + ", CC:" + cc;
        } else {
            name = UNNAMED_NEXO_TERM;
        }
        return name;
    };

    SearchResultRenderer.prototype.generateTermDescription = function (best, cc, bp, mf) {
        var description  = "";

        if (best === "cc" && cc != "") {
            description = cc;
        } else if (best === "bp" && bp != "") {
            description = bp;
        } else if (best === "mf" && mf != "") {
            description = mf;
        } else {
            description = "";
        }
        return description;
    };



    ///////////// Main/////////////
    $(function () {
        var renderer = new SearchResultRenderer();

        $("#search").click(function () {

            var searchTerm = $('#search-term').val();

            // Clear current rows
            $("#result").fadeOut(1000).empty();

            $.getJSON("/search/nexo/" + searchTerm, function (json) {
                renderer.render(json);
            });
        });
        //new nexo.NexoTermListView();
    });
})();
