import * as React from 'react'
import * as types from '@/lib/types'
import { api, apiHost } from '@/lib/config'
// import { getSiteConfig } from '@/lib/get-config-value'
import { LoadingIcon } from './LoadingIcon'

// import { NotionAPI } from 'notion-client'
// const getComments = (pageId,callback) => {
//   const requestOptions = {
//     method: 'GET',
//     body: JSON.stringify({"pageId":pageId}),
//     redirect: 'follow'
//   }
//   fetch("http://localhost:3000/juny-blog/api/comments", requestOptions)
//   .then(response => response.text())
//   .then((result) => {
//     const notionData = JSON.parse(result).results
//     callback(notionData)

//   })
//   .catch(error => console.log('error', error));
// }
// const setComments = (pageId, comment, callback) => {
//   var myHeaders = new Headers();
//   myHeaders.append("Notion-Version", "2022-06-28");
//   myHeaders.append("Authorization", "Bearer secret_Vg1DrMbsXceXEZ4d8bVhyqnAQd95DHach7LOrtRGCke");
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Cookie", "__cf_bm=LzmLOAd25tEmjMU4I.0_JXJIHLLFnPbRhFQ50y.eh_M-1680582613-0-AQBF71UoW22P36n2m62xeaIaY+EtE0G3MxSbSUBDdETStgkI9vPALqFETrYz1Q5R46MVTBc7oP/auvIQ8XNZdkw=");

//   var raw = JSON.stringify({"parent":{"database_id":"30f97a21634b44268078efc8c32682b7"},"properties":{"page_id":{"rich_text":[{"text":{"content":"123"}}]},"comment":{"title":[{"text":{"content":"insert"}}]}}});

//   var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };

//   fetch("https://api.notion.com/v1/pages/", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));
// }
export const Comments: React.FC<types.Comments> = ({pageId}) => {

  const CommentTitle = "Comments"
  const [text,setText] = React.useState("")
  const [data,setData] = React.useState([])
  const [isLoaded,setIsLoaded] = React.useState(true)

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  React.useEffect(()=>{
    if(data.length === 0){
      console.log("this",this)


      fetch(`${apiHost}${api.comments}?pageId=${pageId}`, {
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
    }
  },[])

  const onPost = () => {
    console.log("text",text)
    if(text !== "" && isLoaded){
      setIsLoaded(false)

      // myHeaders.append("Notion-Version", "2022-06-28");
      // myHeaders.append("Authorization", "Bearer secret_Vg1DrMbsXceXEZ4d8bVhyqnAQd95DHach7LOrtRGCke");





      fetch(`${apiHost}${api.comments}`, {
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
