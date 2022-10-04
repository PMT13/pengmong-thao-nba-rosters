import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpService} from "../http.service";
import {first} from "rxjs";
import {IPlayer} from "../interfaces/IPlayer";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  @Input() player!: IPlayer;
  @Output() onUpdateTeam = new EventEmitter<IPlayer>();
  playerCopy = {...this.player};
  name!: string;
  imgURL!: string;
  position!: string;
  number!: number;

  constructor(private httpService: HttpService,private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.name = this.player.name;
    this.imgURL = this.player.picture;
    this.position = this.player.position;
    this.number = this.player.number;
  }

  removePlayer(){
    this.httpService.removePlayer(this.player.id).pipe(first()).subscribe({
      next: (data) => {
        this.onUpdateTeam.emit(this.player);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  save(){
    const player:IPlayer = {
      id: this.player.id,
      name: this.name,
      position: this.position,
      number: this.number,
      picture: this.imgURL
    }
    this.httpService.editPlayer(player).pipe(first()).subscribe({
      next: (data) => {
        this.onUpdateTeam.emit(player);
        this.modalService.dismissAll();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  editPlayer(content:any){
    this.modalService.open(content);
  }

  resetInput(){
    this.name = this.playerCopy.name;
    this.imgURL = this.playerCopy.picture;
    this.position = this.playerCopy.position;
    this.number = this.playerCopy.number;
  }
}
