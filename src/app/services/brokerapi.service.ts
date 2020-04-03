import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HttpClient } from '@angular/common/http';
// import { GlobalsValue } from '../globals.value';
import { IAPIResponse } from '../interfaces/apiResponse';
import { AppConfig } from '../app.config';

@Injectable()
export class BrokerAPIService {
 
    protected ServerApiUrl = AppConfig.settings.ServerApiUrl;
    constructor(private http: HttpClient) {

    }

    getHeaderContentTypeJson() {
        const headerDict = {
            'authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
        return headerDict;
    }



    getHeader() {
        const headerDict = {
            'authorization': 'Bearer ' + localStorage.getItem('token')
        }
        return headerDict;
    }

    get(strUrl: string): Observable<any> {
        return this.http.get<any>(this.ServerApiUrl + strUrl, { headers: this.getHeaderContentTypeJson() });
    }

    post(strUrl: string, objbody: any): Observable<IAPIResponse> {
        return this.http.post<IAPIResponse>(this.ServerApiUrl + strUrl, objbody, { headers: this.getHeaderContentTypeJson() });
    }

    upload(strUrl: string, objbody: any): Observable<IAPIResponse> {
        let input = new FormData();
        input.append("file", objbody);
        return this.http.post<IAPIResponse>(this.ServerApiUrl + strUrl, input, { headers: this.getHeader() });
    }



    downloadImage(imageUrl: string): Observable<any> {
        return this.http
            .get(this.ServerApiUrl + imageUrl, {responseType:"blob" , headers: this.getHeaderContentTypeJson()});
          
    }

   
}

