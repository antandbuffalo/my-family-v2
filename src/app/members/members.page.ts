import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member';
import { RestService } from '../services/rest-service/rest.service';
import { MemberService } from '../services/member-service/member.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase-service/firebase.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {
  members: Member[];
  errorMessage: String;
  
  constructor(private restService: RestService, 
    private memberService: MemberService,
    private router: Router,
    private storage: FirebaseService) {
      
  }
  ngOnInit() {
    //this.getMembers();
    this.members = this.storage.members;
  }

  getMembers() {
    this.restService.getMembers().subscribe(
      members => {           
        this.members = members.members;
        console.log(this.members);
      },
      error =>  this.errorMessage = <any>error);
  }

  itemSelected(selected) {
    console.log(selected);
    this.memberService.setMember(selected);
    this.router.navigateByUrl("member-details");
  }

}
