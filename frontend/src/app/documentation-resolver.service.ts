import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DocumentationService } from './documentation.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DocumentationResolver implements Resolve<any> {
    constructor(
        private documentationService: DocumentationService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        console.log('EJECUTANDO EL OBSERVABLE ...');
        return this.documentationService.getDocs().map(docs => {
            console.log(docs);
            return docs;
        });
    }
}
