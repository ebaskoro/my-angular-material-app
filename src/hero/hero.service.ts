import { Injectable } from '@angular/core';
import {
    Headers,
    Http,
    RequestOptionsArgs
} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';
import { Hero } from './hero';


/**
 * Hero service.
 *
 */
@Injectable()
export class HeroService {

    private readonly url = `${environment.baseApiUrl}/heroes`;
    private readonly options: RequestOptionsArgs = {
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };


    /**
     * Creates a Hero service.
     *
     * @param {Http} http Http service to use.
     */
    constructor(private readonly http: Http) {
    }


    /**
     * Gets all Heroes.
     *
     * @returns {Hero[]} Collections of all Hero.
     */
    getAll(): Promise<Hero[]> {
        return this.http
            .get(this.url)
            .toPromise()
            .then(value => value.json() as Hero[])
            .catch(this.handleError);
    }


    /**
     * Creates a Hero.
     *
     * @param {string} name The Hero's name.
     * @returns {Hero} The newly created Hero.
     */
    create(name: string): Promise<Hero> {
        const body = JSON.stringify({
            name: name
        });
        return this.http
            .post(this.url, body, this.options)
            .toPromise()
            .then(value => value.json() as Hero)
            .catch(this.handleError);
    }


    /**
     * Updates a Hero.
     *
     * @param {Hero} hero The Hero to update.
     * @returns {Hero} The updated Hero.
     */
    update(hero: Hero): Promise<Hero> {
        const body = JSON.stringify(hero);
        return this.http
            .put(`${this.url}/${hero.id}`, body, this.options)
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }


    /**
     * Deletes a Hero.
     *
     * @param {number} id The ID of the Hero to delete.
     */
    delete(id: number): Promise<void> {
        return this.http
            .delete(`${this.url}/${id}`, this.options)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }


    private handleError(reason: any): Promise<any> {
        console.error('An error occurred', reason);
        return Promise.reject(reason.message || reason);
    }

}
