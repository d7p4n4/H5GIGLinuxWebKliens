class MenuResponse extends Ac4yServiceResponse {
    constructor(object){
        super(object);
        this.id;
    }

}

class MenuRequest extends Ac4yServiceRequest {

}

async function createMenu(){
    
    await getFile("editor-container", "menu.html")
    .catch( (error) => {console.log(error);});

    return new Promise((resolve,reject) => {

        ej.base.enableRipple(true);

        //Menu items definition
        var menuItems = [
            {
                text: 'Új eszköz csatolása, már meglévő fiókhoz',
                id: 'addNew'
            },
            {
                text: 'Fiók adatainak módosítása',
                id: "editUser"
            }
        ];

        // Initialize Menu control.
        var menuObj = new ej.navigations.Menu({ 
            items: menuItems,
            hamburgerMode: true,
            select: function(args){
                onClick(args);
            }
         }, '#menu');

         function onClick(args){

            if(args.item.properties.id.startsWith('add'))
                addNewDeviceClick();

            if(args.item.properties.id.startsWith('edit')){
                messaging.getToken().then((currentToken) => {
                    if (currentToken) {
                        
                        getUserFromByToken(currentToken);

                    } else {
            
                        console.log('No Instance ID token available. Request permission to generate one.');
                                }
                    }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
            
                    });
            }

             var response = new MenuResponse();
             response.id = args.item.properties.id;

             resolve(response);
         };
    });
}