import { Component, OnInit } from '@angular/core';
import { Member } from '../models/member';
import { RestService } from '../services/rest-service/rest.service';
import { MemberService } from '../services/member-service/member.service';
import { Router } from '@angular/router';

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
    private router: Router) {
  }
  ngOnInit() {
    this.getMembers();
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
