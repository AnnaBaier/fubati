import { Injectable, Inject } from '@angular/core';
import { Location } from './location';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './api-base-url';
import { AuthService } from './auth.service';
import { Search } from './search';

@Injectable({
  providedIn: 'root'
})
export class LocationRepositoryService {

  constructor(private readonly httpClient: HttpClient, @Inject(API_BASE_URL) private readonly apiBaseUrl: string, private readonly authService: AuthService) { }

  public async add(location: Location): Promise<void> {
    return this.httpClient.post<void>(this.apiBaseUrl + 'location', location, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).toPromise();
  }

  public async getAll(): Promise<Location[]> {
    return this.httpClient.get<Location[]>(this.apiBaseUrl + 'location', {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).toPromise();
  }

  public async getSeachedLocations(searchItems: Search): Promise<Location[]> {
    return this.httpClient.post<Location[]>(this.apiBaseUrl + 'location/search', searchItems, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).toPromise();
  }

  public async get(location_id: number): Promise<Location> {
    return this.httpClient.get<Location>(this.apiBaseUrl + `location/${location_id}`, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).toPromise();
  }

  public async delete(location_id: number): Promise<void> {
    return this.httpClient.delete<void>(this.apiBaseUrl + `location/${location_id}`, {
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    }).toPromise();
  }
}
