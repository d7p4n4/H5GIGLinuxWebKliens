class UserResponse extends Ac4yServiceResponse{
    constructor(object){
        super(object);
        this.user;
        this.guid;
    }
}

class UserRequest extends Ac4yServiceRequest{
    constructor(object){
        super(object);
        this.name;
        this.userName;
        this.email;
        this.phoneNumber;
        this.password;
    }
}

class User{
    constructor(name, userName, phoneNumber, email, password){
        this.name = name;
        this.userName = userName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.id;
        this.guid;
        this.createdAt;
        this.updateAt;
        this.oAuthToken;
        this.language;
    }
}

class UserUI{
    constructor(name, userName, emailAdress, phoneNumber, password){
        
        this.name = ko.observable(name);
        this.userName = ko.observable(userName);
        this.phoneNumber = ko.observable(phoneNumber);
        this.email = ko.observable(emailAdress);
        this.password = ko.observable(password);
    }
}

async function getUserDetails(userObj) {   
    if(document.getElementById('container') != null)
        document.getElementById('container').remove();


    await getFile("editor-container", "form.html")
        .catch( (error) => {console.log(error);});

    return new Promise((resolve, reject) => {

        var dialogContentId = 'dlgContent';
        var containerId = 'container';
        var bodyId = 'editor-container';
        var htmlId = 'html';

        var sendbutton = new ej.buttons.Button();
        var cancelbutton = new ej.buttons.Button();
        var proxy = this;

        var dialog = new ej.popups.Dialog({
            header: 'Felhasználó adatai',
            content: document.getElementById(dialogContentId),
            showCloseIcon: true,
            target: document.getElementById(containerId),
            width: '400px',
            height: '575px',
            beforeOpen: onBeforeopen,
            close: function(args) {
                ko.cleanNode(document.getElementById('editor-container'));
                document.getElementById('container').remove();
            }
        });
        document.getElementById(containerId).style.overflow = "hidden";
        document.getElementById(containerId).style.width = "100%";
        document.getElementById(containerId).style.height = "100%";

        document.getElementById(bodyId).style.overflow = "hidden";
        document.getElementById(bodyId).style.width = "100%";
        document.getElementById(bodyId).style.height = "100%";

        document.getElementById(htmlId).style.overflow = "hidden";
        document.getElementById(htmlId).style.width = "100%";
        document.getElementById(htmlId).style.height = "100%";

        document.getElementById(dialogContentId).style.fontSize = '13px';
        document.getElementById(dialogContentId).style.padding = '5%';
        document.getElementById(dialogContentId).style.display = 'block';
        
        if(userObj != null)
            var user = new UserUI(userObj.name, userObj.userName, userObj.email, userObj.phoneNumber, userObj.password);
        else
            var user = new UserUI();

        ko.applyBindings(user);

        dialog.appendTo('#dialog');
        sendbutton.appendTo('#sendButton');
        sendbutton.appendTo('#cancelButton');

        function onBeforeopen() {
            document.getElementById(dialogContentId).style.visibility = 'visible';
            if(userObj != null)
                document.getElementById('serialNumber').innerHTML = 'Sorozatszám: ' + userObj.id;

        }

        document.getElementById('sendButton').onclick = function () {
            dialog.hide();

            var response = new UserResponse().success();
            response.user = ko.toJSON(user);
            if(userObj != null)
                response.guid = userObj.guid;
                
            ko.cleanNode(document.getElementById('editor-container'));
            document.getElementById('container').remove();
    
            resolve(response);
        }

        document.getElementById('cancelButton').onclick = function () {
            dialog.hide();

            var response = new UserResponse().nothingHappened();

            ko.cleanNode(document.getElementById('editor-container'));

            reject(response);

            ko.cleanNode(user);
            document.getElementById('container').remove();
        }
    });
}