import {
    inject,
    TestBed
} from '@angular/core/testing';
import {
    HttpModule,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { Hero } from './hero';
import { HeroService } from './hero.service';


describe('HeroService', () => {

    let target: HeroService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                },
                HeroService
            ]
        });

        target = TestBed.get(HeroService);
    });

    describe('getAll()', () => {

        describe('when endpoint has no errors', () => {

            beforeEach(inject([XHRBackend], (mockBackend) => {
                mockBackend
                    .connections
                    .subscribe(connection =>
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify([
                                {
                                    id: 1,
                                    name: 'Superman'
                                }
                            ])
                        }))));
            }));

            it('should return correctly', () => {
                target
                    .getAll()
                    .then(heroes => {
                        expect(heroes).toBeDefined();
                        expect(heroes.length).toBe(1);
                    });
            });

        });

        describe('when endpoint has errors', () => {

            beforeEach(inject([XHRBackend], (mockBackend) => {
                mockBackend
                    .connections
                    .subscribe(connection =>
                        connection.mockError(new Error('an error')));

                console.error = () => null;
            }));

            it('should return correctly', () => {
                target
                    .getAll()
                    .catch(reason =>
                        expect(reason).toBe('an error'));
            });

        });

    });

    describe('create()', () => {

        describe('when endpoint has no errors', () => {

            beforeEach(inject([XHRBackend], (mockBackend) => {
                mockBackend
                    .connections
                    .subscribe(connection =>
                        connection.mockRespond(new Response(new ResponseOptions({
                            body: JSON.stringify({
                                id: 1,
                                name: 'Superman'
                            })
                        }))));
            }));

            it('should return correctly', () => {
                target
                    .create('Superman')
                    .then(hero => {
                        expect(hero).toBeDefined();
                        expect(hero.id).toBe(1);
                    });
            });

        });

        describe('when endpoint has errors', () => {

            beforeEach(inject([XHRBackend], (mockBackend) => {
                mockBackend
                    .connections
                    .subscribe(connection =>
                        connection.mockError(new Error('an error')));

                console.error = () => null;
            }));

            it('should return correctly', () => {
                target
                    .create('Superman')
                    .catch(reason =>
                        expect(reason).toBe('an error'));
            });

        });

    });

    describe('update()', () => {

        const expectedHero: Hero = {
            id: 1,
            name: 'Superman'
        };

        describe('when endpoint has no errors', () => {

            beforeEach(inject([XHRBackend], (mockBackend) => {
                mockBackend
                    .connections
                    .subscribe(connection =>
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 201
                        }))));
            }));

            it('should return correctly', () => {
                target
                    .update(expectedHero)
                    .then(actualHero =>
                        expect(actualHero).toBe(expectedHero));
            });

        });

        describe('when endpoint has errors', () => {

            beforeEach(inject([XHRBackend], (mockBackend) => {
                mockBackend
                    .connections
                    .subscribe(connection =>
                        connection.mockError(new Error('an error')));

                console.error = () => null;
            }));

            it('should return correctly', () => {
                target
                    .update(expectedHero)
                    .catch(reason => {
                        expect(reason).toBe('an error');
                    });
            });

        });

    });

    describe('delete()', () => {

        describe('when endpoint has no errors', () => {

            beforeEach(inject([XHRBackend], (mockBackend) => {
                mockBackend
                    .connections
                    .subscribe(connection =>
                        connection.mockRespond(new Response(new ResponseOptions({
                            status: 201
                        }))));
            }));

            it('should return correctly', () => {
                target
                    .delete(1)
                    .then(() => expect(true).toBe(true));
            });

        });

        describe('when endpoint has errors', () => {

            beforeEach(inject([XHRBackend], (mockBackend) => {
                mockBackend
                    .connections
                    .subscribe(connection =>
                        connection.mockError(new Error('an error')));

                console.error = () => null;
            }));

            it('should return correctly', () => {
                target
                    .delete(1)
                    .catch(reason =>
                        expect(reason).toBe('an error'));
            });

        });

    });

});
