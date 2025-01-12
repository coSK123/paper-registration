import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { RegisteredUsersDataSource, RegisteredUsersItem } from './registered-users-datasource';
import { GetUsersFromDatabaseService } from '../../services/get-users-from-database.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrl: './registered-users.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class RegisteredUsersComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<RegisteredUsersItem>;
  dataSource: RegisteredUsersDataSource;

  constructor(private getUserService: GetUsersFromDatabaseService) {
    this.dataSource = new RegisteredUsersDataSource(this.getUserService);
  }

  displayedColumns = ['email', 'firstname', 'lastname', 'role'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
