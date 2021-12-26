import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/interfaces/userInterface';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  users:Users [] = []
  constructor(private userService: UserService, private toastr: ToastrService) { }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (res:any) => {
        console.log(res)
        console.log(res.address)
        this.users = res
      }, error: (httpError:any) =>{
        console.log(httpError)
      }
    })
  }

  addUser(user:any) {
    this.userService.addUser(user).subscribe({
      next:()=>{
        this.users.splice(0,0,user)
      }
    })
  }

  deleteUser(userId:any, index:number) {
    this.userService.deleteUser(userId).subscribe({
      next:()=>{
        this.users.splice(index,1)
      }
    })
  }

  showSuccess() {
    this.toastr.success('Deleted successfully.', 'Done!');
  }

  ngOnInit(): void {
    this.getUsers()
  }

}
