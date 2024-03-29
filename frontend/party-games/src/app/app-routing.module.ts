import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoomComponent } from './create-room/create-room.component';
import { GameRoomComponent } from './game-room/game-room.component';
import { GamesComponent } from './games/games.component';
import { GuessThePasswordComponent } from './guess-the-password/guess-the-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'games', component: GamesComponent},
  {path: 'guess-the-password', component: GuessThePasswordComponent},
  {path: 'create-room', component: CreateRoomComponent},
  {path: 'game-room', component: GameRoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, HomeComponent, RegisterComponent, GamesComponent, GuessThePasswordComponent, CreateRoomComponent, GameRoomComponent]
