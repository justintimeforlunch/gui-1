var story;
// Note to advanced students:
//   Do *NOT* use the jQuery getJSON function here, because in this 
// application the AJAX call has to be synchronous (that is, we need to 
// wait for it to be done before continuing), and the getJSON function 
// is always asynchronous.  Reference:
// http://stackoverflow.com/questions/2765411/is-it-possible-to-set-asyncfalse-to-getjson-call
//   The other approach is to change the global jQuery ajaxSetup option, 
// but this is controversial, as discussed on the referenced page.
jQuery.ajax({
    async: false,
    dataType: "json",
    url: "AThousandMiles.json",
    success: function (data) {
        story = data;
    }
});

jQuery(document).ready(function () {
    placeContent();
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
// N.B.  This version *does* apply the CSS.
    function placeContent() {
        var strContent = "";

        // create dynamic content from JSON
        strContent += "<h1 class='title'>" + story.title + "</h1>";
        strContent += "<h2 class='author'>by " + story.author + "</h2>";
        strContent += "<h2 class='album'>" + story.album + "</h2>";
        strContent += "<h3 class='date'>" + story.date + "</h3>";

        // Album cover
        strContent += "<img class='url' src='" + story.pic.url + "'</img>";

        // loop through all the hooks and verses.  
        for (var para = 0; para < story.song.verse1.length; para++) {
            strContent += "<span class=\"" + strFirstParaClass + "\">";
            for (var sent = 0; sent < story.song.verse1[para].length; sent++) {
                strContent += story.song.verse1[para][sent] + "&nbsp; ";
            }
            strContent += "</span>";
            strContent += "<br>";
        }

        strContent += "<br>";
        for (var para = 0; para < story.song.verse2.length; para++) {
            strContent += "<span class=\"" + strFirstParaClass + "\">";
            for (var sent = 0; sent < story.song.verse2[para].length; sent++) {
                strContent += story.song.verse2[para][sent] + "&nbsp; ";
            }
            strContent += "</span>";
            strContent += "<br>";
        }

        strContent += "<br>";
        for (var para = 0; para < story.song.verse3.length; para++) {
            strContent += "<span class=\"" + strFirstParaClass + "\">";
            for (var sent = 0; sent < story.song.verse3[para].length; sent++) {
                strContent += story.song.verse3[para][sent] + "&nbsp; ";
            }
            strContent += "</span>";
            strContent += "<br>";
        }

        strContent += "<br>";
        strContent += "<div class='hook'>" + story.hook + "</div>";
        for (var para = 0; para < story.song.hook.length; para++) {
            strContent += "<span id='bold' class=\"" + strFirstParaClass + "\">";
            for (var sent = 0; sent < story.song.hook[para].length; sent++) {
                strContent += story.song.hook[para][sent] + "&nbsp; ";
            }
            strContent += "</span>";
            strContent += "<br>";
        }

        strContent += "<br>";
        for (var para = 0; para < story.song.verse4.length; para++) {
            strContent += "<span class=\"" + strFirstParaClass + "\">";
            for (var sent = 0; sent < story.song.verse4[para].length; sent++) {
                strContent += story.song.verse4[para][sent] + "&nbsp; ";
            }
            strContent += "</span>";
            strContent += "<br>";
        }

        strContent += "<br>";
        for (var para = 0; para < story.song.verse5.length; para++) {
            strContent += "<span class=\"" + strFirstParaClass + "\">";
            for (var sent = 0; sent < story.song.verse5[para].length; sent++) {
                strContent += story.song.verse5[para][sent] + "&nbsp; ";
            }
            strContent += "</span>";
            strContent += "<br>";
        }

        strContent += "<br>";
        for (var para = 0; para < story.song.verse6.length; para++) {
            strContent += "<span class=\"" + strFirstParaClass + "\">";
            for (var sent = 0; sent < story.song.verse6[para].length; sent++) {
                strContent += story.song.verse6[para][sent] + "&nbsp; ";
            }
            strContent += "</span>";
            strContent += "<br>";
        }

        strContent += "<br>";
        strContent += "<div class='hook'>" + story.hook + "</div>";
        for (var para = 0; para < story.song.hook.length; para++) {
            strContent += "<span id='bold' class=\"" + strFirstParaClass + "\">";
            for (var sent = 0; sent < story.song.hook[para].length; sent++) {
                strContent += story.song.hook[para][sent] + "&nbsp; ";
            }
            strContent += "</span>";
            strContent += "<br>";
        }

        strContent += "<br>";
        for (var para = 0; para < story.song.verse7.length; para++) {
            strContent += "<span class=\"" + strFirstParaClass + "\">";
            for (var sent = 0; sent < story.song.verse7[para].length; sent++) {
                strContent += story.song.verse7[para][sent] + "&nbsp; ";
            }
            strContent += "</span>";
            strContent += "<br>";
        }

        strContent += "<br>";
        for (var para = 0; para < story.song.verse1.length; para++) {
            strContent += "<span class=\"" + strFirstParaClass + "\">";
            for (var sent = 0; sent < story.song.verse1[para].length; sent++) {
                strContent += story.song.verse1[para][sent] + "&nbsp; ";
            }
            strContent += "</span>";
            strContent += "<br>";
        }

        for (var para = 0; para < story.song.verse2.length; para++) {
            strContent += "<span class=\"" + strFirstParaClass + "\">";
            for (var sent = 0; sent < story.song.verse2[para].length; sent++) {
                strContent += story.song.verse2[para][sent] + "&nbsp; ";
            }
            strContent += "</span>";
            strContent += "<br>";
        }

        strContent += "<br>";
        for (var para = 0; para < story.song.verse8.length; para++) {
            strContent += "<span class=\"" + strFirstParaClass + "\">";
            for (var sent = 0; sent < story.song.verse8[para].length; sent++) {
                strContent += story.song.verse8[para][sent] + "&nbsp; ";
            }
            strContent += "</span>";
            strContent += "<br>";
        }

        strContent += "<br>";
        for (var para = 0; para < story.song.verse9.length; para++) {
            strContent += "<span class=\"" + strFirstParaClass + "\">";
            for (var sent = 0; sent < story.song.verse9[para].length; sent++) {
                strContent += story.song.verse9[para][sent] + "&nbsp; ";
            }
            strContent += "</span>";
            strContent += "<br>";
        }

        strContent += "<br>";
        for (var para = 0; para < story.song.verse10.length; para++) {
            strContent += "<span class=\"" + strFirstParaClass + "\">";
            for (var sent = 0; sent < story.song.verse10[para].length; sent++) {
                strContent += story.song.verse10[para][sent] + "&nbsp; ";
            }
            strContent += "</span>";
            strContent += "<br>";
        }

        strContent += "<hr>";


        // place dynamic content on page
        // document.getElementById( "content" ).innerHTML = strContent ;
        jQuery("#content").html(strContent);
    }