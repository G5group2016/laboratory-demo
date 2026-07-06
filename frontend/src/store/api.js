import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Tests', 'Packages', 'Doctors', 'Bookings', 'Blogs', 'Testimonials', 'Gallery', 'Contacts', 'Users'],
  endpoints: (builder) => ({
    // ======== AUTH ========
    login: builder.mutation({
      query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
    }),
    register: builder.mutation({
      query: (userData) => ({ url: '/auth/register', method: 'POST', body: userData }),
    }),
    getMe: builder.query({
      query: () => '/auth/me',
    }),

    // ======== TESTS ========
    getTests: builder.query({
      query: (params = {}) => ({
        url: '/tests',
        params,
      }),
      providesTags: ['Tests'],
    }),
    getTestCategories: builder.query({
      query: () => '/tests/categories',
    }),
    createTest: builder.mutation({
      query: (data) => ({ url: '/tests/admin', method: 'POST', body: data }),
      invalidatesTags: ['Tests'],
    }),
    updateTest: builder.mutation({
      query: ({ id, body }) => ({ url: `/tests/admin/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Tests'],
    }),
    deleteTest: builder.mutation({
      query: (id) => ({ url: `/tests/admin/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Tests'],
    }),

    // ======== PACKAGES ========
    getPackages: builder.query({
      query: (params = {}) => ({ url: '/packages', params }),
      providesTags: ['Packages'],
    }),
    createPackage: builder.mutation({
      query: (data) => ({ url: '/admin/packages', method: 'POST', body: data }),
      invalidatesTags: ['Packages'],
    }),
    updatePackage: builder.mutation({
      query: ({ id, body }) => ({ url: `/admin/packages/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Packages'],
    }),
    deletePackage: builder.mutation({
      query: (id) => ({ url: `/admin/packages/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Packages'],
    }),

    // ======== DOCTORS ========
    getDoctors: builder.query({
      query: (params = {}) => ({ url: '/doctors', params }),
      providesTags: ['Doctors'],
    }),
    createDoctor: builder.mutation({
      query: (data) => ({ url: '/admin/doctors', method: 'POST', body: data }),
      invalidatesTags: ['Doctors'],
    }),
    updateDoctor: builder.mutation({
      query: ({ id, body }) => ({ url: `/admin/doctors/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Doctors'],
    }),
    deleteDoctor: builder.mutation({
      query: (id) => ({ url: `/admin/doctors/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Doctors'],
    }),

    // ======== BOOKINGS ========
    createBooking: builder.mutation({
      query: (data) => ({ url: '/bookings', method: 'POST', body: data }),
      invalidatesTags: ['Bookings'],
    }),
    getMyBookings: builder.query({
      query: () => '/bookings/my',
      providesTags: ['Bookings'],
    }),
    getAllBookings: builder.query({
      query: (params = {}) => ({ url: '/bookings/admin', params }),
      providesTags: ['Bookings'],
    }),
    updateBooking: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/bookings/admin/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Bookings'],
    }),
    getDashboardStats: builder.query({
      query: () => '/bookings/admin/stats',
    }),

    // ======== BLOGS ========
    getBlogs: builder.query({
      query: (params = {}) => ({ url: '/blogs', params }),
      providesTags: ['Blogs'],
    }),
    getBlog: builder.query({
      query: (slug) => `/blogs/${slug}`,
    }),
    getAdminBlogs: builder.query({
      query: (params = {}) => ({ url: '/blogs/admin', params }),
      providesTags: ['Blogs'],
    }),
    createBlog: builder.mutation({
      query: (data) => ({ url: '/blogs/admin', method: 'POST', body: data }),
      invalidatesTags: ['Blogs'],
    }),
    updateBlog: builder.mutation({
      query: ({ id, body }) => ({ url: `/blogs/admin/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Blogs'],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({ url: `/blogs/admin/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Blogs'],
    }),

    // ======== TESTIMONIALS ========
    getTestimonials: builder.query({
      query: () => '/testimonials',
      providesTags: ['Testimonials'],
    }),

    // ======== GALLERY ========
    getGallery: builder.query({
      query: (params = {}) => ({ url: '/gallery', params }),
      providesTags: ['Gallery'],
    }),
    createGalleryItem: builder.mutation({
      query: (data) => ({ url: '/admin/gallery', method: 'POST', body: data }),
      invalidatesTags: ['Gallery'],
    }),
    deleteGalleryItem: builder.mutation({
      query: (id) => ({ url: `/admin/gallery/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Gallery'],
    }),

    // ======== CONTACT ========
    submitContact: builder.mutation({
      query: (data) => ({ url: '/contact', method: 'POST', body: data }),
    }),
    getContacts: builder.query({
      query: (params = {}) => ({ url: '/contact/admin', params }),
      providesTags: ['Contacts'],
    }),
    updateContact: builder.mutation({
      query: ({ id, body }) => ({ url: `/contact/admin/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Contacts'],
    }),

    // ======== USERS (Admin) ========
    getUsers: builder.query({
      query: (params = {}) => ({ url: '/admin/users', params }),
      providesTags: ['Users'],
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({ url: `/admin/users/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({ url: `/admin/users/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useLoginMutation, useRegisterMutation, useGetMeQuery,
  useGetTestsQuery, useGetTestCategoriesQuery, useCreateTestMutation, useUpdateTestMutation, useDeleteTestMutation,
  useGetPackagesQuery, useCreatePackageMutation, useUpdatePackageMutation, useDeletePackageMutation,
  useGetDoctorsQuery, useCreateDoctorMutation, useUpdateDoctorMutation, useDeleteDoctorMutation,
  useCreateBookingMutation, useGetMyBookingsQuery, useGetAllBookingsQuery, useUpdateBookingMutation, useGetDashboardStatsQuery,
  useGetBlogsQuery, useGetBlogQuery, useGetAdminBlogsQuery, useCreateBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation,
  useGetTestimonialsQuery,
  useGetGalleryQuery, useCreateGalleryItemMutation, useDeleteGalleryItemMutation,
  useSubmitContactMutation,
  useGetContactsQuery, useUpdateContactMutation,
  useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation,
} = api;

