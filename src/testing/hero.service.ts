import { Hero } from '../hero/hero';


export class MockHeroService {

    getAll(): Promise<Hero[]> {
        return Promise.reject('');
    }


    create(name: string): Promise<Hero> {
        return Promise.reject('');
    }


    update(hero: Hero): Promise<Hero> {
        return Promise.reject('');
    }


    delete(id: number): Promise<void> {
        return Promise.reject('');
    }

}
