import { AfterViewInit, Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DashboardTableDataSource, DashboardTableItem } from './dashboard-table-datasource';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DbService } from 'src/app/services/db.service';
import { MatDialog } from '@angular/material/dialog';
import { switchMap, shareReplay } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ModifyDialogComponent } from 'src/app/shared/modify-dialog/modify-dialog.component';

@Component({
  selector: 'app-dashboard-table',
  templateUrl: './dashboard-table.component.html',
  styleUrls: ['./dashboard-table.component.scss']
})
export class DashboardTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DashboardTableItem>;
  dataSource: DashboardTableDataSource;

  @Input()
  deckId;

  cards$: Observable<any>;
  deckFilter$: BehaviorSubject<string>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['action', 'question', 'answer', 'createdDate', 'modifiedDate'];

  constructor(
    private auth: AuthService
    , private db: DbService
    , public dialog: MatDialog) {
      this.deckFilter$ = new BehaviorSubject(this.deckId);
  }

  ngOnInit() {
    this.cards$ = this.deckFilter$.pipe(
      switchMap( newDeckId =>
        this.auth.user$.pipe(
          switchMap(user =>
            this.db.collection$('cards', ref =>
              ref
                .where('uid', '==', user.uid)
                .where('deckid', '==', newDeckId)
                .orderBy('createdDate', 'desc')
            )  
          ),
          shareReplay(1),
        )  
      )
    );

    this.cards$.subscribe(_ => {
      this.dataSource = new DashboardTableDataSource(this.paginator, this.sort, _);
    });

    
  }

  ngOnChanges(_changes: SimpleChanges) {
    this.deckFilter$.next(_changes.deckId.currentValue);
  }

  openDeleteDialog(row): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {title: 'Delete', message: `Now Delete Card Id: ${ row.id }... `}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Delete dialog was closed: ${result}`);
      if (!!result) {
        // delete
        this.db.delete(`cards/${ row.id }`);
      }
    });
  }

  openModifyDialog(row): void {
    // console.log(`Before Modify:`);
    // console.table(row);

    const dialogRef = this.dialog.open(ModifyDialogComponent, {
      maxWidth: '500px',
      data: { ...row }
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`After Modify:`);
      // console.table(result);
      if (!!result) {
        // modify
        this.db.updateAt(`cards/${ row.id }`, result);
      }
    });
  }
}
