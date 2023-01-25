const divPondeli = document.querySelector("#pondeli");
const divUtery = document.querySelector("#utery");
const divStreda = document.querySelector("#streda");
const divCtvrtek = document.querySelector("#ctvrtek");
const divPatek = document.querySelector("#patek");


let params = new URLSearchParams(window.location.search);
var userdata = JSON.parse(params.get('data'));
console.log(params.get('username'));
AjaxPost();





//#region Post to php using ajax
function AjaxPost() {
    var username = params.get('username');
    
    
    $.ajax({
            type : "POST",  //type of method
            url  : "loadingScript.php",  //your page
            data : { username : username},// passing the values
            success: function(res){  
                                    //do what you want here...
                                    
                                    rozvrh = loadAjaxResponse(res);
                                    createRozvrh(rozvrh);
                    },
            error: function() {
              alert('Not Okay');
            }
        });
   
}
//#endregion


function loadAjaxResponse(res){
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
        console.log("Creating Rozvrh");
        console.log(rozvrh);
        for(const key in rozvrh){
                console.log(`${key}: ${rozvrh[key]}`);
        }

        

        rozvrh.forEach(den => 
        {       
                console.log(den);
                console.log(den['something'])
                var denDiv = document.createElement('div');
                denDiv.className = 'container';
                denDiv.id = den['den'];
                denDiv.innerHTML = den['den'];
                
                den.forEach(
                predmet => 
                {
                        var div = document.createElement('div');
                        div.id = den['predmet'];
                        div.innerHTML = 'xd';
                        
                        
                        denDiv.appendChild(div);
                })
                document.querySelector('#rozvrh').appendChild(denDiv);
        })

console.log("Rozvrh created");
}
    