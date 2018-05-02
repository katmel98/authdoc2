import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DocumentationService {

  constructor(private http: HttpClient) { }

  getDocs() {
    return this.http.get('documents');
  }

  selectDocsAddress(url: string) {
    const params = {
      url: ''
    };

    params.url = url;

    return this.http.post('documents', params, httpOptions)
    .toPromise()
    .then( res => {
      // console.log(JSON.stringify(res));
      return res;
    })
    .catch(err => {
      // console.log(err);
      // console.log (err.status);
      return Promise.reject(err);
    });
  }

}
