export class AdmonuserModel{
    constructor(
        public id_user: String,
        public id_admin: String,
        public descripcion_user: String,
        public nombre: String,
        public apellido: String,
        public correo: String,
        public telefono:'Integer', 
        public direccion: String,
        public curso: String,
        ){}
    }