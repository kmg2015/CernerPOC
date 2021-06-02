
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
          var p = defaultAppt();
          p.apptStatus = appt[0].status;
          p.description = appt[0].description;
          p.minutesDuration = appt[0].minutesDuration;
          res.resolve(appt);
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
    console.log('p+++++++++++++++++++',p);
    $('#holder').show();
    $('#loading').hide();    
//     $('#apptStatus').html(p.apptStatus);
    $('#description').html(JSON.stringify(p));
//     $('#minutesDuration').html(p.minutesDuration);   
  };

})(window);
