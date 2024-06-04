
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FeedBackData {

  constructor() { }

  getData(): any[] {

    return [
        { id: 1, name: 'Nguyễn Văn A', content: 'vana@gmail.com', star: 123454678, date:'24/12/2003'},
    ];
  }

}

