import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import swal from 'sweetalert2';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.css']
})
export class DocsListComponent implements OnInit {

  urlSelected = '';
  docsAvailable = [
    {name: 'Seleccione una opción ...', url: '', group: ''},
  ];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit() {

    this.http.get('documents')
    .toPromise()
    .then( res => {
      // console.log(res);
      const docs = res[0].documentation;

      docs.forEach(element => {
        this.docsAvailable.push(element);
      });
    })
    .catch(err => {
      console.log(err);
    });


  }

  onClick(url: string): void {

    console.log(this.urlSelected);
    const result = '';
    const params = {
      url: ''
    };

    // let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

    if ( this.urlSelected === '' ) {
      swal({
        type: 'error',
        title: 'Falta de selección',
        text: 'Para ir a la documentación, es necesario seleccionar una opción en la lista de opciones'
      });
    } else if ( url === 'logout') {
      window.location.href = url ;
    } else {
      params.url = this.urlSelected;

      this.http.post('documents', params)
                    .toPromise()
                    .then( res => {
                      console.log(JSON.stringify(res));
                    })
                    .catch(err => {
                      console.log(err);
                      console.log (err.status);
                      if (err.status === 200) {
                        window.location.href = err.url ;
                      } else if (err.status === 404 ) {
                        swal({
                          type: 'error',
                          title: 'No encontrado',
                          text: 'La documentación seleccionada no existe, hable con el administrador del sistema.'
                        });
                      } else {
                        console.log('Se ha rpesentado un error no posible de gestionar');
                      }

                    });

    }

  }

  onChange(value) {
    console.log(value);
    this.urlSelected = value;
  }
}
