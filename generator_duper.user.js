// ==UserScript==
// @name         szukanie laseczek na grupkach xD
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  normalnie se szukasz laseczek na fb grupkach xD
// @author       jodua
// @include      https://www.facebook.com/*
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js
// ==/UserScript==

function checkIfLastA(data){
    var firstWord = data.replace(/ .*/,'');
    var last = firstWord.slice(-1);
    var gey = ["Kuba", "Łada"];
    if (last == "a"){
        if (!gey.includes(firstWord)){
            return true;
        }
    }
}
//+ $( this ).children().attr( "href" )
function listUsers() {
    var counter = 0;
    $('._60ri.fsl.fwb.fcb').each(function(i, obj) {
        var data = $( this ).text();
        if (checkIfLastA(data)==true) {
            counter+=1;
            $(".pam._grm.uiBoxWhite.noborder").append( "<span>" + $( this ).text() + " </span><a href='"+$( this ).children().attr( "href" ).replace(/&.*/,'')+"' target=_blank>Profil</a><br>" );
        }
    });
    $("._grt._50f8").append( "<strong style='color:black'>, ILOSC DUPER: </strong><span style='color:red'>" + counter + "</span><br>" );
    alert("Zakonczono szukanie duper");
}

function expandPage(){
    if ($('.pam.uiBoxLightblue.uiMorePagerPrimary').length) {
        $('.pam.uiBoxLightblue.uiMorePagerPrimary')[0].click();
        setTimeout(function(){
            expandPage();
        },250);
    }
    else{
        listUsers();
    }
}

function removeClasses(){
    $('#groupsMemberSection_self_bio').remove();
    $('#groupsMemberSection_admins_moderators').remove();
    $('#groupsMemberSection_friends').remove();
    $('#groupsMemberSection_things_in_common').remove();
    $('#groupsMemberSection_page_members').remove();
}

function startScript(){
    removeClasses();
    setTimeout(function(){
        expandPage();
    },200);
    buildResultsBox();
}

function buildResultsBox(){
    $(".pam._grm.uiBoxWhite.noborder").append( "<strong>MOCNE LASECZKI XD</strong><br>" );
}


function buildButton(){
    $("._4adk").append( "<button id='twoja_stara' class='_42ft _4jy0 _p _4jy4 _517h _51sy' style='background-color:#f44336;color:white;'>LASECZKI</button>" );
}

(function() {
    'use strict';
    buildButton();
    document.getElementById('twoja_stara').addEventListener("click", startScript);
})();
