// ==UserScript==
// @name         generator_duper
// @namespace    generator_duper
// @version      1.0
// @description  Search through facebook groups to find girls
// @author       jodua
// @include      https://www.facebook.com/groups/*/members
// @grant        none
// @run-at       document-idle
// ==/UserScript==

function checkIfLastLetterEqualsA(data) {
    let firstWord = data.replace(/ .*/, '');
    let lastLetter = firstWord.slice(-1);
    var gey = ["Kuba"];
    if (lastLetter == "a" && !gey.includes(firstWord)) {
        return true;
    }
}

function listUsers() {
    let mainElementClass = document.getElementsByClassName('rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 aahdfvyu tvmbv18p');
    let mainElement = mainElementClass[0];
    let counter = 0;
    let userList = document.getElementsByClassName('oajrlxb2 g5ia77u1 qu0x051f esr5mh6w e9989ue4 r7d6kgcz rq0escxv nhd2j8a9 nc684nl6 p7hjln8o kvgmc6g5 cxmmr5t8 oygrvhab hcukyx3x jb3vyjys rz4wbd8a qt6c0cv9 a8nywdso i1ao9s8h esuyzwwr f1sip0of lzcic4wl oo9gr5id gpro0wi8 lrazzd5p');
    for (let user in userList) {
        let userNumber = Number(user);
        if (user != 0 && Number.isInteger(userNumber)) {
            let userName = userList[user].innerText;
            if (checkIfLastLetterEqualsA(userName)) {
                counter++;
                let node = document.createElement("a");
                let textNode = document.createTextNode(userName);
                node.target = "_blank";
                node.href = userList[user].href.replace(/\/groups\/[^\/]*\/user/,"");
                node.style.marginLeft = "10px";
                node.style.fontSize = "15px";
                node.appendChild(textNode);
                mainElement.appendChild(node);
                
            }
        }
    }
    let node = document.createElement("span");
    let textNode = document.createTextNode("Licznik duper: " + counter)
    node.style.color = "red";
    node.style.fontSize = "20px";
    node.style.fontWeight = "bold";
    node.style.textAlign = "center";
    node.appendChild(textNode);
    mainElement.appendChild(node);
    alert("Zakonczono szukanie duper");
}

function removeClasses() {
    let toBeRemoved = document.getElementsByClassName('rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t ofv0k9yr cwj9ozl2');
    for (let element in toBeRemoved) {
        let elementNumber = Number(element);
        if (elementNumber != 0 && Number.isInteger(elementNumber)){
            let innerTextStart = toBeRemoved[elementNumber].innerText.slice(0,3);
            if (innerTextStart!="New"){
                toBeRemoved[elementNumber].remove();
            }
        }
    }
}

function expandPage() {
    let pageLoader = document.getElementsByClassName('a8nywdso sj5x9vvc rz4wbd8a cxgpxx05 g9en0fbe');
    if (pageLoader.length == 1) {
        window.scrollTo(0, document.body.scrollHeight);
        setTimeout(() => {
            expandPage();
        }, 500);
    }
    else {
        listUsers();
        window.scrollTo(0, 0);
    }
}

function buildButton() {
    let navBarClass = document.getElementsByClassName('i09qtzwb rq0escxv n7fi1qx3 pmk7jnqg j9ispegn kr520xx4');
    let navBar = navBarClass[navBarClass.length - 1];
    let node = document.createElement("button");
    let textNode = document.createTextNode("LASECZKI");
    node.className = "bp9cbjyn rq0escxv j83agx80 pfnyh3mw frgo5egb l9j0dhe7 cb02d2ww hv4rvrfc dati1w0a";
    node.id = "twoja_stara";
    node.style.backgroundColor = "#f44336";
    node.style.color = "#fff";
    node.appendChild(textNode);
    navBar.appendChild(node);


}

function buildResultBox() {
    let mainElementClass = document.getElementsByClassName('rq0escxv l9j0dhe7 du4w35lb j83agx80 cbu4d94t pfnyh3mw d2edcug0 aahdfvyu tvmbv18p');
    let mainElement = mainElementClass[0];
    let node = document.createElement("span");
    let textNode = document.createTextNode("LISTA DUPEREK");
    node.style.fontSize = "20px";
    node.style.fontWeight = "bold";
    node.style.textAlign = "center";
    node.appendChild(textNode);
    mainElement.appendChild(node);

}

function startScript() {
    removeClasses();
    expandPage();
    document.getElementById('twoja_stara').removeEventListener("click", startScript);
    buildResultBox();
}


setTimeout(() => {
    buildButton();
    document.getElementById('twoja_stara').addEventListener("click", startScript);
    console.log("Script loaded");
}, 3000);