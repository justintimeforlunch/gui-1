jQuery(document).ready(function () {
    mulTab();
    $('form').on('submit', function (event) { //src: http://stackoverflow.com/questions/1357118/event-preventdefault-vs-return-false
        event.preventDefault();
        mulTab();
    });
});

var strFirstParaClass = "";
var strNavString = navigator.userAgent;
// console.log( navigator.userAgent ) ;
// console.log( strNavString ) ;
if (strNavString.indexOf("Firefox") !== -1) {
    strFirstParaClass = "Firefox";
} else if (strNavString.indexOf("Chrome") !== -1) {
    strFirstParaClass = "Chrome";
} else if (strNavString.indexOf("Safari") !== -1) {
    strFirstParaClass = "Safari";
}

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

    /* Pre-reqs for entering numbers */
    /* Check to make sure that the end ranges are larger than the starting range */
    if (rowSt > rowEn) {
        alert("You need to input a larger number!");
        return false;
    }
    if (colSt > colEn) {
        alert("You need to input a larger number!");
        return false;
    }

    //Check if they have have entered anything
    if (rowSt === null || rowSt === "" ||
            rowEn === null || rowEn === "" ||
            colSt === null || colSt === "" ||
            colEn === null || colEn === "") {
        alert("You are missing a number in a field!");
        return false;
    }

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
    else {
        alert("You have entered something that isn't a number. Please try again.");
    }
}