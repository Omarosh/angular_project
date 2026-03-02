import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICat } from '../types/icat';
import { CatDataService } from '../services/cat-data.service';

@Component({
  selector: 'app-aboutcat',
  templateUrl: './aboutcat.html',
  styleUrls: ['./aboutcat.css'],
  imports: [RouterLink]
})
export class Aboutcat implements OnInit {
  id: number | null = null;
  selectedCat: ICat | null = null;

  constructor(private active: ActivatedRoute, private catService: CatDataService) {}

  ngOnInit(): void {
    this.id = Number(this.active.snapshot.paramMap.get('ID'));

    if (!isNaN(this.id)) {
      this.catService.getCatById(this.id).subscribe(cat => {
        this.selectedCat = cat;
      });
    }
  }
}