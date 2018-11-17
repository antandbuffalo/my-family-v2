import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Member } from './../models/member';
import { RestService } from './../services/rest-service/rest.service';
import { FirebaseService } from '../services/firebase-service/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  members: Member [];
  errorMessage: String;
  livingMembers = 0;
  totalMembers = 0;
  membersCloud: Observable<Member[]>;

  constructor(private restService: RestService, 
    private router: Router,
    private storage: FirebaseService) {
      this.fetchData();
  }

  fetchData() {
    this.membersCloud = this.storage.getMembers();    
    this.membersCloud.subscribe(res => {
      console.log("after adding id");
      console.log(res);
      this.members = res;
      this.storage.members = this.members;
      this.getTotalLivingMembers();
    });
  }

  ngOnInit() {
    //this.getMembers();
  }

  getMembers() {
    this.restService.getMembers()
       .subscribe(
          members => {
            console.log(members.members);
            this.members = members.members;
            this.getTotalLivingMembers();
          },
          error =>  this.errorMessage = <any>error);
  }
  itemSelected(selected) {
    this.router.navigateByUrl("members");
  }
  getTotalLivingMembers() {
    var total = 0;
    for(let i=0; i < this.members.length; i++) {
      if(this.members[i].living) {
        total++;
      }
    }
    this.livingMembers = total;
    this.totalMembers = this.members.length;
  }


}
