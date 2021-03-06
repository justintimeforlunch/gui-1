/*                                                                                                                                                         
 Name: Justin Nguyen                                                                                                                                        
 Contact: justin_nguyen@student.uml.edu                                                                                                                     
 Major: Computer Science                                                                                                                                    
 School: University of Massachusetts Lowell                                                                                                                                                                                                                                                                                 
 Date Updated: November 19, 2015                                                                                                                          
 91.461 - GUI 1                                                                                                         
 Description: Assignment 8 - Using the jQuery UI Slider and Tab Widgets
 Copyright [2015] by Justin Nguyen. All rights reserved.                                                                                                    
 May be freely copied or excerpted for educational purposes with credit to the author.                                                                      
 */

$().ready(function () {
    var tabCount = 1;

    function incrementCount() {
        tabCount++;
    }
    mulTab(); //Create initial table
    /* Validator */
    /* Source: http://stackoverflow.com/questions/14347177/how-can-i-validate-that-the-max-field-is-greater-than-the-min-field
     *         Checks if Max is greater than min. If it is, if gives an error */
    $.validator.addMethod("greaterThan",
            function (value, element, param) {
                var $min = $(param);
                if (this.settings.onfocusout) {
                    $min.off(".validate-greaterThan").on("blur.validate-greaterThan", function () {
                        $(element).valid();
                    });
                }
                return parseInt(value) > parseInt($min.val());
            }, "Max must be greater than min");

    //mulTab(); //Create initial table
    var check = $('#mulTab').validate({
        rules: {
            rowSt: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            rowEn: {
                required: true,
                number: true,
                greaterThan: '#rowSt',
                range: [-50, 50]
            },
            colSt: {
                required: true,
                number: true,
                range: [-50, 50]
            },
            colEn: {
                required: true,
                number: true,
                greaterThan: '#colSt',
                range: [-50, 50]
            }
        },
        messages: {
            rowSt: {
                required: "Required: Please enter a valid number"
            },
            rowEn: {
                required: "Required: Please enter a valid number"
            },
            colSt: {
                required: "Required: Please enter a valid number"
            },
            colEn: {
                required: "Required: Please enter a valid number"
            }
        }
    });
    /* Prevents form from submitting if there is an error */
    $('#mulTab').on('submit', function (e) {
        e.preventDefault();
        var status = check;
        status = status.currentForm;

        /* Check for error and focus on if there is one */
        if (status[0].inVal !== 'error' && status[1].className !== 'error' && status[2].inVal !== 'error' && status[3].inVal !== 'error') {
            addTab();
            mulTab();
            createCheckBox(tabCount);
        } else {
            if (status[0].inVal === 'error') {
                document.getElementById("rowSt").focus();
            }
            if (status[1].inVal === 'error') {
                document.getElementById("rowEn").focus();
            }
            if (status[2].inVal === 'error') {
                document.getElementById("colSt").focus();
            }
            if (status[3].inVal === 'error') {
                document.getElementById("colEn").focus();
                checkVal = 0;
            }
        }
    });

    /* End validator */

    /* Dynamic Table */
    function mulTab() {
        /* Sliders for the table 
         * Sliders get init values 
         * slide: updates value
         * stop: refreshes values after slider stops
         */
        $("#slider1").slider({
            range: "max",
            min: -50,
            max: 50,
            value: parseInt($('input[name=rowSt]').val()),
            stop: function (e, ui) {
                $("#rowSt").val(ui.value);
                //addTab();
                //mulTab();
            }
        });

        $("#slider2").slider({
            range: "max",
            min: -50,
            max: 50,
            value: parseInt($('input[name=rowEn]').val()),
            stop: function (e, ui) {
                $("#rowEn").val(ui.value);
            }
        });

        $("#slider3").slider({
            range: "max",
            min: -50,
            max: 50,
            value: parseInt($('input[name=colSt]').val()),
            stop: function (e, ui) {
                $("#colSt").val(ui.value);
            }
        });

        $("#slider4").slider({
            range: "max",
            min: -50,
            max: 50,
            value: parseInt($('input[name=colEn]').val()),
            stop: function (e, ui) {
                $("#colEn").val(ui.value);
            }
        });

        /*Got help for parseInt from:
         *Source: http://stackoverflow.com/questions/7230553/reading-numbers-from-inputs-with-javascript-always-returns-nan
         *.val() returns the value attibute */

        /* Gets values from the sliders */
        var rowSt = $('#slider1').slider("value"), //parseInt($('input[name=rowSt]').val()), //Row starting value
                rowEn = $('#slider2').slider("value"), //parseInt($('input[name=rowEn]').val()), //Row ending value
                colSt = $('#slider3').slider("value"), //parseInt($('input[name=colSt]').val()), //Column starting value
                colEn = $('#slider4').slider("value");//parseInt($('input[name=colEn]').val()); //Column ending value
        var c = colSt; //To increment the column.

        /* Check that the rows and column that the user inputted are actually numbers */
        if (typeof rowSt === 'number' && typeof rowEn === 'number' && typeof colSt === 'number' && typeof colEn === 'number') {
            var table = '<table>';

            //start making the colomns and rows
            table = '<tr>' + '<td></td>';
            for (var i = rowSt; i <= rowEn; i++) {
                table += '<td>' + i + '</td>';
            }
            for (var j = colSt; j <= colEn; j++) {
                table += '<tr>';
                table += '<td>' + c + '</td>';
                for (var k = rowSt; k <= rowEn; k++) {
                    table += '<td>' + j * k + '</td>';
                }
                table += '</tr>';
                c++; //Increment the column number or else it won't change
            }
            table += '</table>';

            $('#table' + tabCount).html(table); 
            incrementCount();
        }
    }

//Adds focus to the input boxes
    $("input").focus(function () {
        $(this).next("span").css("display", "inline");
    });

    /* Worked with code from:
     * Source: http://jqueryui.com/tabs/#manipulation
     */
    var tabTitle = $("#tab_title"),
            tabContent = $("#tab_content"),
            tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
            tabCounter = 2;

    var tabs = $("#tabs").tabs();

    //Source help: Got advice on how to implement delete from a classmate since I was having trouble
      $("#remove_tabs").click( function() {
    	$('input:checkbox').each(function(){
            $('#tabs').tabs("option", "active", $("input:checkbox:not(:checked)"));
            $("#ch-" + ($(this).attr('id')).replace(/\D/g, '')).remove();
            $("#lb-" + ($(this).attr('id')).replace(/\D/g, '')).remove();
            $('#ui-id-' + ($(this).attr('id')).replace(/\D/g, '')).remove();
            $("#tabs-" + ($(this).attr('id')).replace(/\D/g, '')).remove();
            $("li[aria-controls='tabs-" + ($(this).attr('id')).replace(/\D/g, '') +"']").remove();            
           
    	});
    });
    //test remove
    /*$('#remove_tabs').click(function (e) {
        var num_tabs = $("#tabs > ul > li").size() + 1;
        //var panelId = $(this).closest("li").remove().attr("aria-controls");
        // Loop through each tabs and table and delete everything.
        for (var t = 2; t <= num_tabs; t++) {
            //$("#ch-" + t).remove();
            $("#table" + t).remove();
            $("#ui-id-" + t).remove();
            $("#tabs-" + t).remove();
            $("#id" + t).remove();
            //$("li[aria-controls='tabs-" + ($(this).attr('id')).replace(/\D/g, '') +"']").remove();    
            $('#tabs').tabs("option", "active", $("input:checkbox:not(:checked)"));
            $("li:has('a'):contains('#tab-" + t + "')").remove();
            //$("li:has('a'):contains('Tab')").remove();
        }
        $('#tabs').tabs("refresh");
    });*/
    
    function createCheckBox(index_tabs) {
        var checkbox = document.createElement("input");
        index_tabs--;
        
        checkbox.type = "checkbox";
        checkbox.name = "ch-" + index_tabs;
        checkbox.id = "ch-" + index_tabs;
        var label = document.createElement("label");
        // label.setAttribute("for", "tab-" + index_tabs);
        label.htmlFor = "ch-" + index_tabs;
        label.id = "lb-" + index_tabs;
        label.appendChild(document.createTextNode("tab-" + index_tabs));
        // Append checkbox to checkbox div.
        document.getElementById('check').appendChild(checkbox);
        document.getElementById('check').appendChild(label);
    }
    
    $('#selected_tabs').click(function () {
   
        var selected = [];
        $('input:checkbox:checked').each(function () {
            selected.push($(this).attr('id'));
        });
       
        for (var m = 0; m < selected.length; m++) {
            $("#ch-" + selected[m].replace(/\D/g, '')).remove();
            $("#lb-" + selected[m].replace(/\D/g, '')).remove();
            $("#tab-" + selected[m].replace(/\D/g, '')).remove();
            $('#ui-id-' + selected[m].replace(/\D/g, '')).remove();
            $("li[aria-controls='tabs-" + selected[m].replace(/\D/g, '') +"']").remove();
            //$('#tabs').tabs("option", "active", $("input:checkbox:not(:checked)"));
        }
        $('#tabs').tabs("refresh");
    });

    // actual addTab function: adds new tab using the input from the form above
    function addTab() {
        var rowStart = parseInt($('input[name=rowSt]').val()),
         rowEnd = parseInt($('input[name=rowEn]').val()),
         colStart = parseInt($('input[name=colSt]').val()),
         colEnd = parseInt($('input[name=colEn]').val());
        var label = tabTitle.val() || "Parameters(" + rowStart + "," + rowEnd + "," + colStart + "," + colEnd + ")",
                id = "tabs-" + tabCount,
                li = $(tabTemplate.replace(/#\{href\}/g, "#" + id).replace(/#\{label\}/g, label));

        tabs.find(".ui-tabs-nav").append(li);
        tabs.append("<div id='" + id + "'><div id=\"table" + tabCount + "\"></div></div>");      
        tabs.tabs("refresh");
        //('#tabs').tabs("option", "active", -1);
    }

    // close icon: removing the tab on click
    tabs.delegate("span.ui-icon-close", "click", function () {
        var panelId = $(this).closest("li").remove().attr("aria-controls");
        $("#" + panelId).remove();
        tabs.tabs("refresh");
    });

    tabs.bind("keyup", function (event) {
        if (event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE) {
            var panelId = tabs.find(".ui-tabs-active").remove().attr("aria-controls");
            $("#" + panelId).remove();
            tabs.tabs("refresh");
        }
    });
    
}); // end 
