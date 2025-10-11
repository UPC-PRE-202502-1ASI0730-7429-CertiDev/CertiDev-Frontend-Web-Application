export class User {
    constructor({ id, name, dni, email, phone, password, role }) {
        this.id = id;
        this.name = name;
        this.dni = dni;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.role = role; // 'owner' | 'buyer'
    }
}
