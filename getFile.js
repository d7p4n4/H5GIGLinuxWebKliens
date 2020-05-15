function getFile(id, file) {

    return new Promise ( (resolve, reject) => {
  
        if (file && id) {
          
          xhttp = new XMLHttpRequest();
  
          xhttp.onreadystatechange = function() {
  
            if (this.readyState == 4) {
  
              if (this.status == 200) {
  
                $("#"+id).append(this.responseText); 
  
                resolve("success!")
  
              }
  
              if (this.status == 404) {
  
                reject ("error: page not found.");
                
              }
  
            }
  
          }
  
          xhttp.open("GET", file, true);
          xhttp.send();
  
        }
  
    });
  
  }