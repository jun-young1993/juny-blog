import * as React from 'react'
import * as types from '@/lib/types'
import { api } from '@/lib/config'
// import { LoadingIcon } from './LoadingIcon'
import {FaPaperPlane} from '@react-icons/all-files/fa/FaPaperPlane'
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
  console.log('isLoaded',isLoaded)
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
      {data?.length} {CommentTitle}
      <br/>
      <div
        style={{
          width:"100%",
          display: "flex",
          textAlign:"left",
          margin:"0 auto"
        }}
      >
        <div style={{flex:0.5}}></div>
        <input
          style={{
            flex:8,
            borderRadius: "3%",
            resize: "none",
            borderWidth: "medium",
            borderColor: "gray",
          }}
          disabled={!isLoaded}
          value={text}
          onChange={onComment}
        />
        <div style={{flex:0.5}}></div>
        <div
          style={{
            flex:1
          }}
        >
          <a
            href='#'
            role='button'
            onClick={onPost}
            title='send message'
          >
            {isLoaded ? <FaPaperPlane/> : <LoadingIcon />}
          </a>
        </div>
      </div>
      <br/>

      <div style={{
        width : "100%",
        height : 'auto',
        // backgroundColor : "#eff6fe",
        backgroundImage : "linear-gradient(-225deg, #8bccf7 10%, #6DD5FA 20%, #FFFFFF 100%)",
        maxHeight : "500px",
        overflow : "scroll",
        textAlign : "left",
      }}>
        {/* <br/> */}
        {data.length === 0 ? <span>해당 게시글에 등록된 댓글이 없습니다.</span> : <></>}
        {data.map((commentData,index) => {
          const objectDate:Date = new Date(commentData?.created_time || new Date())
          const createdDate = `${objectDate.getFullYear()}/${objectDate.getMonth()+1}/${objectDate.getDate()} ${objectDate.getHours()}:${objectDate.getMinutes()}`
          return (
            <div
              id={commentData?.created_time+'-'+index}
              key={commentData?.created_time+'-'+index}
            >
              <div
                style={{
                  marginLeft:5,
                  marginRight:5,
                  marginBottom:5,
                  marginTop : 5,
                  height: "60px",
                  borderRadius: "2px",
                  background:index%2 === 0 ? 'linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)' : 'linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)',
                  transform : "translate3d(0px, 20px, 0) scale(0.95)",
                  opacity: "var(0.7)",
                  transition: "opacity 0.3s",
                  // backgroundImage : index%2 === 0 ? 'linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)' : 'linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)',
                }}
                >
                <span style={{marginLeft : 10}}>
                  { commentData?.properties?.comment?.title[0]?.text?.content}
                </span>
                <br />

                <div style={{textAlign: 'right', fontSize:"small", marginRight:10}}>
                  {createdDate}
                </div>
              </div>
            </div>
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
