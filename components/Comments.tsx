import * as React from 'react'
import * as types from '@/lib/types'
import { api } from '@/lib/config'
import { LoadingIcon } from './LoadingIcon'

export const Comments: React.FC<types.Comments> = ({pageId}) => {

  const CommentTitle = "Comments"
  const [text,setText] = React.useState("")
  const [data,setData] = React.useState([])
  const [isLoaded,setIsLoaded] = React.useState(true)

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

  const onPost = () => {
    console.log("text",text)
    if(text !== "" && isLoaded){
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
        setText("")
        setIsLoaded(true)
      })
      .catch(error => {
        setIsLoaded(true)
        console.log('errror',error)
      })

    }

    // console.log(notion)
    // new NotionAPI()
  }
  const onComment = (e) => {
    setText(e.target.value)
  }
  console.log(data)
  return (
    <>

    <div style={{
      width : "50%",
      textAlign : "center",
      // maxHeight: "30px",
      height : "auto"
    }}>
      {/* <hr style={{
        width : "100%"
      }}/> */}
      {data.length} {CommentTitle}
      <br/>
      <input
        style={{
          width:"45%",
          borderRadius: "3%",
          resize: "none",
          borderWidth: "medium",
          borderColor: "gray",
        }}
        disabled={!isLoaded}
        value={text}
        onChange={onComment}
      />

      <button disabled={!isLoaded}  onClick={onPost}>{isLoaded ? "post" : <LoadingIcon/>}</button>)
      <br/>
      <div style={{
        width : "100%",
        height : 'auto',
        backgroundColor : "#eff6fe",
        maxHeight : "500px",
        overflow : "scroll",
        textAlign : "left",
      }}>
        <br/>
        {data.map((commentData,index) => {
          return (
            <>
            <div
              id={commentData?.created_time+'-'+index}
              style={{
                width: "97%",
                height: "60px",
                // borderLeft : 1,
                // borderRight : 1,
                // borderWidth: '1px',
                // borderStyle: "solid",
                backgroundColor : index%2 === 0 ? 'white' : '#d4cfcf',
                marginLeft : 5
              }}
              >
              <span style={{marginLeft : 10}}>
                { commentData?.properties?.comment?.title[0]?.text?.content}
              </span>
              <br />
              <div style={{textAlign: 'right'}}>
              {commentData?.created_time}
              </div>
            </div>
            </>
          )
        })}
       <br/>

      </div>
      {/* <button style={{
        // width:"45%",
        borderRadius: "3%",
        // maxHeight: "50px",
        // height: "90%",
        resize: "none",
        borderWidth: "medium",
        borderColor: "gray"
      }}>submit</button> */}
      {/* <button>send</button> */}
    </div>
    </>
  )
}
