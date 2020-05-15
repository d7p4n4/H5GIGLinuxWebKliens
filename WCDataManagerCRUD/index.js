class User{
    constructor(name, userName, email){
        this.name = name;
        this.userName = userName;
        this.phoneNumber;
        this.email = email;
        this.password;
        this.id;
        this.guid;
        this.createdAt;
        this.updateAt;
        this.oAuthToken;
        this.language;
    }
}

var hostUrl = 'https://localhost:44372/';
var data = new ej.data.DataManager({
    url: hostUrl + 'api/users',
    adaptor: new ej.data.ODataV4Adaptor(),
    crossDomain: false
});

var template = '<tr><td>${Id}</td><td>${Name}</td><td>${Email}</td></tr>';

var compiledFunction = ej.base.compile(template);

var table = (document.getElementById('datatable'));
var dm = new ej.data.DataManager({
    url: hostUrl + 'api/users',
    adaptor: new ej.data.ODataV4Adaptor(),
    crossDomain: false
});

dm.executeQuery(new ej.data.Query())
    .then((e) => {
        (e.result).forEach((data) => {
            table.tBodies[0].appendChild(compiledFunction(data)[0].firstChild);
        });
    });

var button = document.getElementById('manipulate');
var name = document.getElementById('id');
var userName = document.getElementById('name');
var email =document.getElementById('userName');
var email =document.getElementById('email');


function onClick() {
    
    var name = document.getElementById('OrderID').value;
    var userName = document.getElementById('CustomerID');
    var email =document.getElementById('EmployeeID');

    var data = {Name: name};
    if (!data.Name) { return; }
    dm.insert(data);
    dm.executeQuery(new ej.data.Query())
        .then((e) => {
            table.tBodies[0].innerHTML = '';
            (e.result).forEach((data) => {
                table.tBodies[0].appendChild(compiledFunction(data)[0].firstChild);
            });
        });
};