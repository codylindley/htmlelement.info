var connect = require("connect");        

connect().use(connect.static('src')).listen(3022);

console.log('\nStatic file server running at http://localhost:' + '3022' + '/\n\nCTRL + C to shutdown server');