import {Component, ElementRef, ViewChild} from '@angular/core';
import { ContactItem } from "./contact-item";
import {Table, TableModule} from "primeng/table";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    TableModule,
    FormsModule,
    CommonModule,
    InputTextModule
  ],
})
export class AppComponent {
  title = 'contact-list-app';
  contactList: ContactItem[] = [];
  cols: any[] = [];
  editingId: number = -1;
  @ViewChild('contactName') contactNameRef: ElementRef<HTMLInputElement> = null!;
  @ViewChild('contactPhone') contactPhoneRef: ElementRef<HTMLInputElement> = null!;
  @ViewChild('contactEmail') contactEmailRef: ElementRef<HTMLInputElement> = null!;
  @ViewChild('contactAddress') contactAddressRef: ElementRef<HTMLInputElement> = null!;
  dt: any;

  constructor() { }
  ngOnInit(): void {
    const storedContactList = localStorage.getItem('contactList');
    this.cols = [
      { field: "id", header: "Id" },
      { field: "name", header: "Name" },
      { field: "address", header: "Address" },
      { field: "phone", header: "Phone" },
      { field: "email", header: "Email" },
      { field: "action", header: "Actions" },

    ]
    console.log('storedContactList  ', storedContactList);
    if (storedContactList) {
      this.contactList = JSON.parse(storedContactList);
    } else {
      this.contactList = [
        {
          "id": 1,
          "name": "Andrew Owen",
          "address": "District 7, HCMC",
          "phone": "0987654321",
          "email": "belike@gmail.com",
          "isEditing": false
        },
        {
          "id": 2,
          "name": "Michel Le",
          "address": "Cau Giay, Ha Noi",
          "phone": "01230657242",
          "email": "michel@gmail.com",
          "isEditing": false
        },
        {
          "id": 3,
          "name": "kevin Alker",
          "address": "District 1, HCMC",
          "phone": "0778765212",
          "email": "kevin@gmail.com",
          "isEditing": false
        },
        {
          "id": 4,
          "name": "Herry Ford",
          "address": "Phan Thiet, Binh Thuan",
          "phone": "0332579123",
          "email": "herry@gmail.com",
          "isEditing": false
        },
        {
          "id": 5,
          "name": "Owen Harry",
          "address": "Lien Chieu, Da nang",
          "phone": "0982651987",
          "email": "owen@gmail.com",
          "isEditing": false
        }
      ];
    }
    console.log('---contactList----', this.contactList);
  }

  applyFilterGlobal(table: Table, event: any) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  addContact(name: string, email: string, address: string, phone: string): void {
    if (name !== '') {
      const newContactItem: ContactItem = {
        id: Date.now(),
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        email: email.trim(),
        isEditing: false
      };
      this.contactList.push(newContactItem);
      this.saveContactList();
      this.resetData();
    }
  }

  deleteContact(id: number | undefined): void {
    this.contactList = this.contactList.filter(item => item.id !== id);
    this.saveContactList();
  }

  editContact(item: ContactItem): void {
    this.contactNameRef.nativeElement.value = item.name;
    this.contactAddressRef.nativeElement.value = item.address;
    this.contactPhoneRef.nativeElement.value = item.phone;
    this.contactEmailRef.nativeElement.value = item.email;
    item.isEditing = true; // this item has been editing
    this.editingId = item.id;
  }

  saveContactList(): void {
    localStorage.setItem('contactList', JSON.stringify(this.contactList));
  }

  unBlockForEditStatus(): void {
    this.contactList.forEach(item => item.isEditing = false);
  }

  resetData(): void {
    this.contactNameRef.nativeElement.value = '';
    this.contactAddressRef.nativeElement.value = '';
    this.contactPhoneRef.nativeElement.value = '';
    this.contactEmailRef.nativeElement.value = '';
    // Reset state for current item
    this.unBlockForEditStatus();
    this.editingId = -1;
  }

  protected readonly console = console;
}
