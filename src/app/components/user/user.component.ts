import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import Swal from 'sweetalert2'
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{


  //colocamos input ya que los usarios vienen del padre que es user-app se tiene que importar este componente en el padre
  users: User[] = [];



//dentro del cnstructor capturamos los users que vienen del padre y que pasan por navbar y los inyectamos con router
constructor(private router: Router, private service: UserService, private sharinData: SharingDataService){
  if(this.router.getCurrentNavigation()?.extras.state){
    this.users = this.router.getCurrentNavigation()?.extras.state!['users'];
  }
}
  ngOnInit(): void {
    //estpo es  para optimizar y solo consulte el find all de vez en cuando sea igual a 0 null un undefined lo bsque en la base d datos y si no lo obtenga del state de angular
    if(this.users == undefined || this.users == null || this.users.length == 0){
      this.service.findAll().subscribe(users => this.users =users)
    }
    
  }

  //creamos el metodo que se usara para eliminar el cual se emitira con el event emiter
  onRemoveUSer(id: number): void{

    //usamos SweetAlert2 para la confirmacion de eliminar
    Swal.fire({
      title: "Desea Eliminar El Usuario?",
      text: "Es una accion irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.sharinData.idUserEventEmmiter.emit(id);
        Swal.fire({
          title: "Eliminado!",
          text: "El usuario ah sido eliminado",
          icon: "success"
        });
      }
    });

    //con confirm creamos un evento en el cual nos mandar un msj si deseamos eliminar el usuario y validamos con un if que sea true
/*     const confirmRemove = confirm('Esta seguro que desea eliminar?')
    if(confirmRemove){
      this.idUserEventEmmiter.emit(id);
    } */
    
  }



  onSelectedUser(user: User): void {
    //this.sharinData.selectedUserEventEmitter.emit(user);
    this.router.navigate(['/users/edit', user.id]);
  }


}
