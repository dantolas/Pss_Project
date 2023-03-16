//#region <Main code>

//#region <Variable declaration>
let params = new URLSearchParams(window.location.search);
var userdata;


console.log('loading js fired');
AjaxPostUser(params.get('id'),params.get('role'));

const userInfo = document.querySelector("#loginInfoUser");
userInfo.innerHTML = userdata['prijmeni']+" "+userdata['jmeno'];


const classList = [];
AjaxPostClassList();
const teacherList = [];
AjaxPostTeacherList();

//#endregion

//Getting the default rozvrh by user login info
AjaxPostRozvrh(userdata['username'],userdata['role']);

if(params.get('role') == 'student'){
        AjaxPostTrida(userdata['username']);
}else changeRozvrhTarget(userdata['username'][0].toUpperCase()+userdata['username'].slice(1));

//#region <Dropdown menu>
const dropdown = document.querySelector('#dropdown');
const rozvrhSelector = document.querySelector('#rozvrhSelector');
rozvrhSelector.addEventListener('click',function(){
        clearChildren(document.querySelector('#rozvrh'));
        dropdown.innerHTML = "Rozvrh";
        AjaxPostRozvrh(userdata['username'],userdata['role']);
}) 

const suplSelector = document.querySelector('#suplSelector');
suplSelector.addEventListener('click',function(){
        clearChildren(document.querySelector('#rozvrh'));

        dropdown.innerHTML = "Suplování";
        AjaxPostSupl(userdata['username'],userdata['role']);
})
//#endregion

//#region <Search bar>
const searchBar = document.querySelector("#searchBar");

searchBar.addEventListener('keyup',function(e){
        console.log(e);
        clearChildren(document.querySelector("#myDropdown"));
        const searchString = e.target.value.toUpperCase();
        let filteredList = [];
        if(searchString.length > 0){

                 filteredList = classList.filter((classname) => {
                        return (
                                classname.toUpperCase().includes(searchString)
                        )
                })

                if(filteredList.length == 0){
                        filteredList = teacherList.filter((teacherName) =>{
                                return(
                                        teacherName.toUpperCase().includes(searchString)
                                )
                        }) 
                }
        }

        if(filteredList.length > 0){

                

                filteredList.forEach(element => {

                        

                        const searchDropdownItem = document.createElement('a');
                        searchDropdownItem.innerHTML = element;
                        searchDropdownItem.className = "";
                        searchDropdownItem.href = "google.com";
                        searchDropdownItem.id = "searchItem";

                        searchDropdownItem.addEventListener('click',function(){

                        });
        
                        document.querySelector("#myDropdown").appendChild(searchDropdownItem);
                        console.log("Appended:"+element);
                        
                });
                
                
                console.log(document.querySelector("#myDropdown"));
                
        }
        
        console.log(filteredList);

        
        

});


const searchIcon = document.querySelector("#searchIcon");

searchIcon.addEventListener('mousedown',function(){
        searchIcon.style.background = "	#808588";
        searchIcon.style.borderRadius = "5px";
})


searchIcon.addEventListener('click',function(){
        console.log("Search fired.");
        searchIcon.style.background = "inherit";
        console.log(searchBar.value);

        var reg = new RegExp("^[a-zA-Z_.-]{1}\\d{1}[a-zA-Z_.-]*$")

        if(reg.test(searchBar.value)){
                clearChildren(document.querySelector('#rozvrh'));
                AjaxPostRozvrhClass(searchBar.value);
                return;  
        }


        
});

//#endregion

//#endregion

//#region <Name Change>
function changeRozvrhTarget(labelText){
        const rozvrhTarget = document.querySelector("#rozvrhTarget");
                                    rozvrhTarget.innerHTML = labelText;
}
//#endregion

//#region <Ajax Posts to php>

//#region <Clear rozvrh> 
function clearChildren(node){
        console.log('Clearing rozvrh.');
        while(node.firstChild){
                node.removeChild(node.lastChild);
        }
        dropdown.innerHTML = node.innerHTML;
}
//#endregion

