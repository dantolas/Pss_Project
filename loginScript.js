
//---Main Code
let xd;

const submitButton = document.querySelector("#submit");
submitButton.addEventListener('click',function(e){
   e.preventDefault();
  
    AjaxPost();
   
  // const userdata = JSON.parse(userdataJson);
  // console.log(userdata['username']);
  

})
//---

//Function that just turns submitted form data to a JSON string
function formToJsonString(){
  const form = document.querySelector("#form");
  let formdata = new FormData(form);
  let formString = "";
  formString += "{";
  for(const[key,value] of formdata){
  formString+="\""+key+"\":\""+value+"\"";
  }
  formString+="}"
  return formString;
}



//Function that sends a request to PHP 
function AjaxRequest(str) {
  console.log("AjaxRequest fired");
  //const url = "loginScript.php?"+str
  var xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("UsernameLabel").innerHTML = this.responseText;
    }else{
      console.log("Request: Failed")
    }
    xhr.open('GET', 'loginScript', true);
    xhr.send(null);
  }
}  

function loginCheck(userdataJSON){
  let userdata = JSON.parse(userdataJSON);
  if(userdata['login'] == "valid"){
    validLogin(userdata);
  }else{
    invalidLogin(userdata);
  }
};

function validLogin(userdata){
  var name = document.getElementById("username").value;
    if(userdata['role'] == 'student'){
      window.location.href ="index.html?data="+JSON.stringify(userdata)+"&username="+name;
      return;
    }

    if(userdata['role'] == 'ucitel'){
      window.location.href ="indexTeacher.html?data=userdata";
      return;
    }

    if(userdata['role'] == 'admin'){
      window.location.href ="indexAdmin.html?data=userdata";
      return;
    }
    
}

//#region Invalid Login - Informs user about wrong username or password
function invalidLogin(userdata){
  
    if(typeof userdata['jmeno'] != 'undefined'){
      console.log("Password wrong");
      document.querySelector('#passwordSpan').innerHTML = "Password incorrect.";
      document.querySelector('#passwordSpan').style.color = "red";
      document.querySelector('#userSpan').innerHTML = "";
      return;
    }

    document.querySelector('#userSpan').innerHTML = "Username incorrect.";
    document.querySelector('#userSpan').style.color = "red";
    
    console.log("Username wrong");
  
}
//#endregion

//#region Original ajax post
//Function that can send a post to PHP
//------------------------------------
//=>This was supposed to be the main function to send a post to PHP
//,but after countless hours of not getting it able to work, i just went with the newer JQUERY option and that worked



// function AjaxPost(){
//   console.log("AjaxPost fired");

//   let xhr = new XMLHttpRequest()

//   let json = JSON.stringify({name:"John",obligation:"to cum"});

//   // track upload progress
//   xhr.upload.onprogress = function(event) {
//     console.log(`Uploaded ${event.loaded} of ${event.total}`);
//   };

//   // track completion: both successful or not
//   xhr.onloadend = function() {
//     if (xhr.status == 200) {
//       console.log("success");
//     } else {
//       console.log("error " + this.status);
//     }
//   };

//   xhr.open('POST', 'loginScript.php');
//   xhr.setRequestHeader('Content-type','application/jsonl; charset=utf-8');
//   xhr.send(json);
//   xhr.onload = function (responseText) {
//   if(xhr.status === 200 && xhr.readyState == 4) {
//         console.log("Post successfully created!");
//         alert(xhr.responseText); 
//     }

//     xhr.onerror = function(){
//       console.log("Post failed!");
//     }
//   }
// }
//#endregion

function AjaxPost() {
  var name = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  
  $.ajax({
          type : "POST",  //type of method
          url  : "loginScript.php",  //your page
          data : { name : name, password : password },// passing the values
          success: function(res){  
                                  //do what you want here...
                                  console.log(res);
                                  loginCheck(res);
                  },
          error: function() {
            alert('Not Okay');
          }
      });
 
  }