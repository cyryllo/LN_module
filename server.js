var exec = require('exec');
var io = require('socket.io')(80);

io.on('connection', function(socket){
  console.log('a user connected');

var i, j;

// ######################### LN DIGITAL ######################### //

  function startSetup() {
    for( i=100; i<108; i++){
    	exec('gpio -x mcp23s17:100:0:0 mode '+i+' out', function(err, out, code) {
    });
}

    for( i=108; i<116; i++){
    	exec('gpio -x mcp23s17:100:0:0 mode '+i+' in', function(err, out, code) {
    });
        exec('gpio -x mcp23s17:100:0:0 mode '+i+' up', function(err, out, code) {
    });

}


}
  startSetup();

  var lastStatuses = {};

  function getStatus(pin) {
    exec('gpio -x mcp23s17:100:0:0 read '+pin, function(err, out, code) {
      if (err instanceof Error) throw err;

      lastStatuses[pin] = out.trim();
      socket.emit('status', {pin: pin, status: out.trim()});
    });
  }


  setInterval(function() {
    [108,109,110,111,112,113,114,115].forEach(function(pin) {
      getStatus(pin);
    });
  }, 800);

  socket.on('getStatus', function(p) {
    getStatus(p.pin);
  });

  socket.on('setGPIO', function(o) {
    exec('gpio -x mcp23s17:100:0:0 write '+o.pin+' '+o.state, function(err, out, code) {});

    getStatus(o.pin);
  });

// ####################### END LN DIGITAL ####################### //





// ######################### LN HUB32IO ######################### //

  function startSetupHub() {
    for( j=120; j<136; j++){
        exec('gpio -x mcp23017:120:0x20:0 mode '+j+' out', function(err, out, code) {
    });
}

    for( j=120; j<136; j++){
        exec('gpio -x mcp23017:120:0x21:0 mode '+j+' out', function(err, out, code) {
    });
}
}

startSetupHub();

function getStatusHub(pin, adres) {
    exec('gpio -x mcp23017:120:0x'+adres+':0 read '+pin, function(err, out, code) {
      if (err instanceof Error) throw err;

      socket.emit('status2', {pin: pin, adres: adres, status2: out.trim()});
    });
  }


socket.on('getStatusHub', function(ph) {
    getStatusHub(ph.pin, ph.adres);
  });

  socket.on('setGPIOHub', function(op) {
    exec('gpio -x mcp23017:120:0x'+op.adres+':0 write '+op.pin+' '+op.state, function(err, out, code) {});

    getStatusHub(op.pin, op.adres);
  });





// ####################### END LN HUB32IO ####################### //



  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

