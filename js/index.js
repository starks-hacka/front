let listOfTeams = []

let deleteEvent = (id) => {
   const obj = listOfTeams.find(x => x.id == id);
   console.log(obj)
   const index = listOfTeams.indexOf(obj);
   if(index > -1)
    listOfTeams.splice(index, 1);

    loadTable();
}

let shortString = (text) => {

    if(!text) return 'Não informado';

    if(text.length > 10) {
        return text.slice(0, 20) + '...';
    }
    return text;
}

let loadTable = () => {
        let body = '';
        const bodyTable = document.getElementById('bodyTableTeams');

        if(listOfTeams.length > 0){
            listOfTeams.forEach(team => {
                body += `
                    <tr>
                        <td>${shortString(team.name)}</td>
                        <td>${shortString(team.tribe)}</td>
                        <td>${shortString(team.alliance)}</td>
                        <td>${shortString(team.manager)}</td>
                        <td>${shortString(team.contact)}</td>
                        <td><button class='btn btn-sm btn-danger btn-block' onClick='deleteEvent(${team.id})' data-js='${team.id}'>Excluir</button>
                `;
                
                if(team.typeEscalation == 1) {
                    body += `
                            <a  href='time-detail-daily.html?id=${team.id}' class='btn btn-sm btn-primary btn-block' data-js='${team.id}'>Detalhe</a></td>
                        </tr>
                    `;
                }
                else {
                    body += `
                            <a  href='time-detail-weekly.html?id=${team.id}' class='btn btn-sm btn-primary btn-block' data-js='${team.id}'>Detalhe</a></td>
                        </tr>
                    `;
                }
                   
            });
        }
        else {
            body += `
                <tr>
                    <td colspan='6' class='text-center'>Nenhum time cadastrado!</td>
                </tr>
            `
        }
        bodyTable.innerHTML = body;
       
}

let loadTeams = () => {

    const url = 'http://hackathon-xp.azurewebsites.net/teams';

    let ajax = new XMLHttpRequest();
    ajax.open('GET', url);
    ajax.send();
    ajax.onreadystatechange = function(e){
      if(ajax.readyState == 4 && ajax.status == 200){
        listOfTeams = JSON.parse(ajax.responseText);
        loadTable();
      }
     } 
}


(function(){
    loadTeams();
})();