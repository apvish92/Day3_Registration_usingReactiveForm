import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators,ValidatorFn,FormBuilder,AbstractControl} from '@angular/forms';
import {Model} from '../model';

@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})
export class ReactiveformComponent implements OnInit {
  model:Model;
  Rform:FormGroup;
  constructor(formBuilder:FormBuilder) {
    this.Rform=formBuilder.group({
      fnameControl:['',[Validators.required,Validators.maxLength(12)]],
      lnameControl:['',[Validators.required,Validators.maxLength(12)]],
      address:formBuilder.group({
        city:['',[Validators.required,,this.customValidator(2)]],
        state:['',Validators.required],
        pincode:['',[Validators.required]],
      }),
      emailControl:['',[Validators.required,Validators.email]],
      passwordControl:['',Validators.required],
      cpasswordControl:['',Validators.required]       
    });
   }

  ngOnInit() {
  }
  submit(){
    console.log( this.Rform);
    this.Rform.reset({
      fnameControl:'',
      lnameControl:'None'
    });
  }

  customValidator(divisor:number):ValidatorFn{
    return (control:AbstractControl):{[key:string]:any}|null=>{
      console.log(control);
      return (control.value.indexOf("Bangalore")!=-1?null:{'result':{value:control.value}});
    };
  }

}
