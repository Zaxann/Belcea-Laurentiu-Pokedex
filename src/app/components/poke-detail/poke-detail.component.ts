import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrl: './poke-detail.component.scss'
})
export class PokeDetailComponent implements OnInit {
  pokemon: any = '';
  pokemonType = [];
  pokemonImg = '';
  pokemonexperience= '';
  constructor (private pokemonService: PokemonService,private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id']);

      }
    )
   }

  ngOnInit(): void {
    
  }
  getPokemon(id: number){
    this.pokemonService.getPokemons(id).subscribe(
      res => {
        console.log(res);
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.front_default;
        this.pokemonType = res.types[0].type.name;
        this.pokemonexperience = res.base_experience;
      },
      err => {

      }
    )

  }
}
