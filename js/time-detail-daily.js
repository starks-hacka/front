let listOfEscalation = [
    {
        id: 1,
        name: "Jhones",
        contact: '(11) 95063-4443',
        dayOfTheWeek: 'Segunda-feira'
    },
    {
        id: 2,
        name: "Jhones",
        contact: '(11) 95063-4443',
        dayOfTheWeek: 'Segunda-feira'
    },
    {
        id: 3,
        name: "Jhones",
        contact: '(11) 95063-4443',
        dayOfTheWeek: 'Segunda-feira'
    },
    {
        id: 4,
        name: "Jhones",
        contact: '(11) 95063-4443',
        dayOfTheWeek: 'Segunda-feira'
    }
]

let deleteEvent = (id) => {
    const obj = listOfEscalation.find(x => x.id == id);
    console.log(obj)
    const index = listOfEscalation.indexOf(obj);
    if(index > -1)
    listOfEscalation.splice(index, 1);
 
     loadTable();
 }
 

let loadTable = () => {
    let body = '';
    const bodyTable = document.getElementById('tableEscalationWeek');

    if(listOfEscalation.length > 0){
        listOfEscalation.forEach(escalation => {
            body += `
                <tr>
                    <td>${escalation.name}</td>
                    <td>${escalation.contact}</td>
                    <td>${escalation.dayOfTheWeek}</td>
                    <td><button class='btn btn-sm btn-danger' onClick='deleteEvent(${escalation.id})' data-js='${escalation.id}'>Excluir</button>
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


const registerTeam = () => {
    const registerEscalationName = document.getElementById('registerEscalationName').value;
    const registerEscalationContact = document.getElementById('registerEscalationContact').value;
    const dayOfTheWeek = document.getElementById('dayOfTheWeek').value;

    const registerModel = {
        name: registerEscalationName,
        contact: registerEscalationContact,
        dayOfTheWeek: dayOfTheWeek
    }
    console.log(registerModel)

    $('#addDailyModal').modal('hide');
    listOfEscalation.push(registerModel);
    loadTable();

    // var http = new XMLHttpRequest();
    // var url = 'teste.com';
    // http.open('POST', url, true);

    // //Send the proper header information along with the request
    // http.setRequestHeader('Content-type', 'application/json');
    // http.send(registerModel);

    // http.onreadystatechange = function() {
    //     if(http.readyState == 4 && http.status == 200) {
    //         $('#addDailyModal').modal('hide');
    //     }
    // }
    
}

let getQueryUrl = (param) => {
    return location.search.split(`${param}=`)[1] ? location.search.split(`${param}=`)[1] : null;
}

let loadTeam = () => {

    const team = {
        id: 1,
        name: 'Fundos Listados',
        tribe: 'AMS',
        alliance: 'Funds',
        manager: 'Carlos Bueno',
        contact: '(11) 95063-4443',
    }


    document.getElementById('registerSquadName').value = team.name;
    document.getElementById('registerTribe').value = team.tribe;
    document.getElementById('registerAlliance').value = team.alliance;
    document.getElementById('registerManager').value = team.manager;
    document.getElementById('registerContact').value = team.contact;  
}
(function() {
    loadTeam();
    let register = document.getElementById('register-escalation');
    register.addEventListener('click', registerTeam);
    loadTable();
})();