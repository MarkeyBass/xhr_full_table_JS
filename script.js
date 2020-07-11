const xhr = new XMLHttpRequest;
let xhrResponse = [];
let objectKeys = [];


const table = document.querySelector('#table'); 
// const thead = document.querySelector('#thead');
const thead = table.querySelector('thead') 
const tbody = document.querySelector('#tbody');
const trHead = document.createElement('tr');
thead.appendChild(trHead); 
trHead.className = 'table-primary'



function createTableHead(objectKeys) {
  for(let i = 0; i < objectKeys.length; i++) {
    let td = document.createElement('td');
    trHead.appendChild(td);
    td.appendChild(document.createTextNode(objectKeys[i]));
  }
}

function createTableBody(xhrResponse) {
  for (let i = 0; i < xhrResponse.length; i++){
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
    tr.className = 'table-info';

    
    for(let j = 0; j < objectKeys.length; j++){
      let td = document.createElement('td');
      tr.appendChild(td);
      td.appendChild(document.createTextNode(Object.values(xhrResponse[i])[j]));
      tdValue = Object.values(xhrResponse[i])[j]
      //debugger;
      // let keyName = objectKeys[j];
      // let val = xhrResponse[i][keyName]; 
      // td.appendChild(document.createTextNode(val));
      if(isURL(tdValue)) {
        // tr.style.cursor = "pointer"; 
        tr.setAttribute("style", "cursor:pointer"); 
        tr.setAttribute("onclick", `document.location='${Object.values(xhrResponse[i])[j]}'`); 
      }
   
      }
  }
}
function isURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}

function totalPathHours(){
  let total = 0;
  for (i = 0; i < xhrResponse.length; i++) {
    total += xhrResponse[i].hours;
  }
  const totalDiv = document.getElementById('total-hours');
  totalDiv.appendChild(document.createTextNode(`Total Hours: ${total} `));
}

xhr.open('GET', 'https://rt-students.com/api/getpath/10');
xhr.send();
xhr.onload = function(e) {
  e.preventDefault();
  if (xhr.status != 200) {
    alert(`Eror ${xhr.status}: ${xhr.statusText}`);
  } else {
    xhrResponse = JSON.parse(xhr.response);
    objectKeys = Object.keys(xhrResponse[0]);
    console.log(xhrResponse);

    createTableHead(objectKeys);
    createTableBody(xhrResponse);
    totalPathHours();

  }
  
}

