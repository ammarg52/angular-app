import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular App';
  response = "No data loaded, yet";

  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8090/weatherforecast',
      { responseType: 'text' }).subscribe((response: any) => {

        console.log(response);
        this.response = response;
      });
  }
  //https://api.publicapis.org/entries
};
