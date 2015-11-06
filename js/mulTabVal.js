$().ready(function () {
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

    mulTab();
    $('#mulTab').validate({
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
        var status = $('#mulTab').validate({
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
        status = status.currentForm;

        /* Check for error and focus on if there is one */
        if (status[0].inVal !== 'error' && status[1].className !== 'error' && status[2].inVal !== 'error' && status[3].inVal !== 'error') {
            mulTab();
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
            }
        }
    });
});

function mulTab() {
    /*Got help for parseInt from:
     *Source: http://stackoverflow.com/questions/7230553/reading-numbers-from-inputs-with-javascript-always-returns-nan
     *
     *.val() returns the value attibute */
    var rowSt = parseInt($('input[name=rowSt]').val()), //Row starting value
            rowEn = parseInt($('input[name=rowEn]').val()), //Row ending value
            colSt = parseInt($('input[name=colSt]').val()), //Column starting value
            colEn = parseInt($('input[name=colEn]').val()); //Column ending value
    var c = colSt; //To increment the column.

    //Check that the rows and column that the user inputted are actually numbers
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
        $('#table').html(table); //Source help from Professor Heines on Piazza: 
        //https://piazza.com/class/icm9jynacvn5kx?cid=26
    }
}

//Adds focus to the input boxes
$("input").focus(function () {
    $(this).next("span").css("display", "inline");
});

