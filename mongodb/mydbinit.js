var conn = new Mongo();
var db = conn.getDB('kronosDB');

// crea la collection 'alignments' e la lascia come e' se gia' esiste
db.createCollection('clients', function(err, collection) {});
// crea la collection 'alignments' e la lascia come e' se gia' esiste
db.createCollection('technicians', function(err, collection) {});
// crea la collection 'alignments' e la lascia come e' se gia' esiste
db.createCollection('tickets', function(err, collection) {});


// elimina gli eventuali documenti della collection 'technicians'
/*
try {
   db.technicians.deleteMany( { } );
} catch (e) {
   print (e);
}
*/

// visualizza documenti esistenti
var cursor = db.technicians.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}

// inserisce un documento
var cursor = db.technicians.find( { idTechnician: 0 } );
if ( !cursor.hasNext() ) {
   db.technicians.insert({
      "idTechnician": 0,
      "fullName": "ANDREA ZAMMARCHI",
      "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
      "admin": true,
   })
}
