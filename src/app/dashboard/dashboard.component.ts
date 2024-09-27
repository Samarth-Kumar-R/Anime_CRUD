import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from '../Service/profile.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private profile: ProfileService) {}
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  profileData: any;
  addForm = new FormGroup({
    charName: new FormControl(''),
    animeName: new FormControl(''),
    imgUrl: new FormControl(''),
  });

  isSwitchModel = false;

  ngOnInit(): void {
    this.profile.getProfiles().subscribe((data) => {
      this.profileData = data;
    });
  }

  idToDelete: any;
  charNameToDelete: string = '';
  confirmDelete(id: any, charName:string) {
    this.idToDelete = id;
    this.charNameToDelete = charName
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // convert file to base64 string
      let reader = new FileReader();
      reader.onload = () => {
        if(this.addForm.get('imgUrl')) {
          const result = reader.result;
          if(result){
            this.addForm.get('imgUrl')?.setValue(result.toString());
          }
        }
      }
    }
  }

  addCharacter() {
    console.table(this.addForm.value);
    this.profile
      .addProfile(this.addForm.value, this.profileData.id + 1)
      .subscribe((data) => {
        this.profileData = data;
      });
  }

  removeCharacter() {
    this.profile.removeProfile(this.idToDelete).subscribe((res) => {
      this.profileData = this.profileData.filter((profile: any) => {
        return profile.id !== this.idToDelete;
      });
    })
  }

  editProfile(name:string, anime:string, imgUrl:string, id:number){
    this.isSwitchModel = true;
    this.addForm.get('charName')?.setValue(name);
    this.addForm.get('animeName')?.setValue(anime);
    this.addForm.get('imgUrl')?.setValue(imgUrl);
  }
}
