class DialogResponse extends Ac4yServiceResponse {

}

class DialogRequest extends Ac4yServiceRequest {

}

var containerId = 'container';
var bodyId = 'editor-container';
var htmlId = 'html';
async function subscribeAccept(){
    
    await getFile("editor-container", "dialog.html")
    .catch( (error) => {console.log(error);});

    return new Promise((resolve,reject) => {

        ej.base.enableRipple(true);
        
        var dialog = new ej.popups.Dialog({
            buttons: [
                {
                    'click': () => {
                        dialog.hide();

                        var response = new DialogResponse().success();

                        resolve(response);
                    },
                    buttonModel: {
                        isPrimary: true,
                        content: 'Feliratkozás'
                    }
                },
                {
                    'click': () => {
                        dialog.hide();
                        
                        var response = new DialogResponse().nothingHappened();

                        reject(response);
                    },
                    buttonModel: {
                        content: 'Mégse'
                    }
                }
            ],
            content: 'A regisztrációhoz szükséges, hogy feliratkozz. A következő ablak az értesítések engedélyezését fogja kérni, regisztrációhoz fogadd el. Ha csak érdeklődő vagy, látogass el a <a href="http://www.gigsystem.hu" target="_blank">http://www.gigsystem.hu</a> oldalra.',
            target: document.getElementById("container"),
            showCloseIcon: true,
            width: '250px',
            height: '250px'
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
    
    document.getElementById('container').style.visibility = 'visible';
}