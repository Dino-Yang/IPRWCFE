import {Component, OnInit} from '@angular/core';
import {fadeInUpOnEnterAnimation} from "angular-animations";
import {User} from "../../shared/_model/user";
import {UserService} from "../../shared/_services/user.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmComponent} from "./confirm/confirm.component";
import {ToastService} from "../../shared/_services/toast.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [fadeInUpOnEnterAnimation({anchor: 'enter'})]
})
export class UsersComponent implements OnInit {
  list: User[] = [];
  displayedColumns: string[] = ['ID', 'USERNAME', 'EMAIL', 'ENABLE'];
  searchText: any;
  dataSource: any;

  constructor(private userService: UserService, public modalService: NgbModal, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.userService.getAll()
      .subscribe({
        next: response => {
          this.list = response.payload;
          this.dataSource = new MatTableDataSource(this.list);
        }
      })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openConfirm(user: User) {
    const modelRef = this.modalService.open(ConfirmComponent, {size: "lg"})
    modelRef.componentInstance.user = user;
    modelRef.result.then((data => {
      if (data === 'Yes') {
        user.enabled = !user.enabled;
        this.userService.putUser(user).subscribe()
        if (user.enabled) {
          this.toastService.show('', "You've just enabled user " + user.username);
        } else {
          this.toastService.show('', "You've just disabled user " + user.username);
        }
      }
    }))
  }
}
