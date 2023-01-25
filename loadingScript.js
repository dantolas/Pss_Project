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
                                    
                                    loadAjaxResponse(res);
                                    
                    },
            error: function() {
              alert('Not Okay');
            }
        });
   
}
//#endregion


function loadAjaxResponse(res){
        res = JSON.parse(res);
        let rozvrh = [];
        let pondeli = [];
        let utery = [];
        let streda = [];
        let ctvrtek = [];
        let patek = [];
        res.forEach(predmet => {
                if(predmet['Den'].toUpperCase() == 'PONDELI') pondeli.push(predmet);
                if(predmet['Den'].toUpperCase() == 'UTERY') utery.push(predmet);
                if(predmet['Den'].toUpperCase() == 'STREDA') streda.push(predmet);
                if(predmet['Den'].toUpperCase() == 'CTVRTEK') ctvrtek.push(predmet);
                if(predmet['Den'].toUpperCase() == 'PATEK') patek.push(predmet);
        });
        rozvrh.push(pondeli,utery,streda,ctvrtek,patek);
        console.log(rozvrh);
        //rozvrh.forEach(den => console.log(den));
        
}