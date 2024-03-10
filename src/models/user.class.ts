export class User {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    zipCode: number;
    city: string;
    pet: string;
    petInfo: boolean; 
    
    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.pet = obj ? obj.pet : '';
        this.petInfo = obj ? obj.petInfo : false;
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            pet: this.pet,
            petInfo: this.petInfo
        };
    }
}