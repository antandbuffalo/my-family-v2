import { Injectable } from '@angular/core';
import { Member } from '../../models/member';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private membersCollection: AngularFirestoreCollection;
  memberSource: Observable<Member[]>;
  members: Member[];

  constructor(private afs: AngularFirestore) { 
    this.membersCollection = this.afs.collection<Member>("members", ref => ref.orderBy('id'));
  }

  getMembers(): Observable<any> {    
    this.memberSource = this.membersCollection.snapshotChanges().pipe(map( actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Member;
        const docId = action.payload.doc.id;
        return { docId, ...data };
      });
    }));
    return this.memberSource;
  }

  updateMember(member: Member) {
    this.membersCollection.doc(member.docId).update({
      name: member.name || "",
      nickName: member.nickName || "",
      dob: member.dob || ""
    });
  }
}
