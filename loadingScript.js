const divPondeli = document.querySelector("#pondeli");
const divUtery = document.querySelector("#utery");
const divStreda = document.querySelector("#streda");
const divCtvrtek = document.querySelector("#ctvrtek");
const divPatek = document.querySelector("#patek");

console.log('loading js fired');
let params = new URLSearchParams(window.location.search);
var userdata = JSON.parse(params.get('data'));
console.log(params.get('username'));
AjaxPost();





//#region Post to php using ajax
function AjaxPost() {
    var username = params.get('username');
    var role = params.get('role');
    
    
    $.ajax({
            type : "POST",  //type of method
            url  : "loadingScript.php",  //your page
            data : { username : username, role : role},// passing the values
            success: function(res){  
                                    //do what you want here...
                                    
                                    let rozvrh = loadAjaxResponse(res);
                                    createRozvrh(rozvrh);
                    },
            error: function() {
              alert('Something went wrong. Server might not be running.');
            }
        });
   
}
//#endregion


function loadAjaxResponse(res){
        console.log("Res:"+res);
        res = JSON.parse(res);
        let rozvrh = {};
        
        rozvrh.pondeli =[];
        rozvrh.utery =[];
        rozvrh.streda =[];
        rozvrh.ctvrtek =[];
        rozvrh.patek =[];

        
        res.forEach(predmet => {
                if(predmet['Den'].toUpperCase() == 'PONDELI') rozvrh.pondeli.push(predmet);
                if(predmet['Den'].toUpperCase() == 'UTERY') rozvrh.utery.push(predmet);
                if(predmet['Den'].toUpperCase() == 'STREDA') rozvrh.streda.push(predmet);
                if(predmet['Den'].toUpperCase() == 'CTVRTEK') rozvrh.ctvrtek.push(predmet);
                if(predmet['Den'].toUpperCase() == 'PATEK') rozvrh.patek.push(predmet);
        });
        
        
        
        
        return rozvrh;
        
}


function createRozvrh(rozvrh){
        console.log("Rozvrh creation fired"); 
        console.log(rozvrh);
        instantiateRozvrh(rozvrh);

        console.log("Rozvrh created");
}

function instantiateRozvrh(rozvrh){
        console.log("Rozvrh instantiation fired"); 
        for(const den in rozvrh){
                console.log(`${den}, hodin: ${rozvrh[den].length}`);

                var denDiv = document.createElement('div');
                denDiv.className = 'row gx-0';
                denDiv.id = den;
                var denDivSpan = document.createElement('span');
                denDivSpan.className = 'col';
                denDivSpan.id = 'den';
                denDivSpan.innerHTML = den+':';
                denDiv.append(denDivSpan);

                rozvrh[den].forEach(predmetObjekt => {
                        console.log(predmetObjekt["Predmet"]);

                        var div = document.createElement('div');
                        div.id = 'predmet';
                        div.className = 'col gx-0';
                        

                        var divSpan = document.createElement('span');
                        divSpan.innerHTML = predmetObjekt["Predmet"] + '-' + predmetObjekt["ucitel"];

                        div.appendChild(divSpan);
                        
                        denDiv.appendChild(div);
                });

                
                document.querySelector('#rozvrh').appendChild(denDiv);
        }
        console.log("Rozvrh instantiation finished"); 
}
    