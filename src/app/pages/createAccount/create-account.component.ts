import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register/register.service';
import { Specialities } from '../../models/specialities';
import { Users } from '../../models/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private specialitiesService: RegisterService, private router: Router) { }

  selectedOption :string
  selectedOptions: string[] = []
  selectedSkill :string
  selectedSkills :string[] = []
  roles = ["developer", "designer", "musician", "writer"];
  activated2Part = false;
  specialities : Specialities
  msgError = {name: "", username: "", email:"", password: "", coincidePasword: ""}
  errors = true

  validateName(form) {
    this.errors=true;
    if (form.value.name) {
      this.errors=false;
      this.msgError.name = "";
    } else {
      this.msgError.name = "Insert a name";
    }
  }

  validateUsername(form) {
    this.errors=true;
    if (form.value.username) {
      this.errors=false;
      this.msgError.username = "";
    } else this.msgError.username = "Insert a username";
  }
  validateEmail(form) {
    this.errors=true;
    if (form.value.email) {
      this.errors=false;
      this.msgError.email = ""
    } else this.msgError.email += "Insert a email";
  }
  validatePassword(form) {
    this.errors=true;
    if (form.value.password && form.value.password.length >= 6) {
      this.errors=false;
      this.msgError.password = ""
    } else this.msgError.password = "Your password has to hae at least 6 characters";
  }
  validateCoincidePaswword(form){
    this.errors=true;
    if (form.value.password === form.value.confirmPassword){
      this.errors=false;
      this.msgError.coincidePasword = "";
    } else this.msgError.coincidePasword = "The passwords doesn't match";
  }

  validateFirstPart(form):void{
    if (this.errors === false){
      this.activate2part()
    }
  }

  showPassword(id){
    const x = document.getElementById(id);
    if (x.getAttribute('type') === 'password') {
      x.setAttribute('type', 'text');
    } else {
      x.setAttribute('type', 'password');
    }
  }

  deleteOption(option) :void{
    this.selectedOptions = this.selectedOptions.filter(removable => removable != option)
  }
  deleteSkill(skill) :void{
    this.selectedSkills = this.selectedSkills.filter(removable => removable != skill)
  }

  removeDuplcates(array) {
    return array.filter((value, index) => array.indexOf(value) === index)
  }

  validateSecondPart(form):void{
    let filteredOptions = this.removeDuplcates(this.selectedOptions)
    let filteredSkills =this.removeDuplcates(this.selectedSkills)

    this.onRegister(form, filteredOptions, filteredSkills)

  }

  saveOptions(option){
    this.selectedOptions.push(option)
/*     console.log(this.selectedOptions); */

  }
  saveSkills(skill){
    this.selectedSkills.push(skill)
/*     console.log(this.selectedSkills); */

  }
  activate2part() :void{
    this.activated2Part = !this.activated2Part;
  }

  getAllSkillsByRol(rol :string ){
    this.specialitiesService.getAllbyRol(rol)
    .subscribe(specialities => this.specialities = specialities)
  }

  onRegister(form, rol, skills):void{
    form.value.rol = rol;
    form.value.skills = skills
    this.specialitiesService.register(form.value).subscribe( res => {
      this.router.navigateByUrl('/home')
    })
  }

  ngOnInit(): void {
  }

}
