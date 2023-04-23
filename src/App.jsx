import {
  useQuery,
  useMutation,
  isError,
  useQueryClient,
} from "@tanstack/react-query"

import "./App.css"
import { useState } from "react"
import PostList1 from "./postList1"
import PostList2 from "./postList2"
import { getPost } from "./api/posts"
import Post from "./Post"
import CreatePost from "./CreatePost"
import PostListPaginated from "./PostListPaginated"
//

function App() {
  const [currentPage, setCurrentPage] = useState(<PostList1 />)

  // const postsQuery = useQuery({
  //   queryKey: ["posts", 1],
  //   queryFn: () => getPost(1),
  // })

  // postsQuery.fetchStatus === "fetching"
  // const newPostMutation = useMutation({
  //   mutationFn: (title) =>
  //     wait(1000).then(() => POSTS.push({ id: crypto.randomUUID, title })),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["posts"])
  //   },
  // })
  // if (postsQuery.isLoading) return <h1>loading....</h1>
  // if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>
  return (
    <>
      <button onClick={() => setCurrentPage(<PostList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostList2 />)}>
        Posts List 2
      </button>
      <button onClick={() => setCurrentPage(<Post id={1} />)}>Post</button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }>
        New post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Paginated
      </button>
      {currentPage}
    </>
  )
}

export default App
