import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import swal from 'sweetalert2';
import { DocumentationService } from '../documentation.service';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.css']
})
export class DocsListComponent implements OnInit {

  urlSelected = '';
  docsAvailable = [
    {name: 'Seleccione una opción ...', url: '', group: '', order: 0},
  ];
  groups = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private documentationService: DocumentationService) { }

  ngOnInit() {

    this.getDocs();

  }

  getDocs() {

    this.documentationService.getDocs()
    .subscribe(
      data => {
        // console.log(data);

        const docs = data[0].documentation;

        docs.sort((a, b) => {
          if (a.order < b.order) {
            return -1;
          } else if (a.order > b.order) {
            return 1;
          } else {
            return 0;
          }
        });

        docs.forEach(element => {
          if ( element.active ) {
            this.docsAvailable.push(element);
          }
        });

        this.groups = Array.from(new Set(this.docsAvailable.map(({group}) => group)));

      },
      err => {
        console.error(err);
      },
      () => {
        // console.log('done loading docs');
      }
    );
  }

  onClick (url: string): void {

    console.log(this.urlSelected);
    const result = '';
    const params = {
      url: ''
    };

   if ( url === 'logout') {
      window.location.href = url ;
    } else  if ( this.urlSelected === '' ) {
      swal({
        type: 'error',
        title: 'Falta de selección',
        text: 'Para ir a la documentación, es necesario seleccionar una opción en la lista de opciones'
      });
    } else {
      params.url = this.urlSelected;

      this.documentationService.selectDocsAddress(this.urlSelected)
      .then(
        docs => {
          console.log(docs);
        },
        error => {
          if (error.status === 200) {
            window.location.href = error.url ;
          } else if ((error.status === 404 ) || (error.status === 0 )) {
            swal({
              type: 'error',
              title: 'No encontrado',
              text: 'La documentación seleccionada no existe, hable con el administrador del sistema.'
            });
          } else {
            console.log('Se ha presentado un error no posible de gestionar');
          }

        });
    }

  }

  onChange(value) {
    // console.log(value);
    this.urlSelected = value;
  }
}
