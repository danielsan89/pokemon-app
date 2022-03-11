import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DataService } from './services/data.service';
import { PokemonApiService } from './services/pokemon-api.service';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { PaginatorComponent } from './utils/paginator/paginator.component';
import { GameBoyComponent } from './utils/game-boy/game-boy.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UserSettingsComponent,
    PaginatorComponent,
    GameBoyComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  exports: [HttpClientModule],
  providers: [PokemonApiService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
