import * as React from 'react'
// import { NotionAPI } from 'notion-client'
const getComments = (pageId,callback) => {
  const myHeaders = new Headers();
  myHeaders.append("Notion-Version", "2022-06-28");
  myHeaders.append("Authorization", "Bearer secret_Vg1DrMbsXceXEZ4d8bVhyqnAQd95DHach7LOrtRGCke");

  const raw = JSON.stringify({"filter":{"property":"page_id","rich_text":{"equals":`${pageId}`}}});;

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  fetch("http://localhost:3000/juny-blog/api/comments", requestOptions)
  .then(response => response.text())
  .then((result) => {
    const notionData = JSON.parse(result).results
    callback(notionData)

  })
  .catch(error => console.log('error', error));
}
export const Comments: React.FC = () => {

  const CommentTitle = "Comments"
  const [text,setText] = React.useState("")
  const [data,setData] = React.useState([])

  React.useEffect(()=>{
    if(data.length === 0){
      console.log("this",this)
      getComments('123',(notionData) => {
        setData(notionData)
      })
    }
  },[])

  const onPost = () => {
    console.log("text",text)
    if(text !== ""){
      data.push({
        created_time : new Date().toISOString(),
        properties : {
          comment : {
            title : [{
              text : {
                content : text
              }
            }]
          }
        }
      })
      setData(data)
      setText("")
    }

    // console.log(notion)
    // new NotionAPI()
  }
  const onComment = (e) => {
    setText(e.target.value)
  }
  console.log(data)
  return (
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
        value={text}
        onChange={onComment}
      />

      <button onClick={onPost}>post</button>
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
              id={commentData.created_time+'-'+index}
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
                {commentData?.properties?.comment?.title[0]?.text?.content}
              </span>
              <br />
              <div style={{textAlign: 'right'}}>
              {commentData.created_time}
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
  )
}
