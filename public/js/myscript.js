//Global Variable's
let jsObject; // stor data recive when page loud  
let jsObjectPopup; //  store data recive when click on card
let jsObjectSearch; // stor data recive when using search
let jsObjectCaptured; // stor data recive when using search

let color = {       // store all HexCode color type pokemon
    "bug": "#3B9950",
    "dark": "#5A5979",
    "dragon": "#61CAD9",
    "electric": "#F5F45C",
    "fairy": "#EA1369",
    "fighting": "#EE6239",
    "fire": "#FB4D5A",
    "flying": "#92B3C8",
    "ghost": "#906790",
    "grass": "#2AC951",
    "ground": "#A9702C",
    "ice": "#86D2F5",
    "normal": "#CA98A7",
    "poison": "#9A69D9",
    "psychic": "#F81C91",
    "rock": "#8B3D22",
    "steel": "#42BD94",
    "water": "#86A8FC"
};

//Make First Character Capital
function capitalizeFirstChar(name){
    let str = name;
    let cap = str.substring(0, 1).toUpperCase() + str.substring(1);
    return cap;
}

//Create Card Pokemon
function createCard(){

    let typePokemon = [];
    let namePokemon = "";
    let isThisChecked = "";

    for(let i=0; i < jsObject.types.length; i++){
        const cap = capitalizeFirstChar(jsObject.types[i].type.name);
        typePokemon.push(" " + cap);        
    }
    //set type
    typePokemon.join();
    
    //set name 
    let indexcarret = jsObject.name.indexOf("-");
    if(indexcarret === -1){
        let temp = jsObject.name;
        namePokemon = capitalizeFirstChar(temp);
    }
    else {
        let temp = jsObject.name.slice(0, indexcarret);
        namePokemon = capitalizeFirstChar(temp);
    }
    
    //check is this pokemon checked or not
    if(localStorage.getItem("ID "+jsObject.id) != null){
        isThisChecked = "checked";
    }
    else {
        isThisChecked = "";
    }
    
    const innerTextCard = `
        <div class="card">
            <div onclick="appendPopup(this)">
                <span>
                    ${jsObject.id}
                </span>
                <img  class="responsive-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${jsObject.id}.png" alt="">
                <span class="name">
                    ${namePokemon}
                </span>
                <span class="type">
                    ${typePokemon}
                </span>
            </div>

            <div class="switch">
                <label>
                    <input type="checkbox" onClick="capturedByIndex(this,${jsObject.id})" ${isThisChecked}>
                    <span class="lever"></span>
                    Captured
                </label>
            </div>
        </div>
    `;

    let myRow = document.querySelector(".row-data");
    let myCard = document.createElement("div");
    myCard.className = "col s12 m6 l3";

    myCard.innerHTML = innerTextCard;
    myRow.appendChild(myCard);
}

//Get Data Pokemon Using API
function getPokemon(index){ 
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            //Convert Response to Js Object
            jsObject = JSON.parse(this.responseText);
            createCard();
        }
    };    
    
    myRequest.open(
        'GET',
        'https://pokeapi.co/api/v2/pokemon/'+ index +'',
        true);    
    myRequest.send();
}

//Carousal
$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
});

