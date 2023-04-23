import { useQuery } from "@tanstack/react-query"
import React from "react"
import { getPost } from "./api/posts"
import { getUser } from "./api/users"

const Post = ({ id }) => {
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  })

  const userQuery = useQuery({
    queryKey: ["users", postQuery?.data?.userId],
    enabled: postQuery?.data?.userId != null,
    queryFn: () => getUser(postQuery?.data?.userId),
  })

  if (postQuery.status === "loading") return <h1>Loading ....</h1>
  if (postQuery.status === "error") {
    return <h1>{JSON.stringify(postQuery.error)}</h1>
  }
  return (
    <div>
      <h1>
        {postQuery.data.title} <br />
        <small>
          {userQuery.isLoading
            ? "Loading user..."
            : userQuery.isError
            ? "Error Loading user"
            : userQuery.data.name}
        </small>
      </h1>
      <p>{postQuery.data.body}</p>
    </div>
  )
}
export default Post
