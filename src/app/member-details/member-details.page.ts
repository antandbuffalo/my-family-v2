import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MemberService } from '../services/member-service/member.service';
import { UtilityService } from '../services/utility-service/utility.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase-service/firebase.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.page.html',
  styleUrls: ['./member-details.page.scss'],
})
export class MemberDetailsPage implements OnInit {

  member: any

  constructor(private memberService: MemberService, 
    private location: Location,
    private utility: UtilityService,
    private router: Router,
    private storage: FirebaseService) {
  }

  ngOnInit() {
    this.member = this.memberService.currentMember;
    if(!this.member.dob) {
      this.member.dob = this.utility.getToday();
    }  
  }

  save() {
    console.log(this.member);
    this.storage.updateMember(this.member);
    this.location.back();
  }

  cancel() {
    this.location.back();
  }

}
