import * as React from 'react'
import * as types from '@/lib/types'
import { api } from '@/lib/config'
import {FaPaperPlane} from '@react-icons/all-files/fa/FaPaperPlane'
import { LoadingIcon } from './LoadingIcon'
import {BaseReply, BasicComment} from 'react-simple-comment'


export const Comments: React.FC<types.Comments> = ({pageId}) => {

  const CommentTitle = "Comments"
  const [data,setData] = React.useState([])
  const [isLoaded,setIsLoaded] = React.useState(true)
  const [commentDom, setCommentDom] = React.useState(1)

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const getUrl = `${api.comments}?pageId=${pageId}`
  React.useEffect(()=>{

      console.log("this",this)


      fetch(getUrl, {
        method: 'GET'
      })
      .then(response => response.text())
      .then(result => {
        console.log(result)
        setData(JSON.parse(result).results)
      })
      .catch(error => {
        console.log(error)
      })

  },[getUrl])

  const onPost = (text:string) => {

      if(text !== '' && isLoaded){
        setIsLoaded(false)

        // myHeaders.append("Notion-Version", "2022-06-28");
        // myHeaders.append("Authorization", "Bearer secret_Vg1DrMbsXceXEZ4d8bVhyqnAQd95DHach7LOrtRGCke");





        fetch(`${api.comments}`, {
          method: 'POST',
          headers: myHeaders,
          body : JSON.stringify({
            "pageId" : pageId,
            "text" : text
          })
        })
        .then(response => response.text())
        .then(result => {
          data.unshift(JSON.parse(result))
          setData(data)
          // setText("")
          setIsLoaded(true)
          setCommentDom(commentDom+1)
        })
        .catch(error => {
          setIsLoaded(true)
          console.log('errror',error)
        })

      // }

      // console.log(notion)
      // new NotionAPI()
      }
  }


  return (
    <div
      style={{width:"90%"}}
    >
      <div style={{marginBottom: 1}}>댓글 {data.length}개</div>
      <br />
      <BasicComment
        key={commentDom}
        placeholder="댓글을 입력해주세요..."
        onSend={onPost}
      />
      <div>
        {data.map((comment:any) => {
          console.log(comment)
          return <BaseReply
            key={comment.id}
            name = "익명"
            text = { comment?.properties?.comment?.title[0]?.text?.content}
            date = {new Date(comment.created_time)}
            likeCount = {comment?.properties?.like_count?.number}
            dislikeCount = {comment?.properties?.dislike_count?.number}
          />
        })}
      </div>
    </div>

  )
}