//Create Popup Menu
function appendPopup(id) {
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){

            //Convert Response to Js Object
            jsObjectPopup = JSON.parse(this.responseText);

            //create span of type button in modal
            let typeStr = "";
            for(let i=0; i < jsObjectPopup.types.length; i++){
                typeStr += `
                    <span style="color: ${color[jsObjectPopup.types[i].type.name]};border-color: ${color[jsObjectPopup.types[i].type.name]}">
                        ${jsObjectPopup.types[i].type.name}
                    </span>
                `;
            }

            //create ul of moves in modal
            let moveLi = "";
            let moveUl = "";
            for(let i=0; i < jsObjectPopup.moves.length && i < 70 ; i++){
                moveLi += `
                    <li>
                        ${jsObjectPopup.moves[i].move.name}
                    </li>
                `;
            }
            if(jsObjectPopup.moves.length === 0){
                moveLi += `
                    <li>
                        It Doesn't Have Any Move.
                    </li>
                `;
            }

            moveUl += `
                <ul>
                    ${moveLi}
                </ul>
            `;

            //create Modal/Popup menu
            const innerTextPopup = `
                <div class="inner">
                    <i class="material-icons close">close</i>
                    <img src="${jsObjectPopup.sprites.front_default}"/>
                    <h3>
                        ${jsObjectPopup.name}
                    </h3>
                    <hr/>
                    <h5>
                        Type(s)
                    </h5>
                    <div class="types">
                        ${typeStr}
                    </div>
                    <hr/>
                    <h5>
                        Stats
                    </h5>
                    <div class="box-stats">
                        <label>hp:</label>
                        <div class="progress-bar">
                            <span style="width: ${jsObjectPopup.stats[0].base_stat}%">
                                ${jsObjectPopup.stats[0].base_stat}%
                            </span>
                        </div>
                    </div>
                    <div class="box-stats">
                        <label>attack:</label>
                        <div class="progress-bar">
                            <span style="width: ${jsObjectPopup.stats[1].base_stat}%">
                                ${jsObjectPopup.stats[1].base_stat}%
                            </span>
                        </div>
                    </div>
                    <div class="box-stats">
                        <label>defense:</label>
                        <div class="progress-bar">
                            <span style="width: ${jsObjectPopup.stats[2].base_stat}%">
                                ${jsObjectPopup.stats[2].base_stat}%
                            </span>
                        </div>
                    </div>
                    <div class="box-stats">
                        <label>special-attack:</label>
                        <div class="progress-bar">
                            <span style="width: ${jsObjectPopup.stats[3].base_stat}%">
                                ${jsObjectPopup.stats[3].base_stat}%
                            </span>
                        </div>
                    </div>
                    <div class="box-stats">
                        <label>special-defense:</label>
                        <div class="progress-bar">
                            <span style="width: ${jsObjectPopup.stats[4].base_stat}%">
                                ${jsObjectPopup.stats[4].base_stat}%
                            </span>
                        </div>
                    </div>
                    <div class="box-stats">
                        <label>speed:</label>
                        <div class="progress-bar">
                            <span style="width: ${jsObjectPopup.stats[5].base_stat}%">
                                ${jsObjectPopup.stats[5].base_stat}%
                            </span>
                        </div>
                    </div>
                    <hr/>
                    <h5>
                        Moves
                    </h5>
                    ${moveUl}
                </div>
            `;
            let createPopup = document.createElement("div");
            createPopup.className = "popup";
            createPopup.innerHTML = innerTextPopup; 
            document.body.appendChild(createPopup);
            $(".popup").fadeIn();
            hidePopup();
        }
    };    
    
    myRequest.open(
        'GET',
        'https://pokeapi.co/api/v2/pokemon/'+ id.children[0].innerHTML.trim() +'',
        true);    
    myRequest.send();
}

//Hide Popup Menu
function hidePopup(){
    //Close popup
    $(".popup").click(function(){
        $(".popup").fadeOut();
        $(".popup").remove();
    });

    $(".popup .close").click(function(){
        $(".popup").fadeOut();
        $(".popup").remove();
    });

    $(".popup .inner").click(function(e){
        e.stopPropagation();
    });

    $(document).keydown(function(e){
        if(e.keyCode == 27){
            $(".popup").fadeOut();
            $(".popup").remove();
        }
    });
}

//Search By Name
function searchPokemon(){ 
    let myRow = document.querySelector(".row-data");
    myRow.innerHTML = '';
    let search = document.getElementById("search").value.trim().toLowerCase();
        
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            //Convert Response to Js Object
            jsObjectSearch = JSON.parse(this.responseText);
            let flag = 0;
            for(let i=0 ; i < 900; i++){
                if(jsObjectSearch.results[i].name === search){
                    getPokemon(i+1);
                    flag = 1;
                    let warning = document.querySelector(".error-search");
                    $(warning).fadeOut();
                    break;
                }
                else{

                }
            }
            if(flag === 0){
                let warning = document.querySelector(".error-search");
                $(warning).fadeIn();
            }
        }
    };    
    
    myRequest.open(
        'GET',
        'https://pokeapi.co/api/v2/pokemon/?limit=900&offset=0',
        true);    
    myRequest.send();
    
}

//Restore And Get Randome Data Pokemon 
function restoreData(){

    let warning = document.querySelector(".error-search");
    $(warning).fadeOut();
    document.getElementById("search").value = "";
        
    let myRow = document.querySelector(".row-data");
    myRow.innerHTML = '';
    //Get Pokemon Data From API
    for(let i=1; i <= 20; i++){
        getPokemon(Math.floor(Math.random() * 898) + 1);
    } 
}

