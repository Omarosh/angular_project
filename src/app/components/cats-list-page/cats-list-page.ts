import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal, Signal, WritableSignal, resource, Resource } from '@angular/core';
import { Zoom } from "../../directives/zoom";
import { Shadow } from "../../directives/shadow";
import { WordslicePipe } from "../../pipes/wordslice-pipe";
import { ICat } from '../types/icat';
import { CatDataService } from '../services/cat-data.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IBreeds } from '../types/ibreeds';
import { BreedDataService } from '../services/breed-data.service';
import { Observable, of, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-cats-list-page',
  imports: [Zoom, Shadow, WordslicePipe, RouterLink, FormsModule, AsyncPipe],
  templateUrl: './cats-list-page.html',
  styleUrl: './cats-list-page.css',
})
export class CatsListPage implements OnInit {

  breeds: IBreeds[] = [];
  selectedBreedID: string = "";
  filteratedListObservable!: Observable<ICat[]>;
  showAll = false;
  initialLimit = 4;
  catsSignal: WritableSignal<ICat[]> = signal([]);
  filteratedListSubscription!: Subscription;

  catsPromise!: Promise<ICat[]>;

  catResource = resource({
    loader: () => this.catDataService.getAllCatsPromise(),
  },
  );


  constructor(public catDataService: CatDataService, public breedsList: BreedDataService, private changeDetectorRef: ChangeDetectorRef) {
    // this.filteratedListObservable = this.catDataService.getAllCats();
    // this.filteratedListSubscription = this.filteratedListObservable.subscribe((catsArray: ICat[]) => {
    //   console.log('catsArray', catsArray);
    //   this.catsSignal.set(catsArray);
    // });
  }

  ngOnInit(): void {
    this.breeds = this.breedsList.getAllBreeds();
    this.catResource.reload();
  }


  // getCatsToShow() {

  //   this.catDataService.getAllCats().subscribe((catsArray: ICat[]) => {

  //     if (this.selectedBreedID == null || this.selectedBreedID === 'all') {

  //       this.filteratedList = this.showAll
  //         ? [...catsArray]
  //         : catsArray.slice(0, this.initialLimit);

  //     } else {

  //       this.filteratedList = catsArray.filter(
  //         el => el.breedsId === this.selectedBreedID
  //       );

  //     }

  //   });

  // }

  toggleDescription(cat: ICat) {
    cat.expanded = !cat.expanded;
  }

  ngOnDestroy(): void {
    this.filteratedListSubscription.unsubscribe();
  }
}
