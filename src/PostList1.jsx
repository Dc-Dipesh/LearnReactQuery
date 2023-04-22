import React from "react"
import { getPosts } from "./api/posts"
import { useQuery } from "@tanstack/react-query"
const PostList1 = () => {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  })
  if (postsQuery.status === "loading") return <h1>Loading ....</h1>
  if (postsQuery.status === "error") {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>
  }
  return (
    <div>
      <h1>post List 1</h1>
      <ol>
        {postsQuery.data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  )
}

export default PostList1
