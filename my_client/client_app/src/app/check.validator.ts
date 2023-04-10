import { AbstractControl, FormGroup } from "@angular/forms";

// tên không chứa ký tự đặc biệt
export function customerValidator(control: AbstractControl): {
  [key:string]:any} | null{
    const matchName =/\@|\#|\$|\%|\^|\&/g.test(control.value);
    return matchName ? {'nameNotMatch':{value: control.value}}:null;
  }

// kiểm tra khớp mật khẩu
export function passwordValidator(formGroup: FormGroup) {
  const password = formGroup.get('password');
  const confirmPass = formGroup.get('confirmPass');

  if (password?.value !== confirmPass?.value) {
    confirmPass?.setErrors({ misMatch: true });
  } else {
    confirmPass?.setErrors(null);
  }
}
