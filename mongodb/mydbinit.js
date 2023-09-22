var conn = new Mongo();
var db = conn.getDB('kronosDB');

// crea la collection 'alignments' e la lascia come e' se gia' esiste
db.createCollection('chats', function(err, collection) {});
// crea la collection 'alignments' e la lascia come e' se gia' esiste
db.createCollection('clients', function(err, collection) {});
// crea la collection 'alignments' e la lascia come e' se gia' esiste
db.createCollection('technicians', function(err, collection) {});
// crea la collection 'alignments' e la lascia come e' se gia' esiste
db.createCollection('tickets', function(err, collection) {});

/*
// elimina gli eventuali documenti della collection 'alignments'
try {
   db.alignments.deleteMany( { } );
} catch (e) {
   print (e);
}

// visualizza documenti esistenti
var cursor = db.alignments.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}

// inserisce un documento
db.alignments.insert({"s1": "GCATGCU", "s2": "GATTACA", "as1": "GCATGC-U", "as2": "G-ATTACA"})


// visualizza documenti esistenti
var cursor = db.alignments.find();
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}
*/
