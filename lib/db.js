
function db(mongoose) {
	// body...

var ClienteSchema = mongoose.Schema({
   nombre: String,
   apellido: String,
   domicilio: String,
   telefono: String,
   email: String
});
var Cliente;
return Cliente = mongoose.model('registro', ClienteSchema);
}
module.exports= db;