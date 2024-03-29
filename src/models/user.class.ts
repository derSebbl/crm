export class User {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    zipCode: number;
    city: string;
    pet: string;
    petName: string;
    petAllergens: string;
    petInfo: boolean; 
    careDays: number;
    bills: number;
    
    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.pet = obj ? obj.pet : '';
        this.petName = obj ? obj.petName : '';
        this.petAllergens = obj ? obj.petAllergens : '';
        this.petInfo = obj ? obj.petInfo : false;
        this.careDays = obj ? obj.careDays : 0;
        this.bills = obj ? obj.bills : 0;
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
            petName: this.petName,
            petAllergens: this.petAllergens,
            petInfo: this.petInfo,
            careDays: this.careDays,
            bills: this.bills
        };
    }
}