//#region <Get classname>
function AjaxPostTrida(username) {
    
    
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

//#region <Get classList>
function AjaxPostClassList() {
    
    
        $.ajax({
                type : "POST",  //type of method
                url  : "loadingScript.php",  //your page
                data : {header : 'classList'},// passing the values
                success: function(res){  
                                        //do what you want here...
                                        

                                        jsonObject = JSON.parse(res);

                                        jsonObject.forEach(classObject =>{
                                                classList.push(classObject.nazev)
                                        });

                                        // for(const classObject in jsonObject){
                                        //         classList.push(classObject.nazev);
                                        // }
                                        
                        },
                error: function() {
                  alert('Something went wrong. Server might not be running.');
                }
            });
       
    }
//#endregion

//#region <Get teacherList>
function AjaxPostTeacherList() {
    
    
        $.ajax({
                type : "POST",  //type of method
                url  : "loadingScript.php",  //your page
                data : {header : 'teacherList'},// passing the values
                success: function(res){  
                                        //do what you want here...
                                        

                                        jsonObject = JSON.parse(res);

                                        jsonObject.forEach(teacherObject =>{
                                                teacherList.push(teacherObject.jmeno + " " + teacherObject.prijmeni);
                                        });

                                        
                        },
                error: function() {
                  alert('Something went wrong. Server might not be running.');
                }
            });
       
    }
//#endregion

//#region <Get userinfo>
function AjaxPostUser(id,role) {
    
    
        $.ajax({
                type : "POST",  //type of method
                url  : "loadingScript.php",  //your page
                data : {id:id,role:role, header : 'user'},// passing the values
                success: function(res){  
                                        //do what you want here...
                                        userdata = JSON.parse(res);
                        },
                error: function() {
                  alert('Something went wrong. Server might not be running.');
                },
                async : false
            });
       
    }
    //#endregion

//#region <Get schedule via USERNAME>
function AjaxPostRozvrh(username,role) {
        console.log(username);
        $.ajax({
                type : "POST",  //type of method
                url  : "loadingScript.php",  //your page
                data : { username : username, role : role, header : 'rozvrh'},// passing the values
                success: function(res){  
                                        //do what you want here...
                                        
                                        let rozvrh = createRozvrhSkeleton(res);
                                        createRozvrh(rozvrh);
                        },
                error: function() {
                  alert('Something went wrong. Server might not be running.');
                }
            });
       
    }
//#endregion

//#region <Get schedule via CLASSNAME>
function AjaxPostRozvrhClass(trida) {
        
        
        $.ajax({
                type : "POST",  //type of method
                url  : "loadingScript.php",  //your page
                data : { trida : trida, header : 'rozvrh_trida'},// passing the values
                success: function(res){  
                                        //do what you want here...
                                        console.log(res);
                                        let rozvrh = createRozvrhSkeleton(res);
                                        createRozvrh(rozvrh);
                        },
                error: function() {
                  alert('Something went wrong. Server might not be running.');
                }
            });
       
    }
//#endregion

//#region <Get supplementary schedule>
function AjaxPostSupl(username, role) {
        
        
        
        $.ajax({
                type : "POST",  //type of method
                url  : "loadingScript.php",  //your page
                data : { username : username, role : role, header : 'rozvrh'},// passing the values
                success: function(res){  
                                        //do what you want here...
                                        
                                        let rozvrh = createSuplRozvrhSkeleton(res);
                                        createRozvrh(rozvrh);
                        },
                error: function() {
                  alert('Something went wrong. Server might not be running.');
                }
            });
       
    }
//#endregion


//#endregion

//#region <Remove element by reference>
function removeArrayElement(array,element){
        let index = array.indexOf(element);
        if(index !== -1) {
                array.splice(index, 1);
        }   
}
//#endregion

//#region <Takes response from AjaxPosts and builds the basic supplementary schedule skeleton>
function createSuplRozvrhSkeleton(res){
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

        function removeNonChangedLessons(rozvrh){

                Object.keys(rozvrh).forEach(key => {
                        rozvrh[key].forEach(predmet =>{
                                rozvrh[key].forEach(jinejPredmet =>{
                                        if(predmet['poradi'] == jinejPredmet['poradi'] && predmet != jinejPredmet){
                                                if(predmet['nahradni'] == 1){
                                                        removeArrayElement(rozvrh[key],jinejPredmet);
                                                        return;
                                                        }else if(jinejPredmet['nahradni'] == 1){
                                                        removeArrayElement(rozvrh[key],predmet);
                                                        return;
                                                        }   
                                        }
                                })
                        })
                });
        }
        
        removeNonChangedLessons(rozvrh);
        return rozvrh;
}
//#endregion

//#region <Takes response from AjaxPosts and builds the basic schedule skeleton>
function createRozvrhSkeleton(res){
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
        
        function removeChangedLessons(rozvrh){
                
                Object.keys(rozvrh).forEach(key => {
                        rozvrh[key].forEach(predmet =>{
                                if(predmet['nahradni'] == 1){
                                        removeArrayElement(rozvrh[key],predmet); 
                                }})
                });
        
        }

        removeChangedLessons(rozvrh);
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
                rowSpan.className = 'col-md-2 col-lg-1 col-sm-4';
                
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
                        div.id = 'cas';
                        div.className = 'col-md-2 col-lg-1 col-sm-4';
                        

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
                row.className = 'row mb-1 row-cols-lg-10 row-cols-md-10';
                row.id = 'row';

                var rowSpan = document.createElement('span');
                rowSpan.className = 'col-md-2 col-lg-1 col-sm-4';
                rowSpan.id = 'den';
                rowSpan.innerHTML = den+':';
                row.append(rowSpan);

                function compare(a,b){
                        if(a.poradi < b.poradi){
                                return -1;
                        }
                        if(a.poradi > b.poradi){
                                return 1;
                        }
                        return 0;
                };

                rozvrh[den].sort(compare);

                //Exists to count at which order of a lesson we're at (first,second,third...)
                let count = 1;
                rozvrh[den].forEach(predmetObjekt => {
                        
                        //If there is an empty lesson, we create an empty div
                        if(predmetObjekt['poradi'] > count){
                                var div = document.createElement('div');
                                div.id = 'emptyPredmet';
                                div.className = 'col-md-2 col-lg-1 col-sm-4 d-flex flex-column position-relative';
                                row.appendChild(div);
                                count++;
                        }

                        var div = document.createElement('div');
                        div.id = 'predmet';
                        if(predmetObjekt['nahradni'] == '1') div.id ='nahradniPredmet';
                        div.className = 'col-md-2 col-lg-1 col-sm-4 d-flex flex-column position-relative';
                        

                        var predmetSpan = document.createElement('span');
                        predmetSpan.innerHTML = predmetObjekt['Predmet'];
                        predmetSpan.id = 'zkratka';
                        div.appendChild(predmetSpan);

                        if(predmetObjekt['ucitel'] != undefined){
                        var ucitelSpan = document.createElement('span');
                        ucitelSpan.innerHTML = predmetObjekt['ucitel'];
                        ucitelSpan.id = 'ucitel';
                        div.appendChild(ucitelSpan);
                        }

                        var tridaSpan = document.createElement('span');
                        tridaSpan.className = 'position-absolute top-0 end-0 ml-1 mr-1 p-1';
                        tridaSpan.innerHTML = predmetObjekt['ucebna'];
                        tridaSpan.id = 'ucebna';
                        div.appendChild(tridaSpan);

                        row.appendChild(div);
                        
                        count++;
                });

                
                document.querySelector('#rozvrh').appendChild(row);
        }
        //#endregion
        console.log("Rozvrh instantiation finished"); 
}
//#endregion
    