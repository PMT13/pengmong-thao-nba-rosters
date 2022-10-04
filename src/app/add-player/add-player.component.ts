import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {first} from "rxjs";
import {HttpService} from "../http.service";
import {IPlayer} from "../interfaces/IPlayer";

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  @Output() onUpdateTeam = new EventEmitter<IPlayer>();
  name: string = "";
  imgURL: string = "";
  position: string = "";
  number: number = 0;
  id: number = new Date().getTime();

  constructor(private modalService: NgbModal,private httpService: HttpService) { }

  ngOnInit(): void {
  }

  addPlayer(){
    const player:IPlayer = {
      id: this.id,
      name: this.name,
      position: this.position,
      number: this.number,
      picture: this.imgURL
    }
    this.httpService.addPlayer(player).pipe(first()).subscribe({
      next: (data) => {
        this.onUpdateTeam.emit(player);
        this.modalService.dismissAll();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  open(content:any){
    this.modalService.open(content);
  }

  resetInput(){
    this.name = "";
    this.imgURL = "";
    this.position = "";
    this.number = 0;
  }
}
