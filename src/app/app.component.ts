import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //port = 6065;
  hostname = 'https://api-mang-matman-poc.azure-api.net';
  url = this.hostname +  '/weatherforecast';

  title = 'Angular App';
  response = "No data loaded, yet";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': '90bf6d12f5554c1ba39dea3835620f47'
    })
  };

  constructor(private http: HttpClient) {
    // const headers = new HttpHeaders();
    // headers.set('Content-Type', 'application/json');
    // headers.set('Ocp-Apim-Subscription-Key', '90bf6d12f5554c1ba39dea3835620f47');

    const options = {
      headers: this.httpOptions.headers, observe: 'response' as const, responseType: 'json' as const };

    this.http.get<HttpResponse<any>>(this.url, options)
      .pipe(
        map(response => response.body as any)
      )
      .subscribe(
        data => {
          console.log('Response:', data);
          this.response = JSON.stringify(data);
        },
        error => {
          console.error('Error:', error);
          this.response = error;
        }
      );
    // this.http.get(this.url, { responseType: 'text' }).subscribe((response: any) => {
    //     console.log(response);
    //     this.response = response;
    //   });
    // }
  };
};

/*
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  port = '';
  //https://api-mang-matman-poc.azure-api.net/weatherforecast
  hostname = 'http://localhost:6065' //'https://api-mang-matman-poc.azure-api.net';

  url = this.hostname + '/weatherforecast';


  title = 'Angular App';
  response = "No data loaded, yet";

  private httpOptions = {
    headers: new HttpHeaders({
      responseType: 'text',
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': '90bf6d12f5554c1ba39dea3835620f47'
    })
  };

  constructor(private http: HttpClient) {
    this.http.get(this.hostname + ':' + this.port + '/weatherforecast', 
      this.httpOptions).subscribe((response: any) => {
        console.log(response);
        this.response = response;
      });
  }
  //https://api.publicapis.org/entries
};
private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': '90bf6d12f5554c1ba39dea3835620f47'
    }),
    //responseType: 'text'
  };
*/