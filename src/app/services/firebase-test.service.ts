import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseTestService {
  constructor(private firestore: Firestore) {}

  getTestData(): Observable<any[]> {
    const testCollection = collection(this.firestore, 'Tickets'); // 'test' is the collection name
    console.log(testCollection)
    return collectionData(testCollection);
  }
}
