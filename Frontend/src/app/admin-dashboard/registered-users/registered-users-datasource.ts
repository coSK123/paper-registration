import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { GetUsersFromDatabaseService } from '../../services/get-users-from-database.service';
import { User } from '../../services/registerService/register.service';

export interface RegisteredUsersItem {
  lastname: string;
  firstname: string;
  email: string;
  role: string;
}

export class RegisteredUsersDataSource extends DataSource<RegisteredUsersItem> {
  private dataSubject = new BehaviorSubject<RegisteredUsersItem[]>([]);
  data: RegisteredUsersItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private getUserService: GetUsersFromDatabaseService) {
    super();
    this.getUserService.getUsers().subscribe((response: any) => {
      this.data = response;
      this.dataSubject.next(this.data);
    });
  }

  connect(): Observable<RegisteredUsersItem[]> {
    if (this.paginator && this.sort) {
      return merge(this.dataSubject, this.paginator.page, this.sort.sortChange).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error('Paginator and Sort must be set before connecting data source');
    }
  }

  disconnect(): void {
    this.dataSubject.complete();
  }

  private getPagedData(data: RegisteredUsersItem[]): RegisteredUsersItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  private getSortedData(data: RegisteredUsersItem[]): RegisteredUsersItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'firstname': return compare(a.firstname, b.firstname, isAsc);
        case 'lastname': return compare(a.lastname, b.lastname, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'role': return compare(a.role, b.role, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
