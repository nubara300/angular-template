import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PersonService } from 'src/app/services/person.service';
import { PersonFormComponent } from '../person-form/person-form.component';
import { debounceTime, first } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from 'src/app/models';

export interface MatColumns {
  title: string;
  key: string;
}

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonSearchComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //generic part
  displayedColumns: MatColumns[] = [
    { title: 'Id', key: 'id' },
    { title: 'Name', key: 'name' },
    { title: 'Surname', key: 'lastName' },
    { title: 'PIN', key: 'pin' },
    { title: 'Age', key: 'age' },
    { title: 'Gender', key: 'gender' }];
  dataSource = new MatTableDataSource<Person>([]);

  columnNames: string[];
  baseColumNames: string[] = ['dateCreated', 'dateModified', 'actions']
  totalElements: number = 0;
  showLoader: boolean = false;
  constructor(
    private matDialog: MatDialog,
    private personService: PersonService,
    private matSnack: MatSnackBar) {
    this.columnNames = this.displayedColumns.map(x => x.key);
    this.columnNames = this.columnNames.concat(this.baseColumNames);
    this.search(null);
  }

  ngOnInit(): void {
  }

  search(parameters: Person | null) {
    this.showLoader = true;
    this.personService.searchPersons(parameters).pipe(first(),debounceTime(2000)).subscribe(
      (x: Person[]) => {
        if (x) {
          this.dataSource.data = x;
          this.dataSource.paginator = this.paginator;
          this.totalElements = x.length;
          this.showLoader = false;
        }
      });
  }

  openDetails(id: number) {
    this.matDialog.open(PersonFormComponent, { data: { id: id } }).afterClosed().pipe().subscribe(x => {
      if (x) this.search(null);
    });
  }

  deleteItem(id: number) {
    this.personService.deletePerson(id).pipe(first()).subscribe(x => {
      if (x === true) {
        this.matSnack.open("Succesfully deleted!", "Notification", { duration: 4000, panelClass: ['successSnack'] })
        this.search(null);
      } else {
        this.matSnack.open("Error occured!", 'Error', { duration: 4000, panelClass: ['errorSnack'] })
      }
    });
  }
}
