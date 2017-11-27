import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBar,
    MatSnackBarModule,
    MatToolbarModule
} from '@angular/material';

import { TestingModule } from '../testing/testing.module';

import { HeroService } from './hero.service';
import { MockHeroService } from '../testing/hero.service';
import { HeroesComponent } from './heroes.component';


describe('HeroesComponent', () => {

    let fixture: ComponentFixture<HeroesComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                imports: [
                    FormsModule,
                    MatButtonModule,
                    MatFormFieldModule,
                    MatIconModule,
                    MatInputModule,
                    MatProgressBarModule,
                    MatSnackBarModule,
                    MatToolbarModule,
                    TestingModule
                ],
                declarations: [
                    HeroesComponent
                ],
                providers: [
                    {
                        provide: HeroService,
                        useClass: MockHeroService
                    }
                ]
            })
            .compileComponents()
            .then(() =>
                fixture = TestBed.createComponent(HeroesComponent))
            .catch(reason =>
                console.error(`Unable to compile components: ${reason}`));
    }));

    it('should create the component', async(() => {
        const target = fixture.debugElement.componentInstance;

        expect(target).toBeDefined();
    }));

    it('should initialise correctly', async(() => {
        const target = fixture
            .debugElement
            .componentInstance as HeroesComponent;

        expect(target.isLoading).toBeFalsy();
        expect(target.heroes.length).toBe(0);
    }));

    describe('edit()', () => {

        let target: HeroesComponent;

        beforeEach(async(() => {
            target = fixture
                .debugElement
                .componentInstance as HeroesComponent;
        }));

        describe('when Hero is not specified', () => {

            it('should not do anything', () => {
                target.edit(null);
            });

        });

        describe('when Hero is specified', () => {

            it('should update the Hero correctly', async(() => {
                const hero = {
                    id: 1,
                    name: 'Superman',
                    isEditing: false
                };

                target.edit(hero);

                expect(hero.isEditing).toBeTruthy();
            }));

        });

    });

    describe('save()', () => {

        let target: HeroesComponent;

        beforeEach(async(() => {
            target = fixture
                .debugElement
                .componentInstance as HeroesComponent;
        }));

        describe('when Hero is not specified', () => {

            it('shoud not do anything', () => {
                target.save(null);
            });

        });

        describe('when Hero is specified', () => {

            let heroService: HeroService;
            let snackBar: MatSnackBar;
            let hero;

            beforeEach(() => {
                snackBar = fixture
                    .debugElement
                    .injector
                    .get(MatSnackBar);
                spyOn(snackBar, 'open');

                hero = {
                    id: 1,
                    name: 'Superman',
                    isEditing: true
                };
            });

            describe('and server has no error', () => {

                beforeEach(async(() => {
                    heroService = fixture
                        .debugElement
                        .injector
                        .get(HeroService);
                    spyOn(heroService, 'update')
                        .and
                        .returnValue(Promise.resolve({}));

                    target.save(hero);
                }));

                it('should call the server', () => {
                    expect(heroService.update).toHaveBeenCalled();
                    expect(heroService.update).toHaveBeenCalledTimes(1);
                });

                it('should open a snackbar', async(() => {
                    expect(snackBar.open).toHaveBeenCalled();
                    expect(snackBar.open).toHaveBeenCalledTimes(1);
                }));

                it('should update the Hero correctly', async(() => {
                    expect(hero.isEditing).toBeFalsy();
                }));

            });

            describe('and server has an error', () => {

                beforeEach(async(() => {
                    heroService = fixture
                        .debugElement
                        .injector
                        .get(HeroService);
                    spyOn(heroService, 'update')
                        .and
                        .returnValue(Promise.reject('an error'));

                    target.save(hero);
                }));

                it('should call the server', () => {
                    expect(heroService.update).toHaveBeenCalled();
                    expect(heroService.update).toHaveBeenCalledTimes(1);
                });

                it('should not update the Hero', async(() => {
                    expect(hero.isEditing).toBeTruthy();
                }));

            });

        });

    });

    describe('delete()', () => {

        let target: HeroesComponent;

        beforeEach(async(() => {
            target = fixture
                .debugElement
                .componentInstance as HeroesComponent;
        }));

        describe('when Hero is not specified', () => {

            it('shoud not do anything', () => {
                target.delete(null);
            });

        });

        describe('when Hero is specified', () => {

            let heroService: HeroService;
            let snackBar: MatSnackBar;
            let hero;

            beforeEach(() => {
                snackBar = fixture
                    .debugElement
                    .injector
                    .get(MatSnackBar);
                spyOn(snackBar, 'open');

                hero = {
                    id: 1,
                    name: 'Superman',
                    isEditing: false
                };
            });

            describe('and server has no error', () => {

                beforeEach(async(() => {
                    heroService = fixture
                        .debugElement
                        .injector
                        .get(HeroService);
                    spyOn(heroService, 'delete')
                        .and
                        .returnValue(Promise.resolve({}));

                    target.delete(hero);
                }));

                it('should call the server', () => {
                    expect(heroService.delete).toHaveBeenCalled();
                    expect(heroService.delete).toHaveBeenCalledTimes(1);
                });

                it('should open a snackbar', async(() => {
                    expect(snackBar.open).toHaveBeenCalled();
                    expect(snackBar.open).toHaveBeenCalledTimes(1);
                }));

                it('should update the Hero correctly', async(() => {
                    expect(target.heroes.length).toBe(0);
                }));

            });

            describe('and server has an error', () => {

                beforeEach(async(() => {
                    heroService = fixture
                        .debugElement
                        .injector
                        .get(HeroService);
                    spyOn(heroService, 'delete')
                        .and
                        .returnValue(Promise.reject('an error'));

                    target.delete(hero);
                }));

                it('should call the server', () => {
                    expect(heroService.delete).toHaveBeenCalled();
                    expect(heroService.delete).toHaveBeenCalledTimes(1);
                });

                it('should not update the Hero', async(() => {
                    expect(target.isLoading).toBeFalsy();
                }));

            });

        });

    });

    describe('add()', () => {

        let target: HeroesComponent;

        beforeEach(async(() => {
            target = fixture
                .debugElement
                .componentInstance as HeroesComponent;
        }));

        describe('when name is not specified', () => {

            it('shoud not do anything', () => {
                target.add(null);
            });

        });

        describe('when name is specified', () => {

            let heroService: HeroService;
            let snackBar: MatSnackBar;

            beforeEach(() => {
                snackBar = fixture
                    .debugElement
                    .injector
                    .get(MatSnackBar);
                spyOn(snackBar, 'open');
            });

            describe('and server has no error', () => {

                beforeEach(async(() => {
                    heroService = fixture
                        .debugElement
                        .injector
                        .get(HeroService);
                    spyOn(heroService, 'create')
                        .and
                        .returnValue(Promise.resolve({
                            id: 1,
                            name: 'Superman'
                        }));

                    target.add('Superman');
                }));

                it('should call the server', () => {
                    expect(heroService.create).toHaveBeenCalled();
                    expect(heroService.create).toHaveBeenCalledTimes(1);
                });

                it('should open a snackbar', async(() => {
                    expect(snackBar.open).toHaveBeenCalled();
                    expect(snackBar.open).toHaveBeenCalledTimes(1);
                }));

                it('should add the Hero correctly', async(() => {
                    expect(target.heroes.length).toBe(1);
                }));

            });

            describe('and server has an error', () => {

                beforeEach(async(() => {
                    heroService = fixture
                        .debugElement
                        .injector
                        .get(HeroService);
                    spyOn(heroService, 'create')
                        .and
                        .returnValue(Promise.reject('an error'));

                    target.add('Superman');
                }));

                it('should call the server', () => {
                    expect(heroService.create).toHaveBeenCalled();
                    expect(heroService.create).toHaveBeenCalledTimes(1);
                });

                it('should not update the Hero', async(() => {
                    expect(target.isLoading).toBeFalsy();
                }));

            });

        });

    });

});
