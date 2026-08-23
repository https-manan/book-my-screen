import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

const USER_API = 'http://localhost:8080/app/api/v1/';

// plain baseQuery, same as what you already had
const baseQuery = fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
});

// mutex is for only one refresh call runs at a time, even if multiple
// requests fail with 401 simultaneously
const mutex = new Mutex();


const baseQueryWithReauth = async (args, api, extraOptions) => {
    // if a refresh is already happening, wait for it before firing this request
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // no one else is refreshing right now -> this request does it
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                // re-check: maybe another request refreshed while we were
                // waiting to acquire the lock, so try the original call again first
                result = await baseQuery(args, api, extraOptions);

                if (result.error && result.error.status === 401) {
                    const refreshResult = await baseQuery(
                        {
                            url: '/auth/refresh-token', // relative to baseUrl -> full path is /app/api/v1/auth/refresh-token
                            method: 'GET',
                        },
                        api,
                        extraOptions
                    );

                    if (refreshResult.data) {
                        // cookies were updated by the server directly (httpOnly),
                        // so we just retry the original request
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        // refresh itself failed -> refresh token expired/invalid too
                        // TODO: dispatch a logout action / clear user state here
                        // api.dispatch(logout());
                    }
                }
            } finally {
                release();
            }
        } else {
            // someone else is already refreshing -> wait, then retry
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export const appApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        createMovie: build.mutation({
            query: ({ formData }) => ({
                url: "/movie",
                method: "POST",
                body: formData,
            })
        }),
        getAllMovies: build.query({
            query: () => ({
                url: '/movie/all',
                method: "GET"
            })
        }),
        getMovieById: build.query({
            query: ({ id }) => ({
                url: `/movie/${id}`,
                method: "GET",
            })
        }),
        getRecommendedMovies: build.query({
            query: () => ({
                url: '/movie/recommended',
                method: "GET"
            })
        }),
        createTheater: build.mutation({
            query: ({ formData }) => ({
                url: '/theater',
                method: "POST",
                body: formData
            })
        }),
        getAllTheaters: build.query({
            query: () => ({
                url: "/theater/all",
                method: "GET"
            })
        }),
        getTheaterByState: build.query({
            query: ({ state }) => ({
                url: `/theater/theaters?state=${state}`,
                method: "GET",
            })
        }),
        createShow: build.mutation({
            query: ({ formData }) => ({
                url: '/show/',
                method: "POST",
                body: formData,
            })
        }),
        getShowById: build.query({
            query: ({ id }) => ({
                url: `/show/${id}`,
                method: 'GET'
            })
        }),
        updateSeatStatus: build.mutation({
            query: ({ showId, formData }) => ({
                url: `/show/${showId}`,
                method: "PUT",
                body: formData
            })
        }),
        getShowByMovieAndLocation: build.query({
            query: ({ movieId, date, location }) => ({
                url: `/show/movie/${movieId}?date=${date}&location=${location}`,
                method: "GET",
            })
        }),
        getOtpByEmail: build.mutation({
            query: ({ email }) => ({
                url: '/auth/send-otp',
                method: "POST",
                body: { email },
            })
        }),
        verifyEmail: build.mutation({
            query: ({ hash, otp, email }) => ({
                url: '/auth/verify-otp',
                method: "POST",
                body: { hash, otp, email },
            })
        }),
        activateUser: build.mutation({
            query: ({ id, userStatus }) => ({
                url: `/user/activate/${id}`,
                method: "POST",
                body: { userStatus },
            })
        }),
        logout: build.query({
            query: ({}) => ({
                url: "/auth/logout",
                method: 'POST'
            })
        }),
        createUser: build.mutation({
            query: ({ name, email, phone }) => ({
                url: '/user',
                method: "POST",
                body: { name, email, phone },
            })
        }),
        findUserByEmail: build.mutation({
            query: ({ email }) => ({
                url: '/user/email',
                method: "POST",
                body: { email },
            })
        })
    }),
})

export const {
    useCreateMovieMutation,
    useGetAllMoviesQuery,
    useGetMovieByIdQuery,
    useGetRecommendedMoviesQuery,
    useCreateTheaterMutation,
    useGetAllTheatersQuery,
    useGetTheaterByStateQuery,
    useCreateShowMutation,
    useGetShowByMovieAndLocationQuery,
    useGetShowByIdQuery,
    useUpdateSeatStatusMutation,
    useGetOtpByEmailMutation,
    useLogoutQuery,
    useActivateUserMutation,
    useVerifyEmailMutation,
    useCreateUserMutation,
    useFindUserByEmailMutation
} = appApi;