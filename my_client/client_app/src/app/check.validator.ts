import { AbstractControl } from "@angular/forms";

// tên không chứa ký tự đặc biệt
export function customerValidator(control: AbstractControl): {
  [key:string]:any} | null{
    const matchName =/\@|\#|\$|\%|\^|\&/g.test(control.value);
    return matchName ? {'nameNotMatch':{value: control.value}}:null;
  }

// kiểm tra khớp mật khẩu
export function passwordValidator (control: AbstractControl): {
  [key: string]: any} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPass');
  if ((password && password.pristine) || (confirmPassword && confirmPassword.pristine)) {
    return null;
  }
  return password && confirmPassword && password.value !== confirmPassword.value ? {'misMatch': true} : null;
  }
