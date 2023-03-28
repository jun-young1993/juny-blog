import * as React from 'react'

export const Comments: React.FC = () => {
  const CommentCount = 0
  const CommentTitle = "Comments"
  const [text,setText] = React.useState("")
  const onPost = () => {
    alert(text)
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
