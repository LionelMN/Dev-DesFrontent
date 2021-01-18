import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { Users } from '../../models/users';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {

  textArea: string = ""
  selectedNeed: string
  selectedNeeds: string[] = []
  msgError = {title: "", text: "", categories:"", needs: ""}
  errors = true
  userLogged: Users;
  constructor(
    private postService: PostsService,
    public router: Router,
    private authService: AuthService,
    private usersService: UsersService
    ) { }

  ngOnInit(): void {
    this.getUserLogged()
  }

  validateTitle(form){
    this.errors=true;
    if (form.value.title) {
      this.errors=false;
      this.msgError.title = "";
    } else {
      this.msgError.title = "Insert a project title";
    }
  }
  validateDescription(form){
    this.errors=true;
    if (form.value.text && form.value.text.length < 251) {
      this.errors=false;
      this.msgError.text = "";
    } else {
      this.msgError.text = "Insert a project description";
    }
  }

  removeDuplcates(array) {
    return array.filter((value, index) => array.indexOf(value) === index)
  }

  onValidatePost(form){
    this.validateTitle(form)
    this.validateDescription(form)
    let filteredNeeds =this.removeDuplcates(this.selectedNeeds)
    if (this.errors === false){
      this.onPost(form, filteredNeeds)
    }
  }

  onPost(form,needs) :void{
    form.value.need = needs
    form.value.owner = this.userLogged.username
    this.postService.postPublication(form.value).subscribe(res => {
      this.router.navigateByUrl(`/home`);
    })
    this.usersService.getUser(this.userLogged.username).subscribe( updateUser => {
      this.authService.saveUserLogged(updateUser)
    })
  }

  saveNeed(need){
    this.selectedNeeds.push(need)
  }

  getUserLogged() {
    this.userLogged = JSON.parse(localStorage.getItem("user"))
  }

  deleteNeeds(need) :void{
    this.selectedNeeds = this.selectedNeeds.filter(removable => removable != need)
  }

}
