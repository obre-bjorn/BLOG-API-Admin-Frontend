import { useState, useEffect, useCallback } from "react"
import { useAuth } from "../authContext"
import useFetch from "./useFetch"


export const usePosts = () => {

    const [blogs, setBlogs] = useState([])
    const {token} = useAuth()
    const {get, post, put, del} = useFetch(token)


    const fetchBlogs = useCallback( async () => {
        
        try {
            const response = await get('/posts')

            const data = await response.json()

            setBlogs(data.posts)

        } catch (error) {
            console.error("Failed to fetch blogs:",error)
        }


    },[get])


    useEffect(()=> {
        fetchBlogs()
    },[fetchBlogs])

    const addPost = async (postData) => {

        try {
            
            const response = await post('/post', postData)
            
            if(response.ok){

                await fetchBlogs()
                return true
            }


        } catch (error) {
            
            console.error("Failed toa add post:", error)

        }

    } 

    const updatePost = async (id,postData) =>{
        try {
            
            const response = await put(`post/${id}`,postData)

            if(response.ok){

                await fetchBlogs()
                return true

            }


        } catch (error) {
            console.error("Failed to update post:", error)
        }

        
    }

    const deletePost = async (id) => {

        try {
            const response = await del(`/post/${id}`)

            if(response.ok){ 

                await fetchBlogs()

                return true

            }

        } catch (error) {
            console.error("Failed to delete post:", error)
        }

    }





    return {blogs,addPost,updatePost,deletePost}


}