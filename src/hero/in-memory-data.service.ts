import { InMemoryDbService } from 'angular-in-memory-web-api';


export class InMemoryDataService implements InMemoryDbService {

    createDb() {
        const heroes = [
            {
                id: 1,
                name: 'Dare Devil'
            },
            {
                id: 2,
                name: 'The Punisher'
            },
            {
                id: 3,
                name: 'Luke Cage'
            },
            {
                id: 4,
                name: 'Jessica Jones'
            },
            {
                id: 5,
                name: 'Iron Fist'
            }
        ];
        return {
            heroes
        };
    }

}
