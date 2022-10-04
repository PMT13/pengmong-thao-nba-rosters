import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {first} from "rxjs";
import {IPlayer} from "../interfaces/IPlayer";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  playerList!: any;
  constructor(private httpService: HttpService) {
    this.getPlayers();
  }

  ngOnInit(): void {
  }

  getPlayers(){
    this.httpService.getPlayers().pipe(first()).subscribe({
      next: (data) => {
        console.log(data);
        this.playerList = data;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
