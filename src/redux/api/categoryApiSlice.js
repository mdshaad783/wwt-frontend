import { CATEGORY_URL } from "../features/constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createCategory: builder.mutation({
            query:(newcategory)=>({
                url:`${CATEGORY_URL}`,
                method:"POST",
                body:newcategory
            }),
        }),

        updateCategory:builder.mutation({
            query:({categoryId, updatedCategory})=>({
                url:`${CATEGORY_URL}/${categoryId}`,
                method:"PUT",
                body:updatedCategory
            })
        }),
        deleteCategory:builder.mutation({
            query:(categoryId)=>({
                url:`${CATEGORY_URL}/${categoryId}`,
                method:"DELETE",
            })
        }),
        fetchCategories:builder.query({
            query:()=>`${CATEGORY_URL}/categories`
        })
    })
})

export const { useCreateCategoryMutation,useUpdateCategoryMutation, useDeleteCategoryMutation, useFetchCategoriesQuery} = categoryApiSlice