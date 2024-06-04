
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class IProduct {
    deleteProduct(id: any) {
      throw new Error('Method not implemented.');
    }
    constructor() { }

    getData(): any[] {
  
        return [
            { id: 1, name: 'Cà phê Robusta', describe: 'Cà phê Robusta có hương vị đặc trưng, độ chua thấp, độ đắng cao', price: '100.000đ', images: 'cafeR.png', quantity: 100 , brand:'Phúc Long' },
            { id: 2, name: 'Cà phê Arabica', describe: 'Cà phê Arabica có hương thơm phong phú, độ chua cao, độ đắng thấp', price: '120.000đ', images: 'cafeA.png', quantity: 80 , brand:'Trung Nguyên' },
            { id: 3, name: 'Cà phê Culi', describe: 'Cà phê Culi có hương vị đặc trưng, độ chua và đắng ở mức trung bình', price: '110.000đ', images: 'cafeC.png', quantity: 90 , brand:'Vinacafe' },
            { id: 4, name: 'Cà phê Moka', describe: 'Cà phê Moka có hương thơm nồng nàn, độ chua và đắng hài hòa', price: '130.000đ', images: 'cafeM.png', quantity: 70 , brand:'Nestcafe' },
          ];
    }
}