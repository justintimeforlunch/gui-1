/*                                                                                                                                                         
 Name: Justin Nguyen                                                                                                                                        
 Contact: justin_nguyen@student.uml.edu                                                                                                                     
 Major: Computer Science                                                                                                                                    
 School: University of Massachusetts Lowell                                                                                                                                                                                                                                                                                 
 Date Updated: December 8, 2015                                                                                                                          
 91.461 - GUI 1                                                                                                         
 Description: Assignment 9 - Implementing a Bit of Scrabble with Drag-and-Drop        
 Copyright [2015] by Justin Nguyen. All rights reserved.                                                                                                    
 May be freely copied or excerpted for educational purposes with credit to the author.                                                                      
 */

/* Credits to Professor Heines for creating the initial global array */
var ScrabbleTiles = [];
ScrabbleTiles[0] = {"letter": "A", "value": 1, "original_distribution": 9, "number_remaining": 9};
ScrabbleTiles[1] = {"letter": "B", "value": 3, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles[2] = {"letter": "C", "value": 3, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles[3] = {"letter": "D", "value": 2, "original_distribution": 4, "number_remaining": 4};
ScrabbleTiles[4] = {"letter": "E", "value": 1, "original_distribution": 12, "number_remaining": 12};
ScrabbleTiles[5] = {"letter": "F", "value": 4, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles[6] = {"letter": "G", "value": 2, "original_distribution": 3, "number_remaining": 3};
ScrabbleTiles[7] = {"letter": "H", "value": 4, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles[8] = {"letter": "I", "value": 1, "original_distribution": 9, "number_remaining": 9};
ScrabbleTiles[9] = {"letter": "J", "value": 8, "original_distribution": 1, "number_remaining": 1};
ScrabbleTiles[10] = {"letter": "K", "value": 5, "original_distribution": 1, "number_remaining": 1};
ScrabbleTiles[11] = {"letter": "L", "value": 1, "original_distribution": 4, "number_remaining": 4};
ScrabbleTiles[12] = {"letter": "M", "value": 3, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles[13] = {"letter": "N", "value": 1, "original_distribution": 6, "number_remaining": 6};
ScrabbleTiles[14] = {"letter": "O", "value": 1, "original_distribution": 8, "number_remaining": 8};
ScrabbleTiles[15] = {"letter": "P", "value": 3, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles[16] = {"letter": "Q", "value": 10, "original_distribution": 1, "number_remaining": 1};
ScrabbleTiles[17] = {"letter": "R", "value": 1, "original_distribution": 6, "number_remaining": 6};
ScrabbleTiles[18] = {"letter": "S", "value": 1, "original_distribution": 4, "number_remaining": 4};
ScrabbleTiles[19] = {"letter": "T", "value": 1, "original_distribution": 6, "number_remaining": 6};
ScrabbleTiles[20] = {"letter": "U", "value": 1, "original_distribution": 4, "number_remaining": 4};
ScrabbleTiles[21] = {"letter": "V", "value": 4, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles[22] = {"letter": "W", "value": 4, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles[23] = {"letter": "X", "value": 8, "original_distribution": 1, "number_remaining": 1};
ScrabbleTiles[24] = {"letter": "Y", "value": 4, "original_distribution": 2, "number_remaining": 2};
ScrabbleTiles[25] = {"letter": "Z", "value": 10, "original_distribution": 1, "number_remaining": 1};
ScrabbleTiles[26] = {"letter": "_", "value": 0, "original_distribution": 2, "number_remaining": 2};



//var alpha_value = ""; //created for testing purposes


/*Ready when page is loaded*/
$(document).ready(function () {
    generateTiles();
    generateBoard();
    toDragAndDrop();
}); //end ready

/*Global Variables*/
var tiles = ""; //generate letter tiles
var table = ""; //generate scrabble board
var score = 0;
var board = [];
var values = []; // holds the letter's value
var letters_placed = [];
var display_letters = "";
//var alphabet = ""; //created for testing purposes

//TODO: Fix tile placement. The droppable is taking the draggable on the bottom right of it.
function toDragAndDrop() {
    for (var i = 0; i < 7; i++) {
        $("#tile-drag_" + i).draggable({
            /*cursorAt: {//centers the mouse on the tile to drag
             top: 60,
             left: 130
             }*/
        }); //end draggable
    } //end for loop

    $(".drop-here").droppable({
        hoverClass: 'active',
        //I made droppable only accept one draggable from:
        //http://stackoverflow.com/questions/3948447/jquery-ui-droppable-only-accept-one-draggable
        drop: function (event, ui) {
            $(this).droppable('option', 'accept', ui.draggable);
            $(this).append(ui.draggable);

            var id = ui.draggable.attr("id"); //gets the id of thing object it's dragging

            var dropped = ui.draggable;
            var droppedOn = $(this);
            $(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);

            if ($(this).hasClass('drop-here')) {
                //$(this).addClass("tileOn");
                var last_digit = id.substr(id.length - 1); //gets the number that corresponses to the value of that letter
                if ($(this).hasClass('double_letter') || $(this).hasClass('double_word')) {
                    score += values[last_digit][1];
                }
                if ($(this).hasClass('triple_letter') || $(this).hasClass('triple_word'))
                {
                    var timesThree = values[last_digit][1] * 2;
                    score += timesThree;
                }
                score += values[last_digit][1]; //gets letter value and adds it to the score
                display_letters += letters_placed[last_digit][1]; //display what tiles have been placed on the board
                $('#letters').html(display_letters); //insert letters onto page
                $('#score').html(score); //insert score onto page
            }

        },
        out: function (event, ui) {
            $(this).droppable('option', 'accept', '.drag-item');
        }
    }); //end droppable   
} //end function toDragAndDrop

function generateTiles() {
    tiles = ""; //inserts the image of the tile corresponding to the letter
    //alphabet = ""; //keeps track of the randomized letters for testing purposes
    //alpha_value = ""; //keeps track for value for testing purposes

    //This gets 7 random letters from the ScrabbleTiles array
    //reference: http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
    for (var i = 0; i < 7; i++) {
        var value = Math.floor(Math.random() * ScrabbleTiles.length); //randomize a letter

        //check if number remaining of random letter is 0, if it is get a new letter  
        if (ScrabbleTiles[value].number_remaining === 0) {
            value = Math.floor(Math.random() * ScrabbleTiles.length);
        }
        var letter_value = ScrabbleTiles[value].letter;
        //alphabet += letter_value; //put the letters in an array for testing purposes

        var scrabble_url = "images/Scrabble_Tiles/Scrabble_Tile_";
        //inserts the id, class and image of the board pieces

        tiles += "<img id='tile-drag_" + i + "' class='board-piece" + letter_value + "' src='" + scrabble_url + letter_value + ".jpg" + "'></img>";
        //alpha_value += ScrabbleTiles[value].number_remaining -= 1; 

        var numRemaining = ScrabbleTiles[value].number_remaining;
        numRemaining = numRemaining - 1; //decrement number remaining of that tile

        values.push([i, ScrabbleTiles[value].value]);
        letters_placed.push([i, letter_value]);
        //console.log(values[i][1]);

    }
    $('#score').html(score);
    $('#tiles').html(tiles);
    //$('#alpha').html(alpha_value);
    //$('#rack').html(alphabet[3]);

}

//function to generate the scrabble board onto the page
function generateBoard() {
    table += '<table>'; //start of table
    //start inserting rows and since the board is symmetrical,
    //the same functions were called after row 8
    scrabbleRow1();
    scrabbleRow2();
    scrabbleRow3();
    scrabbleRow4();
    scrabbleRow5();
    scrabbleRow6();
    scrabbleRow7();
    scrabbleRow8();
    scrabbleRow7();
    scrabbleRow6();
    scrabbleRow5();
    scrabbleRow4();
    scrabbleRow3();
    scrabbleRow2();
    scrabbleRow1();
    table += '</table>'; //end of table
    $('#scrabble-board').html(table); //insert table into HTML
}

//each row of the scrabble board from 1-8
//credits to Jason Downing for providing the images for the scrabble board
function scrabbleRow1() {
    table += '<tr>';
    table += '<td class="triple_word drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="triple_word drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="triple_word drop-here"></td>';
}

function scrabbleRow2() {
    table += '<tr>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_word drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="triple_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="triple_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_word drop-here"></td>';
    table += '<td class="drop-here"></td>';
}

function scrabbleRow3() {
    table += '<tr>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_word drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_word drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
}

function scrabbleRow4() {
    table += '<tr>';
    table += '<td class="double_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_word drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_word drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_letter drop-here"></td>';
}

function scrabbleRow5() {
    table += '<tr>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_word drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_word drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
}

function scrabbleRow6() {
    table += '<tr>';
    table += '<td class="drop-here"></td>';
    table += '<td class="triple_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="triple_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="triple_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="triple_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
}

function scrabbleRow7() {
    table += '<tr>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
}

function scrabbleRow8() {
    table += '<tr>';
    table += '<td class="triple_word drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="star drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="double_letter drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="drop-here"></td>';
    table += '<td class="triple_word drop-here"></td>';
}
//end of generating the scrabble rows
