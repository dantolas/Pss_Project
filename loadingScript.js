//#region <Main code>
let params = new URLSearchParams(window.location.search);
var userdata = JSON.parse(params.get('data'));

const divPondeli = document.querySelector("#pondeli");
const divUtery = document.querySelector("#utery");
const divStreda = document.querySelector("#streda");
const divCtvrtek = document.querySelector("#ctvrtek");
const divPatek = document.querySelector("#patek");

const userInfo = document.querySelector("#loginInfoUser");
userInfo.innerHTML = userdata['prijmeni']+" "+userdata['jmeno'];

console.log('loading js fired');

console.log('Username:'+params.get('username'));
AjaxPostRozvrh();

if(params.get('role') == 'student'){
        AjaxPostTrida();
}else changeRozvrhTarget(userdata['username']);
//#endregion

//#region <Method that just changes the label on the page saying whose schedule it is>
function changeRozvrhTarget(labelText){
        const rozvrhTarget = document.querySelector("#rozvrhTarget");
                                    rozvrhTarget.innerHTML = labelText;
}
//#endregion

//#region <Post to php using ajax to get className>
function AjaxPostTrida() {
    var username = params.get('username');
    
    $.ajax({
            type : "POST",  //type of method
            url  : "loadingScript.php",  //your page
            data : { username : username, header : 'trida'},// passing the values
            success: function(res){  
                                    //do what you want here...
                                    
                                    changeRozvrhTarget(res);
                    },
            error: function() {
              alert('Something went wrong. Server might not be running.');
            }
        });
   
}
//#endregion

//#region <Post to php using ajax to get schedule>
function AjaxPostRozvrh() {
        var username = params.get('username');
        var role = params.get('role');
        
        
        $.ajax({
                type : "POST",  //type of method
                url  : "loadingScript.php",  //your page
                data : { username : username, role : role, header : 'rozvrh'},// passing the values
                success: function(res){  
                                        //do what you want here...
                                        
                                        let rozvrh = loadAjaxPostResponse(res);
                                        createRozvrh(rozvrh);
                        },
                error: function() {
                  alert('Something went wrong. Server might not be running.');
                }
            });
       
    }
    //#endregion


//#region <Takes response from AjaxPost() and builds the basic schedule skeleton>
function loadAjaxPostResponse(res){
        console.log("Res:"+res);
        res = JSON.parse(res);
        let rozvrh = {};
        
        rozvrh.pondeli =[];
        rozvrh.utery =[];
        rozvrh.streda =[];
        rozvrh.ctvrtek =[];
        rozvrh.patek =[];

        
        res.forEach(predmet => {
                if(predmet == undefined || predmet == null ) return;
                if(predmet['Den'] == null) return;
                if(predmet['Den'].toUpperCase() == 'PONDELI') rozvrh.pondeli.push(predmet);
                if(predmet['Den'].toUpperCase() == 'UTERY') rozvrh.utery.push(predmet);
                if(predmet['Den'].toUpperCase() == 'STREDA') rozvrh.streda.push(predmet);
                if(predmet['Den'].toUpperCase() == 'CTVRTEK') rozvrh.ctvrtek.push(predmet);
                if(predmet['Den'].toUpperCase() == 'PATEK') rozvrh.patek.push(predmet);
                
        });
        
        
        
        
        return rozvrh;
        
}
//#endregion

//#region <Creating rozvrh>
function createRozvrh(rozvrh){
        console.log("Rozvrh creation fired"); 
        
        instantiateRozvrh(rozvrh);

        console.log("Rozvrh created");
}
//#endregion

//#region <Instantiating rozvrh - child method to createRozvrh()>
function instantiateRozvrh(rozvrh){
        console.log("Rozvrh instantiation fired"); 
        //#region Instantiating times 
        function  instantiateTimes(){
                var row = document.createElement('div');
                row.className = 'row mb-1';
                row.id = 'row';

                var rowSpan = document.createElement('span');
                rowSpan.className = 'col-md-1';
                rowSpan.id = 'cas';
                rowSpan.innerHTML = '';
                row.append(rowSpan);
                
                let casy = [];
                casy.push('7:30 - 8:15');
                casy.push('8:25 - 9:10');
                casy.push('9:20 - 10:05');
                casy.push('10:20 - 11:05');
                casy.push('11:15 - 12:00');
                casy.push('12:10 - 12:55');
                casy.push('13:05 - 13:50');
                casy.push('14:00 - 14:45');
                casy.push('14:55 - 15:40');
                casy.push('15:50 - 16:35');
               

                for(let i = 0; i < 10; i++){

                        var div = document.createElement('div');
                        div.id = 'predmet';
                        div.className = 'col-1';
                        

                        var divSpan = document.createElement('span');
                        divSpan.innerHTML = casy[i];
                        

                        div.appendChild(divSpan);
                        
                        row.appendChild(div);
                }
                document.querySelector('#rozvrh').appendChild(row);
        }

        instantiateTimes();
        //#endregion




        //#region Instantiating all days and all lessons
        for(const den in rozvrh){
                

                var row = document.createElement('div');
                row.className = 'row ml-1 row-cols-lg-10 row-cols-md-10';
                row.id = 'row';

                var rowSpan = document.createElement('span');
                rowSpan.className = 'col-1';
                rowSpan.id = 'den';
                rowSpan.innerHTML = den+':';
                row.append(rowSpan);

                rozvrh[den].forEach(predmetObjekt => {
                        
                        var div = document.createElement('div');
                        div.id = 'predmet';
                        div.className = 'col-md-1';
                        

                        var divSpan = document.createElement('span');
                        if(predmetObjekt['ucitel'] != undefined){
                                divSpan.innerHTML = predmetObjekt["Predmet"] + '-' + predmetObjekt["ucitel"];   
                        }else{divSpan.innerHTML = predmetObjekt["Predmet"];}
                        

                        div.appendChild(divSpan);
                        
                        row.appendChild(div);
                });

                
                document.querySelector('#rozvrh').appendChild(row);
        }
        //#endregion
        console.log("Rozvrh instantiation finished"); 
}
//#endregion
    