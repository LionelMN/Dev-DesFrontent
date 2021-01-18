import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Posts } from 'src/app/models/posts';
import { Users } from 'src/app/models/users';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {

  id : string
  post : Posts
  textArea: string = ""
  selectedNeed: string
  selectedNeeds: string[] = []
  userLogged: Users;
  constructor( private postService: PostsService, private routes: ActivatedRoute, public router: Router) { }


  ngOnInit(): void {
    this.getUserLogged()
    this.getPost()
  }

  getPost(){
    this.id = this.routes.snapshot.paramMap.get('id')
    this.postService.getPost(this.id).subscribe( post => this.post= post)
  }

  validateTitle(form){
    if (form.value.title) {
    } else {
      form.value.title = this.post.title
    }
  }
  validateDescription(form){
    if (form.value.text && form.value.text.length < 251) {
    } else {
      form.value.text = this.post.text
    }
  }
  validateCategory(form){
    if (form.value.category) {
    } else {
      form.value.category = this.post.category
    }
  }
  validateNeeds(form){
    if (form.value.need) {
    } else {
      form.value.need = this.post.need
    }
  }

  removeDuplcates(array) {
    return array.filter((value, index) => array.indexOf(value) === index)
  }

  onValidatePost(form){
    this.validateTitle(form)
    this.validateDescription(form)
    let filteredNeeds =this.removeDuplcates(this.selectedNeeds)
    this.onPostEdit(form, filteredNeeds)

  }
  onPostEdit(form,needs) :void{
    form.value.need = needs
    form.value.owner = this.userLogged.username
    this.postService.editPost(this.id, form.value).subscribe(res => {
      this.router.navigateByUrl(`/post/${this.post._id}`);
    })

  }

  saveNeed(need){
    this.selectedNeeds.push(need)
/*     console.log(this.selectedNeeds); */
  }

  getUserLogged(){
    this.userLogged = JSON.parse(localStorage.getItem("user"))
  }

  deleteNeeds(need) :void{
    this.selectedNeeds = this.selectedNeeds.filter(removable => removable != need)
  }

}
