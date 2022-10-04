import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IPlayer} from "./interfaces/IPlayer";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getPlayers(){
    return this.httpClient.get('http://localhost:3000/timberwolves');
  }

  removePlayer(id: number){
    return this.httpClient.delete('http://localhost:3000/timberwolves/' + id);
  }

  addPlayer(player:IPlayer){
    return this.httpClient.post('http://localhost:3000/timberwolves/',player);
  }

  editPlayer(player:IPlayer){
    return this.httpClient.put('http://localhost:3000/timberwolves/' + player.id, player);
  }
}
