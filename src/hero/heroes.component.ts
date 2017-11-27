import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Hero } from './hero';
import { HeroService } from './hero.service';


class HeroItem extends Hero {

    isEditing: boolean;

}


/**
 * Heroes component.
 *
 */
@Component({
    selector: 'heroes',
    templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

    isLoading: boolean = false;
    heroes: HeroItem[] = [];


    /**
     * Creates a Heroes component.
     *
     * @param {HeroService} heroService Hero service to use.
     * @param {MatSnackBar} snackBar Snack bar.
     */
    constructor(
        private readonly heroService: HeroService,
        private readonly snackBar: MatSnackBar) {
    }


    ngOnInit(): void {
        this.heroService
            .getAll()
            .then(heroes => heroes.forEach(hero => this.heroes.push({
                id: hero.id,
                name: hero.name,
                isEditing: false
            })));
    }


    edit(heroToEdit: HeroItem): void {
        if (!heroToEdit) {
            return;
        }

        heroToEdit.isEditing = true;
    }


    save(heroToSave: HeroItem): void {
        if (!heroToSave) {
            return;
        }

        this.isLoading = true;

        this.heroService
            .update(heroToSave)
            .then(updatedHero => {
                this.snackBar
                    .open('Hero updated', 'Edit', {
                        duration: 1000
                    });

                heroToSave.isEditing = false;

                this.isLoading = false;
            })
            .catch(() => this.isLoading = false);
    }


    delete(heroToDelete: HeroItem): void {
        if (!heroToDelete) {
            return;
        }

        this.isLoading = true;

        this.heroService
            .delete(heroToDelete.id)
            .then(() => {
                this.snackBar
                    .open('Hero deleted', 'Delete', {
                        duration: 1000
                    });

                this.heroes = this.heroes.filter(hero => hero.id !== heroToDelete.id);

                this.isLoading = false;
            })
            .catch(() => this.isLoading = false);
    }


    add(name: string): void {
        if (!name) {
            return;
        }

        this.isLoading = true;

        this.heroService
            .create(name)
            .then(newHero => {
                this.snackBar
                    .open('Hero added', 'Add', {
                        duration: 1000
                    });

                this.heroes.push({
                    id: newHero.id,
                    name: newHero.name,
                    isEditing: false
                });

                this.isLoading = false;
            })
            .catch(() => this.isLoading = false);
    }

}
