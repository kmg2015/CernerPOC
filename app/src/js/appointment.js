
(function(window){
  window.extractAppointment = function() {
    var res = $.Deferred();

    function onError() {
      console.log('Loading Appt error', arguments);
      res.reject();
    }

    function onReady(smart)  {
      console.log('smart',smart);
        var user = smart.user;        
        var pt = user.read();
        var appt = smart.api.fetchAll({
                    type: 'Appointment',
                    query: {
                      practitioner: smart.tokenResponse.user,
                      date: 2021
                    }
                  });
        $.when(appt).fail(onError);
        $.when(appt).done(function(appt) {
          console.log('appt++++++++++++++++++',appt);
          var p = JSON.stringify(appt);
//           var p = defaultAppt();
//           p.apptStatus = appt[0].status;
//           p.description = JSON.stringify(appt);
//           p.minutesDuration = appt[0].minutesDuration;
          res.resolve(p);
        });
    }

    FHIR.oauth2.ready(onReady, onError);
    return res.promise();

  };

  function defaultAppt(){
    return {
      apptStatus: {value: ''},
      description: {value: ''},
      minutesDuration: {value: ''}
    };
  }

  window.drawApptVisualization = function(p) {
    console.log('++++++++++++++++++++p+++++++++++++++++++',p);
     html = "";
    $('#holder').show();
    $('#loading').hide();    
//     $('#apptStatus').html(p.apptStatus);
//     $('#description').html(p.description);
//     $('#minutesDuration').html(p.minutesDuration); 
    var data = JSON.parse(p);
    console.log('datadatadata++++++++++++++++++++p+++++++++++++++++++',data);
    
data.forEach(function(e, i) {
//   html += "<tr>" + "<td>" + e.status + "</td>" + 
//                    "<td>" + e.description + "</td>" + 
//                    "<td>" + e.minutesDuration + "</td>" + "</tr>";
    html += e.text.div;
})

document.getElementById("putHere").innerHTML = html;
 
  };

})(window);
