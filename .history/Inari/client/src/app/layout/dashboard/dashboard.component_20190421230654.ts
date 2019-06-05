import { CalendarioService } from 'src/app/services/calendario/calendario.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import * as iFrame from 'preguntas.js';
import * as jwt from 'jsonwebtoken';
import { DomSanitizer } from '@angular/platform-browser';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' }
];

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    displayedColumns = ['position', 'name', 'weight', 'symbol'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);
    places: Array<any> = [];
    cantidadProgramaciones = 0;
    iFrame = '';
    iFrame2 = '';
    iFrame3 = '';

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    constructor(private calendarioService: CalendarioService, public _DomSanitizer: DomSanitizer) {
        this.places = [
            {
                imgSrc: 'assets/images/card-1.jpg',
                place: 'Cozy 5 Stars Apartment',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.',
                charge: '$899/night',
                location: 'Barcelona, Spain'
            },
            {
                imgSrc: 'assets/images/card-2.jpg',
                place: 'Office Studio',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.',
                charge: '$1,119/night',
                location: 'London, UK'
            },
            {
                imgSrc: 'assets/images/card-3.jpg',
                place: 'Beautiful Castle',
                description:
                    // tslint:disable-next-line:max-line-length
                    'The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.',
                charge: '$459/night',
                location: 'Milan, Italy'
            }
        ];
    }

    ngOnInit() {
        this.calendarioService.getProgramacionActiva().subscribe(programacionResponse => {
            if (programacionResponse !== null || programacionResponse !== undefined) {
                this.cantidadProgramaciones = programacionResponse[0].Cantidad;
            } else {
                this.cantidadProgramaciones = 0;
            }
            console.log(programacionResponse[0].Cantidad);
        }, (error) => {

        }, () => {
        });
        this.obtenerLink();
        this.obtenerMetabase();
        this.obtenerMetrica();
    }

    obtenerLink() {
        const METABASE_SITE_URL = 'https://metabase.inari.tk';
        const METABASE_SECRET_KEY = 'efa7f34e1d71c0a5d8b5207adc84295d10d906791fb89be359b03e8520668892';

        const payload = {
          resource: { question: 3 },
          params: {}
        };
        const token = jwt.sign(payload, METABASE_SECRET_KEY);

        this.iFrame = METABASE_SITE_URL + '/embed/question/' + token + '#bordered=true&titled=false';
    }

    obtenerMetabase() {
        const METABASE_SITE_URL = 'https://metabase.inari.tk';
        const METABASE_SECRET_KEY = 'efa7f34e1d71c0a5d8b5207adc84295d10d906791fb89be359b03e8520668892';

        const payload = {
          resource: { question: 5 },
          params: {}
        };
        const token = jwt.sign(payload, METABASE_SECRET_KEY);

        this.iFrame2 = METABASE_SITE_URL + '/embed/question/' + token + '#bordered=true&titled=true';
    }

    obtenerMetrica() {
        // const jwt = require("jsonwebtoken");

        const METABASE_SITE_URL = 'https://metabase.inari.tk';
        const METABASE_SECRET_KEY = 'efa7f34e1d71c0a5d8b5207adc84295d10d906791fb89be359b03e8520668892';

        const payload = {
            resource: { question: 11 },
            params: {}
        };
        const token = jwt.sign(payload, METABASE_SECRET_KEY);

        this.iFrame3 = METABASE_SITE_URL + '/embed/question/' + token + '#bordered=true&titled=false';
    }
}
