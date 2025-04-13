import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, map, tap } from 'rxjs';
import { Tag } from 'src/app/shared/models/Tag';
import { Ticket } from 'src/app/shared/models/Ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private ticketsCollection: AngularFirestoreCollection<Ticket>;
  private tickets: Observable<Ticket[]>;

  constructor(private afs: AngularFirestore,
    private storage: AngularFireStorage
    ) { 
    this.ticketsCollection = afs.collection<Ticket>('Tickets');
    this.tickets = this.ticketsCollection.valueChanges({ idField: 'id' });
  }

  getTicketById(id:string): Observable<Ticket | undefined> {
    return this.afs.doc<Ticket>(`Tickets/${id}`).valueChanges();
  }

  capitalizeFirstLetter(str: string): string {
    const word = str.charAt(0).toUpperCase() + str.slice(1)
    return word;
  }
    
  getAllTicketsBySearchTerm(searchTerm: string): Observable<Ticket[]> {
    const capitalizedSearchTerm = this.capitalizeFirstLetter(searchTerm);
    const startAt = capitalizedSearchTerm;
    const endAt = capitalizedSearchTerm + '\uf8ff';
  
    return this.afs.collection<Ticket>('Tickets', ref =>
      ref.where('name', '>=', startAt)
         .where('name', '<=', endAt)
         .orderBy('name')
         .limit(5)
    ).valueChanges({ idField: 'id' });
  }

  getAllTicketsByTag(tag: string): Observable<Ticket[]> {
    if (tag == 'All exhibition') {
      return this.tickets;
    } else {
      return this.afs.collection<Ticket>('Tickets', ref => 
        ref.where('tags', 'array-contains', tag).orderBy('name')
      ).valueChanges({ idField: 'id' });
    }
  }
  getAllTickets(): Observable<Ticket[]> {
    return this.tickets.pipe(
      tap(tickets => {
        console.log('Service fetched tickets:', tickets);
      })
    );
  }

  getAllTags(): Tag[] {
    return [
      { name: 'All exhibition', count: 10 },
      { name: 'Literary', count: 1 },
      { name: 'Photography', count: 1 },
      { name: 'Art', count: 6 },
      { name: 'Historical', count: 2 }
    ];
  }

  // Add new ticket
  addTicket(ticket: Ticket): Promise<any> {
    return this.ticketsCollection.add(ticket);
  }

  // Delete ticket
  deleteTicket(ticketId: string): Promise<void> {
    return this.ticketsCollection.doc(ticketId).delete();
  }

  // Update ticket
  updateTicket(ticketId: string, ticket: Ticket): Promise<void> {
    const ticketRef = this.ticketsCollection.doc(ticketId.toString());
    return ticketRef.update(ticket);
  }
}
