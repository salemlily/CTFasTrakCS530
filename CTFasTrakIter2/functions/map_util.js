// JavaScript source code
function remove(){
    if (mapVisible.length > 0){
        var key = mapVisible[0].key;
        while(mapVisible[0].key === key){
            mapVisible[0].marker.setMap(null);
            mapVisible.shift();
        }
    }
}
      
function toggleUI(visible){
    if (visible){ //make invisible
        document.userInput.innerHTML="";
        document.testingForm.innerHTML="";
    }else{ //make visible
        document.userInput.innerHTML = `            
              <table>
                <tr> 
                  <td>
                    <input type=text name=start placeholder="start location" size=15> 
                    <input type=button value="GO!" onClick="displayUserStartStopLoc()">
                    <input type=text name=radius placeholder="radius" size=3>        
                  </td>
                </tr>
                <tr>
                    <td>
                      <input type=text name=end placeholder="end location" size=15>
                      <input type = button value="Trip Info" onClick="calculateAndDisplayRoute()">
                      <input type="button" value ="Clear" onClick="remove()">
                    </td>
                  </tr>	
                <tr>
                  <td>
                    <input type=button value="Close Places" onClick="displayClosePlacesToStart()">
                    <input type=button value="Close Busses" onClick="displayCloseBussesToStart()">
                    <input type=button value="Close Stops" onClick="displayCloseStopsToStart()">
                  </td>
                </tr>
              </table>
          `;
        /*  commented out WANT TO SEE WHAT WE HAVE ON MOBILE
      document.testingForm.innerHTML = `
        <table>
          <tr>
            <td><input type=button value="View All Busses" onClick="displayAllBusses()"></td>
            <td><input type=button value="View All Stops" onClick="displayAllStops()"></td>				
          </tr>
          <tr>
            <td><input type="text" name="testInput" size="20"></td>
            <td><input type=button value="for testing" onClick="test()"></td>
          </tr>
        </table>
      `;
       */
    }
    userInterfaceVisible = !userInterfaceVisible;
}

function initMap() {
    centerLatLng = new google.maps.LatLng(41.715775525674914, -72.68610146484376);
    theMap = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        disableDefaultUI: true,
        center: centerLatLng,
        mapTypeId: 'terrain' 
    }); 
    initializeMapControls();
    toggleUI(false);
}      
      
function initializeMapControls(){
    var div = document.userInput;
    theMap.controls[google.maps.ControlPosition.TOP_LEFT].push(div);
    div = document.getElementById("toggle-button");
    theMap.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(div);
    div = document.getElementById("directions-panel");
    //theMap.controls[google.maps.ControlPosition.TOP_RIGHT].push(div);
}
