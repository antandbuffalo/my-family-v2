import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Member } from '../../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  currentMember: Member;

  constructor() {
    console.log('Hello MemberService');
  }

  setMember(member: Member) {
    this.currentMember = member;
  }
}
