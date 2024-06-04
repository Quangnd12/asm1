import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ICustomer} from '../../../@core/data/customer'

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent {
    customers : any[] = []
    deleteModalRef: NgbModalRef | undefined;
    customerToDelete: any = null;

    constructor(private router: Router, private modalService: NgbModal, private customerService: ICustomer) {}
    
    ngOnInit(): void {
      this.loadCustomers();
    }

    loadCustomers(): void {
      this.customers = this.customerService.getData();
    }

    editCustomer(customer: any): void {
        this.router.navigate(['/pages/customers/edit', customer.id]);
        console.log('Edit customer', customer);
    }

    openDeleteModal(content: any, customer: any): void {
        this.customerToDelete = customer;
        this.deleteModalRef = this.modalService.open(content);
    }

    confirmDelete(): void {
        if (this.customerToDelete) {
            this.deleteModalRef?.close();
        }
    }

    navigateToCreate(): void {
        this.router.navigate(['/pages/customers/create']);
    }
}
