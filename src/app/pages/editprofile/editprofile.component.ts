import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Specialities } from '../../models/specialities';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  userChanges : Users;
  userLogged : Users;
  specialities : Specialities
  selectedOption :string
  selectedOptions: string[] = []
  selectedSkill :string
  selectedSkills :string[] = []
  roles = ["developer", "designer", "musician", "writer"];
  errors = true;
  msgError = {name: "", username: "", email:"", password: "", coincidePasword: ""};


  constructor(
    private authService : AuthService,
    private usersService : UsersService,
    private specialitiesService : RegisterService,
    private route : ActivatedRoute,
    private router: Router,
  ) {}

  validatePassword(form) {
    this.errors=true;
    if (form.value.password === ""){
      form.value.password = this.userLogged.password
      this.errors=false
    } else {
      if (form.value.password.length >= 6) {
        this.msgError.password = ""
        this.errors=false
      } else this.msgError.password = "Your password has to hae at least 6 characters";
    }
  }

  validateEdit(form):void{
    this.validatePassword(form)
    if (this.errors === false){
      if (form.value.name === ""){
        form.value.name = this.userLogged.name
      }
      if (form.value.email === ""){
        form.value.email = this.userLogged.email
      }
      if (form.value.biography === ""){
        form.value.biography = this.userLogged.biography
      }
      if (form.value.ubication === ""){
        form.value.ubication = this.userLogged.ubication
      }
      if (form.value.websites === ""){
        form.value.websites = this.userLogged.websites
      }
      if (form.value.rol === ""){
        form.value.rol = this.userLogged.rol
      } else {
        form.value.rol = this.removeDuplcates(this.selectedOptions)
      }
      if (form.value.skills === ""){
        form.value.skills = this.userLogged.skills
      } else{
        form.value.skills =this.removeDuplcates(this.selectedSkills)
      }
/*       console.log(form.value);
 */      this.onEdit(form)
    }
  }

  onEdit(form):void{
/*     console.log("Estoy en onEdit");
 */    form.value.username = this.userLogged.username
    this.usersService.editUser(form.value).subscribe( updateUser => {
      this.router.navigateByUrl(`/profile/${this.userLogged.username}`)
      this.authService.saveToken(updateUser)
    })
  }
  removeDuplcates(array) {
    return array.filter((value, index) => array.indexOf(value) === index)
  }
  getUserLogged() {
    this.userLogged = JSON.parse(localStorage.getItem("user"))
  }
  deleteOption(option) :void{
    this.selectedOptions = this.selectedOptions.filter(removable => removable != option)
  }
  deleteSkill(skill) :void{
    this.selectedSkills = this.selectedSkills.filter(removable => removable != skill)
  }
  saveOptions(option){
    this.selectedOptions.push(option)
/*     console.log(this.selectedOptions);
 */  }
  saveSkills(skill){
    this.selectedSkills.push(skill)
/*     console.log(this.selectedSkills);
 */  }
  getAllSkillsByRol(rol :string ){
    this.specialitiesService.getAllbyRol(rol)
    .subscribe(specialities => this.specialities = specialities)
  }

  ngOnInit(): void {
    this.getUserLogged()
  }

}
