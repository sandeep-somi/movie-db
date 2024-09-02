import moviesSlice, { fetchMovies } from '../moviesSlice'
import { mockMovies } from '../../constants/jest-helpers'

jest.mock('../../apis', () => ({
    getMoviesAPI: jest.fn(() => Promise.resolve(mockMovies)),
    discoverMoviesAPI: jest.fn(() => Promise.resolve(mockMovies)),
}));

describe('moviesSlice', () => {
    it('should set loading to true during fetchMovies.pending', () => {
        const initialState = moviesSlice.initialState;
        const pendingAction = { type: fetchMovies.pending };
        const newState = moviesSlice.reducer(initialState, pendingAction);
        expect(newState.loading).toBe(true);
    });

    it('should update movies and page on fetchMovies.fulfilled with page 1', () => {
        const initialState = moviesSlice.initialState;
        const fulfilledAction = { type: fetchMovies.fulfilled, payload: mockMovies };
        const newState = moviesSlice.reducer(initialState, fulfilledAction);

        expect(newState.movies).toEqual(mockMovies.results);
        expect(newState.page).toBe(mockMovies.page);
        expect(newState.loading).toBe(false);
        expect(newState.hasMore).toBe(mockMovies.results.length > 0);
    });

    it('should update movies and page on fetchMovies.fulfilled with page > 1', () => {
        const existingMovies = [{ id: 1 }, { id: 2 }];
        const initialState = { ...moviesSlice.initialState, movies: existingMovies }; 
        const page2Movies = {
            ...mockMovies,
            page: 2
        }

        const fulfilledAction = { type: fetchMovies.fulfilled, payload: page2Movies };
        const newState = moviesSlice.reducer(initialState, fulfilledAction);

        expect(newState.movies).toEqual([...existingMovies, ...mockMovies.results]);
        expect(newState.page).toBe(page2Movies.page);
        expect(newState.loading).toBe(false);
        expect(newState.hasMore).toBe(mockMovies.results.length > 0);
    });

    it('should reset movies state on resetMovies action', () => {
        const initialState = {
            movies: [{ id: 1 }, { id: 2 }],
            page: 2,
            hasMore: true,
        };
        const resetAction = moviesSlice.actions.resetMovies();
        const newState = moviesSlice.reducer(initialState, resetAction);

        expect(newState.movies).toEqual([]);
        expect(newState.page).toBe(0);
        expect(newState.hasMore).toBe(false);
    });

    it('should handle reject', () => {
        const initialState = {
            movies: [{ id: 1 }, { id: 2 }],
            page: 2,
            hasMore: true,
        };
        const rejectAction = { type: fetchMovies.rejected, payload: null };
        const newState = moviesSlice.reducer(initialState, rejectAction);

        expect(newState.loading).toEqual(false);
    });
});
