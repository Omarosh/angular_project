import { Routes } from '@angular/router';
import { Errorpage } from './components/errorpage/errorpage';
import { Home } from './components/home/home';
import { Aboutcat } from './components/aboutcat/aboutcat';
import { ObservableTestComponent } from './observable-test-component/observable-test-component';

export const routes: Routes = [

    { path: '', component: Home },
    {
        path: 'cats',
        loadComponent: () =>
            import('./components/cats-list-page/cats-list-page').then((c) => c.CatsListPage)
    },
    {
        path: 'adopt',
        loadComponent: () =>
            import('./components/forms/adobtcat/adoptcat').then((c) => c.Adoptcat)
    },
    {
        path: 'offer',
        loadComponent: () =>
            import('./components/forms/offercat/offercat').then((c) => c.Offercat)
    },

    { path: 'aboutcats/:ID', component: Aboutcat },
    { path: 'observable-test', loadComponent: () => import('./observable-test-component/observable-test-component').then((c) => c.ObservableTestComponent) },

    // {path: 'adopt', component:Adoptcat},
    // {path: 'offer', component:Offercat}
    { path: '**', component: Errorpage }
];
