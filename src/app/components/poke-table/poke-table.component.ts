import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {
  displayedColumns: string[] = ['position', 'image', 'name'];
  dataSource = new MatTableDataSource<any>();
  
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  constructor(private pokeService: PokemonService,private router:Router) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    for (let i = 1; i <= 150; i++) {
      this.pokeService.getPokemons(i).subscribe(
        res => {
          const pokemonData = {
            position: i,
            image: res.sprites.front_default,
            name: res.name
          };
          this.dataSource.data.push(pokemonData);
          this.dataSource.paginator = this.paginator;
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getRow(row: any){
    this.router.navigateByUrl(`pokeDetail/${row.position}`);
  }
}
