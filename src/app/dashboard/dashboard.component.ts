import { Component } from '@angular/core';
import { ProfileService } from '../Service/profile.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private profile: ProfileService) {}

  profileData: any;
  addForm = new FormGroup({
    charName: new FormControl(''),
    animeName: new FormControl(''),
    imgUrl: new FormControl(''),
  });
  ngOnInit(): void {
    this.profile.getProfiles().subscribe((data) => {
      this.profileData = data;
      console.warn('tada', this.profileData);
    });
  }

  addCharacter() {
    console.table(this.addForm.value);
    this.profile
      .addProfile(this.addForm.value, this.profileData.id + 1)
      .subscribe((data) => {
        console.warn('data', data);
        this.profileData = data;
      });
  }

  removeProfile() {
    this.profile.removeProfile(this.addForm.value, this.profileData.id);
  }
}
