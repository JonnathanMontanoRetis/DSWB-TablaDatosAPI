export class LibroModel{
    constructor(
        public cod_inv:  String,
        public id_admin: String, 
        public isbn: String, 
        public titulo: String, 
        public editorial: String, 
        public ano_edicion: String, 
        public materia: String, 
        public dewey: String, 
        public adquisicion: String, 
        public ubicacion: String, 
        public fecha_creacion: String,
        public precio: String, 
        public ciudad: String, 
    ){}
}