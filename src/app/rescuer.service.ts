import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Rescuer } from './rescuer';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class RescuerService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getRescuers(): Observable<Rescuer[]> {
    return this.http.get<Rescuer[]>(`${this.apiServerUrl}/rescuer/all`);
  }

  public addRescuer(rescuer: Rescuer): Observable<Rescuer> {
    return this.http.post<Rescuer>(`${this.apiServerUrl}/rescuer/add`, rescuer);
  }

  public updateRescuer(rescuer: Rescuer): Observable<Rescuer> {
    return this.http.post<Rescuer>(`${this.apiServerUrl}/rescuer/update`, rescuer);
  }

  public deleteRescuer(rescuerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/rescuer/delete/${rescuerId}`);
  }
}
