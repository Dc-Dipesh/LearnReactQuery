import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useRef } from "react"
import { createPost } from "./api/posts"
import Post from "./Post"

const CreatePost = ({ setCurrentPage }) => {
  const queryClient = useQueryClient()
  const titleRef = useRef()
  const bodyRef = useRef()
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      queryClient.setQueriesData(["posts", data.id], data)
      queryClient.invalidateQueries(["posts"], { exact: true })
      setCurrentPage(<Post id={data.id} />)
    },
  })
  function handleSubmit(e) {
    e.preventDefault()
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    })
  }

  return (
    <>
      {createPostMutation.isError &&
        JSON.stringify(JSON.stringify(createPostMutation.error))}
      <div>
        <h1>create post</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor=''>Title</label>
            <input type='text' ref={titleRef} />
          </div>
          <div>
            <label htmlFor=''>Body</label>
            <input type='text' ref={bodyRef} />
          </div>
          <button type='submit'>
            {createPostMutation.isLoading ? "loading ..." : "create"}
          </button>
        </form>
      </div>
    </>
  )
}

export default CreatePost
