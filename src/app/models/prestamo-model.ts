export class PrestamoModel{
    constructor(
        public id_reserva?: String,
        public id_admin?: String, 
        public id_user?: String, 
        public id_ejemplar?: String, 
        public dias_prestamo?: Number, 
        public fecha_prestamo?: String, 
        public fecha_devolucion?: String, 
        public estado?: String, 
    ){}
}