function createCardForCaptured(){
    let typePokemon = [];
    let namePokemon = "";

    for(let i=0; i < jsObjectCaptured.types.length; i++){
        const cap = capitalizeFirstChar(jsObjectCaptured.types[i].type.name);
        typePokemon.push(" " + cap);        
    }
    //set type
    typePokemon.join();
    
    //set name 
    let indexcarret = jsObjectCaptured.name.indexOf("-");
    if(indexcarret === -1){
        let temp = jsObjectCaptured.name;
        namePokemon = capitalizeFirstChar(temp);
    }
    else {
        let temp = jsObjectCaptured.name.slice(0, indexcarret);
        namePokemon = capitalizeFirstChar(temp);
    }

    const innerTextCard = `
        <div class="card">
            <div onclick="appendPopup(this)">
                <span>
                    ${jsObjectCaptured.id}
                </span>
                <img  class="responsive-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${jsObjectCaptured.id}.png" alt="">
                <span class="name">
                    ${namePokemon}
                </span>
                <span class="type">
                    ${typePokemon}
                </span>
            </div>

            <div class="switch">
                <label>
                    <input type="checkbox" onClick="capturedByIndex(this,${jsObjectCaptured.id})" checked>
                    <span class="lever"></span>
                    Captured
                </label>
            </div>
        </div>
    `;

    let myRow = document.querySelector(".row-captured");
    let myCard = document.createElement("div");
    myCard.className = "col s12 m6 l3";

    myCard.innerHTML = innerTextCard;
    myRow.appendChild(myCard);
}

//Captured Pokemon To My List Pokemon
function capturedByIndex(x,index){

    if(x.checked){
        if(localStorage.getItem("ID "+index) != index){
            let myList = document.querySelector(".list-captured");
            myList.style.display = "block";
            localStorage.setItem("ID "+index, index);
            let myRequest = new XMLHttpRequest();
        
            myRequest.onreadystatechange = function(){
                if(this.readyState === 4 && this.status === 200){
                    //Convert Response to Js Object
                    jsObjectCaptured = JSON.parse(this.responseText);
                    createCardForCaptured();
                }
            };    
            
            myRequest.open(
                'GET',
                'https://pokeapi.co/api/v2/pokemon/'+ index +'',
                true);    
            myRequest.send();
        }
    }
    else{
        let myRow = document.querySelector(".row-data");
        let children = myRow.children;
        for (let i = 0; i < children.length; i++) {
            if(children[i].firstElementChild.firstElementChild.firstElementChild.textContent.trim() == index){
                children[i].firstElementChild.lastElementChild.firstElementChild.firstElementChild.checked = false;
            }        
        }
        localStorage.removeItem("ID "+index);
        getAllStorePokemon();
    }
    
    // alert(localStorage.getItem(localStorage.key(7)));
}

//Get All Pokemon Store In Local Storage
function getAllStorePokemon(){
    let myRow = document.querySelector(".row-captured");
    myRow.innerHTML = "";
    let myList = document.querySelector(".list-captured");

    if(localStorage.length > 0){
        myList.style.display = "block";
        for(let i = 0; i < localStorage.length; i++){
            let myRequest = new XMLHttpRequest();
        
            myRequest.onreadystatechange = function(){
                if(this.readyState === 4 && this.status === 200){
                    //Convert Response to Js Object
                    jsObjectCaptured = JSON.parse(this.responseText);
                    createCardForCaptured();
                }
            };    
            
            myRequest.open(
                'GET',
                'https://pokeapi.co/api/v2/pokemon/'+ localStorage.getItem(localStorage.key(i)) +'',
                true);    
            myRequest.send();
        }
    }else{
        myList.style.display = "none";
    }
}

//Ready State
$(document).ready(function(){
    
    //Load Screen

    // Navbar
    $('.sidenav').sidenav();

    //Get Pokemon Data From API
    for(let i=1; i <= 20; i++){
        getPokemon(Math.floor(Math.random() * 898) + 1);
    } 

    //Get All Pokemon Store In Local Storage
    getAllStorePokemon();


    //Initial Scroll To Top
    let spanUp = document.querySelector(".up");
    let achivement = document.querySelector(".our-achivement");
    window.onscroll = function(){
        if(this.scrollY >= 1000){
            spanUp.classList.add("show");
        }else{
            spanUp.classList.remove("show");
        }

        if(window.scrollY >= achivement.offsetTop - 600){
            //Fire Counter Our Achivment
            $(".count").countTo();
        }
    };

    //Click on Scroll To Top
    spanUp.onclick = function(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    //Loader OverLay
    window.onload = function(){
        $(".load-overlay").fadeOut(1000,function(){
            document.body.style.overflow = "auto";
        });
    };
});

