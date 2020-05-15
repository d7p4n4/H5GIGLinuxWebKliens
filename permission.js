class PermissionResponse extends Ac4yServiceResponse {

}

class PermissionRequest extends Ac4yServiceRequest {
    constructor(object){
        super(object);
        this.permissionName;

    }
}

function getPermissionStatementCommon(permissionName) {

    return new Promise((resolve,reject) => {


        navigator.permissions.query({name:permissionName}).then(function(result) {

            if (result.state === 'granted') {

                resolve(new PermissionResponse().success());
                
            } else if (result.state === 'prompt' || result.state === 'denied') {

                resolve(new PermissionResponse().nothingHappened());

            }
        });
    });

};


function getNotificationsPermissionStatement() {
    return getPermissionStatementCommon('notifications');
};