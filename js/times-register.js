
const registerTeam = () => {
    const registerSquadName = document.getElementById('registerSquadName').value;
    const registerTrybe = document.getElementById('registerTrybe').value;
    const registerAlliance = document.getElementById('registerAlliance').value;

    const registerModel = {
        name: registerSquadName,
        tribe: registerTrybe,
        alliance: registerAlliance,
        managerId: 'a991a4a1-6bc0-482d-b384-e4887d36659d'
    }
    console.log(registerModel)

    var http = new XMLHttpRequest();
    var url = 'http://hackathon-xp.azurewebsites.net/teams';
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/json');
    http.send(JSON.stringify(registerModel));

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            window.location.href = '/'
        }
    }
    
}

(function() {
    document.getElementById('registerManager').value = 'Harison Carvalho';
    document.getElementById('registerContact').value = '11991744151';


    let register = document.getElementById('btnRegister');
    register.addEventListener('click', registerTeam);
})();