
function db(mongoose) {
	// body...

var ClienteSchema = mongoose.Schema({
   nombre: String,
   apellido: String,
   domicilio: String,
   telefono: String,
   email: String
});
var Cliente = mongoose.model('Registro', ClienteSchema);
}
module.exports= db;