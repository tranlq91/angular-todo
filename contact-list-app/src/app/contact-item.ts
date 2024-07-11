export class ContactItem {
  id: number
  name: string;
  address: string;
  phone: string;
  email: string;
  isEditing: boolean;

  constructor(id: number,
              address: string = '', phone: string = '', name: string = '') {
    this.id = id;
    this.address = address;
    this.phone = phone;
    this.name = name;
    this.isEditing = false;
  }
}
