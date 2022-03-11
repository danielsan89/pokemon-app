import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  themeSubscription: Subscription = new Subscription();
  theme!: string;
  title = 'pokemon-app';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.themeSubscription = this.dataService
      .getUserTheme()
      .pipe()
      .subscribe((res: any) => (this.theme = res));
  }
}
