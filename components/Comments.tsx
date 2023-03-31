import * as React from 'react'
// import { NotionAPI } from 'notion-client'
export const Comments: React.FC = () => {
  const CommentCount = 0
  const CommentTitle = "Comments"
  const [text,setText] = React.useState("")
  const [data,setData] = React.useState([
    {
    message : "good입니다"
  },{
    message : "good입니다2"
  },{
    message : "good입니다3"
  }
  ])
  const onPost = () => {
    // console.log(notion)
    // new NotionAPI()
  }
  const onComment = (e) => {
    setText(e.target.value)
  }
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
      {CommentCount} {CommentTitle}
      <br/>
      <input
        style={{
          width:"45%",
          borderRadius: "3%",
          resize: "none",
          borderWidth: "medium",
          borderColor: "gray",
        }}
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
            <div style={{
              width: "97%",
              height: "30px",
              // borderLeft : 1,
              // borderRight : 1,
              // borderWidth: '1px',
              // borderStyle: "solid",
              backgroundColor : index%2 === 0 ? 'white' : '#d4cfcf',
              marginLeft : 5
            }}>
              <span style={{marginLeft : 10}}>
                {commentData.message}
              </span>
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
