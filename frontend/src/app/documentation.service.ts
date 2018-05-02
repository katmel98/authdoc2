import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Logger } from './logger.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DocumentationService {

  constructor(
    private http: HttpClient,
    private logger: Logger) { }

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
      this.logger.log('Prueba del Log: desde el OK');
      return res;
    })
    .catch(err => {
      // console.log(err);
      // console.log (err.status);
      this.logger.log('Prueba del Log: desde el ERROR');
      return Promise.reject(err);
    });
  }

}
