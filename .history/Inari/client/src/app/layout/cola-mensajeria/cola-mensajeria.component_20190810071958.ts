import { Component, OnInit } from '@angular/core';

export class ColaMensajeria {
  "codigo": number;
  nombreDelPublicador: string;
  email: string;
}

@Component({
  selector: 'app-cola-mensajeria',
  templateUrl: './cola-mensajeria.component.html',
  styleUrls: ['./cola-mensajeria.component.scss']
})
export class ColaMensajeriaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
