class SerialNumberResponse extends Ac4yServiceResponse{
    constructor(object){
        super(object);
        this.serialNumber;
    }
}

class SerialNumberRequest extends Ac4yServiceRequest{
    constructor(object){
        super(object);
        this.serialNumber;
    }
}

class SerialNumber{
    constructor(){
        this.serialNumber;
    }
}

class SerialNumberUI{
    constructor(){
        
        this.serialNumber = ko.observable();
    }
}

async function getSerialNumber() {   


    await getFile("editor-container", "serialNumberForm.html")
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
            header: 'Sorozatszám',
            content: document.getElementById(dialogContentId),
            showCloseIcon: true,
            target: document.getElementById(containerId),
            width: '400px',
            height: '250px',
            beforeOpen: onBeforeopen,
            close: function(args){
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
        
        var serialNumber = new SerialNumberUI();
        ko.applyBindings(serialNumber);

        dialog.appendTo('#dialog');
        sendbutton.appendTo('#sendButton');
        sendbutton.appendTo('#cancelButton');

        function onBeforeopen() {
            document.getElementById(dialogContentId).style.visibility = 'visible';

        }

        document.getElementById('sendButton').onclick = function () {
            dialog.hide();

            var response = new SerialNumberResponse().success();
            response.serialNumber = ko.toJSON(serialNumber);

            ko.cleanNode(document.getElementById('editor-container'));
    
            resolve(response);
            document.getElementById('container').remove();
        }

        document.getElementById('cancelButton').onclick = function () {
            dialog.hide();

            var response = new SerialNumberResponse().nothingHappened();

            ko.cleanNode(document.getElementById('editor-container'));

            reject(response);

            document.getElementById('container').remove();
        }
    });
}