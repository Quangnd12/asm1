
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ICustomer {
    constructor(){}

    getData(): any[] {
        return [
            { id: 1, name: 'Nguyễn Văn A', email: 'vana@gmail.com', phone: 123454678, },
        ]
    }
}