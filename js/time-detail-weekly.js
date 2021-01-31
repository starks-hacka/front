let listOfEscalation = []

let deleteEvent = (id) => {
    console.log(id)
    const obj = listOfEscalation.find(x => x.id == id);
    const index = listOfEscalation.indexOf(obj);
    if(index > -1)
    listOfEscalation.splice(index, 1);
 
    loadTable();
}
 
let formatDate = (date) => {
    if(!date) return '';
    const dateSplit = date.split('-');
    return `${dateSplit[2].substring(0,2)}/${dateSplit[1]}/${dateSplit[0]}`;
}

let loadTable = () => {
    let body = '';
    const bodyTable = document.getElementById('tableEscalationWeekly');

    if(listOfEscalation.length > 0){
        listOfEscalation.forEach(escalation => {
            body += `
                <tr>
                    <td>${escalation.name}</td>
                    <td>${escalation.phone}</td>
                    <td>${escalation.email}</td>
                    <td>${formatDate(escalation.date)}</td>
                    <td><button class='btn btn-sm btn-danger' onClick="deleteEvent('${escalation.id}')" data-js='${escalation.id}'>Excluir</button>
                </tr>
            `;              
        });
    }
    else {
        body += `
            <tr>
                <td colspan='6' class='text-center'>Nenhum plantonista cadastrado!</td>
            </tr>
        `
    }
    bodyTable.innerHTML = body;
   
}


const registerEscalation = () => {
    const registerEscalationNametWeekly = document.getElementById('registerEscalationNametWeekly').value;
    const registerEscalationContactWeekly = document.getElementById('registerEscalationContactWeekly').value;
    const registerEscalationDate = document.getElementById('registerEscalationDate').value;
    const email = document.getElementById('registerEscalationEmail').value;
    const registerModel = {
        teamId: getQueryUrl('id'),
        email: email,
        surname: '',
        name: registerEscalationNametWeekly,
        phone: registerEscalationContactWeekly,
        date: registerEscalationDate
    }
    console.log(registerModel)

    var http = new XMLHttpRequest();
    var url = `http://hackathon-xp.azurewebsites.net/teams/${getQueryUrl('id')}/members`;
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/json');
    http.send(JSON.stringify(registerModel));

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            console.log
            $('#addWeeklyModal').modal('hide');
            registerModel.id = generateGuid();
            listOfEscalation.push(registerModel);
            loadTable();
        }
    }
    
}

let getQueryUrl = (param) => {
    return location.search.split(`${param}=`)[1] ? location.search.split(`${param}=`)[1] : null;
}

let generateGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
}

let loadTeam = () => {

    const url = `http://hackathon-xp.azurewebsites.net/teams/${getQueryUrl('id')}`

    let ajax = new XMLHttpRequest();
    ajax.open('GET', url);
    ajax.send();
    ajax.onreadystatechange = function(e){
      if(ajax.readyState == 4 && ajax.status == 200){
        const data = JSON.parse(ajax.responseText);
        
        document.getElementById('registerSquadName').value = data.name;
        document.getElementById('registerTribe').value = data.tribe;
        document.getElementById('registerAlliance').value = data.alliance;
        document.getElementById('registerManager').value = data.manager.name + ' ' + data.manager.surname;
        document.getElementById('registerContact').value = data.manager.phone; 
        listOfEscalation = data.teamMembers; 
        loadTable();
      }
     }  
}

(function() {
    loadTeam();
    console.log(getQueryUrl('id'))

    let register = document.getElementById('register-escalation-weekly');
    register.addEventListener('click', registerEscalation);
    
})();