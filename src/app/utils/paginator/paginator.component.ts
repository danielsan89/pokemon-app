import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnChanges {
  @Input() selectedPage!: number;
  @Input() pagesNb!: number;
  @Output() trigger: EventEmitter<any> = new EventEmitter();

  pagesArray: number[] = [];

  constructor(private dataService: DataService) {}

  ngOnChanges(): void {
    if (this.pagesNb) {
      for (let index = 0; index < this.pagesNb + 1; index++) {
        if (!this.pagesArray.includes(index)) {
          this.pagesArray.push(index);
        }
      }
    }
  }

  selectPage(page: number): void {
    this.dataService.setSelectedPage(page);
    this.trigger.emit();
  }

  previousPage(): void {
    this.selectPage(Number(this.selectedPage) - 1);
    this.trigger.emit();
  }

  nextPage(): void {
    this.selectPage(Number(this.selectedPage) + 1);
    this.trigger.emit();
  }
}
