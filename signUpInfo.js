
var containerId = 'container';
var bodyId = 'editor-container';
var htmlId = 'html';
async function signUpInfo(message){
    
    await getFile("editor-container", "dialog.html")
    .catch( (error) => {console.log(error);});

    return new Promise((resolve,reject) => {

        ej.base.enableRipple(true);
        
        var dialog = new ej.popups.Dialog({
            content: message,
            target: document.getElementById("container"),
            showCloseIcon: true,
            width: '150px',
            height: '100px',
            close: function(args) {
                location.reload();
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
        
        dialog.appendTo('#dialog');
    });
}