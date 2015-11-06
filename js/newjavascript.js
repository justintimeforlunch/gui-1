$(document).ready(function () {
    genTable();
    $('#userInput').validate({
        //error rules
        rules: {
            numberOne: {
                required: true,
                digits: true
            },
            numberTwo: {
                required: true,
                digits: true
            },
            numberThree: {
                required: true,
                digits: true
            },
            numberFour: {
                required: true,
                digits: true
            }
        },
        //error messages for when there are errors
        messages: {
            numberOne: {
                required: " Please input a value for Top Min",
                digits: " Please input an integer"
            },
            numberTwo: {
                required: " Please input a value for Top Max",
                digits: " Please input an integer"
            },
            numberThree: {
                required: " Please input a value for Left Min",
                digits: " Please input an integer"
            },
            numberFour: {
                required: " Please input a value for Left Max",
                digits: " Please input an integer"
            }
        }
    });

    $('form').on('submit', function (e) {
        e.preventDefault();
        var cue = $('#userInput').validate({
            //error rules
            rules: {
                numberOne: {
                    required: true,
                    digits: true
                },
                numberTwo: {
                    required: true,
                    digits: true
                },
                numberThree: {
                    required: true,
                    digits: true
                },
                numberFour: {
                    required: true,
                    digits: true
                }
            },
            //error messages for when there are errors
            messages: {
                numberOne: {
                    required: " Please input a value for Top Min",
                    digits: " Please input an integer for Top Min"
                },
                numberTwo: {
                    required: " Please input a value for Top Max",
                    digits: " Please input an integer for Top Max"
                },
                numberThree: {
                    required: " Please input a value for Left Min",
                    digits: " Please input an integer for Left Min"
                },
                numberFour: {
                    required: " Please input a value for Left Max",
                    digits: " Please input an integer for Left Max"
                }
            }
        });
        cue = cue.currentForm;

        /*This code will check to see if an error exist, if so, 
         focus on where the error is located to the user.
         Update the status                                     */

        if (cue[0].className !== 'error' && cue[1].className != 'error' && cue[2].className != 'error' && cue[3].className != 'error') {
            genTable();
        } else {
            if (cue[0].className == 'error') {
                document.getElementById("numberOne").focus();
            }
            if (cue[1].className == 'error') {
                document.getElementById("numberTwo").focus();
            }
            if (cue[2].className == 'error') {
                document.getElementById("numberThree").focus();
            }
            if (cue[3].className == 'error') {
                document.getElementById("numberFour").focus();
            }
            $("#status").html("Invalid Input(s)");
        }
    });

});

/*This function is based of the following source but the function was modified to fit with the problem
 http://stackoverflow.com/questions/26004342/javascript-multiplication-table*/
function genTable() {
    var topMin = parseInt($('input[name=numberOne]').val());
    var topMax = parseInt($('input[name=numberTwo]').val());
    var leftMin = parseInt($('input[name=numberThree]').val());
    var leftMax = parseInt($('input[name=numberFour]').val());
    var col;
    var Switch = 0;

    /*check to see that topMin and topMax are in correct order*/
    if (topMax < topMin) {
        var temp = topMin;
        topMin = topMax;
        topMax = temp;
        Switch = 1;
        document.getElementById('numberOne').value = topMin;
        document.getElementById('numberTwo').value = topMax;
    }

    /*check to see that leftMin and leftMax are in correct order*/
    if (leftMax < leftMin) {
        var temp = leftMin;
        leftMin = leftMax;
        leftMax = temp;
        document.getElementById('numberThree').value = leftMin;
        document.getElementById('numberFour').value = leftMax;
        if (Switch == 1) {
            Switch = 3;
        } else {
            Switch = 2;
        }
    }

    /*check to see that topMin, topMax, leftMin, and leftMax have type 'number'*/
    if (typeof topMin === 'number' && typeof topMax === 'number' && typeof leftMin === 'number' && typeof leftMax === 'number') {

        var table = '<table>';
        table = '<tr>' + '<td class="topHeading">x</td>';

        /*place top row*/
        for (var x = topMin; x <= topMax; x++) {
            table += '<td class="topHeading">' + x + '</td>';
        }
        col = leftMin;
        /*start inserting table*/
        for (var i = leftMin; i <= leftMax; i++) {
            table += '<tr>';
            /*insert left column*/
            table += '<td class="leftHeading">' + col + '</td>';
            for (var j = topMin; j <= topMax; j++) {
                if (i == j) {
                    table += '<td class="blue">' + i * j + '</td>';
                } else {
                    table += '<td>' + i * j + '</td>';
                }
            }
            table += '</tr>';
            col++;
        }
        table += '</table>';
        $('#table').html(table);

        if (Switch == 1) {
            $("#status").html("Top Min value and Top Max value Switched");
            Switch = 0;
        } else if (Switch == 2) {
            $("#status").html("Left Min value and Left Max value Switched");
            Switch = 0;
        } else if (Switch == 3) {
            $("#status").html("Top Min value and Top Max value Switched | Left Min value and Left Max value Switched");
            Switch = 0;
        } else {
            $("#status").html("Valid Inputs");
        }
    }
}