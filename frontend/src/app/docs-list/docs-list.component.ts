import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.css']
})
export class DocsListComponent implements OnInit {

  urlSelected = 'prueba';
  docsAvailable = [
    {name: 'Auth Docs', url: '/auth_docs/docs/static', group: 'General'},
    {name: 'Temis Workflow Backend', url: '/temis_public_docs/docs/static', group: 'Temis Workflow'},
    {name: 'Temis Workflow Frontend', url: '/temis_public_docs/docs/static', group: ' Temis Workflow'}
  ];

  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private http: HttpClient) { }

  ngOnInit() {
  }

  onClick(url: string): void {
    console.log(this.urlSelected);
    let result = '';
    var params = {
      url: ''
    }
    
    // let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

    params.url = this.urlSelected;


    this.http.post('documents', params)
                  .toPromise()
                  .then( res => {
                    console.log(JSON.stringify(res));
                  })
                  .catch(err => {
                    console.log(err);
                    window.location.href = err.url ;

                  });



  }

  onChange(value) {
    console.log(value);
    this.urlSelected = value;
  }
}
