import { NextApiRequest, NextApiResponse } from 'next'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const databaseId = "30f97a21634b44268078efc8c32682b7"
    const myHeaders = new Headers()
    myHeaders.append("Notion-Version", "2022-06-28")
    myHeaders.append("Authorization", "Bearer secret_Vg1DrMbsXceXEZ4d8bVhyqnAQd95DHach7LOrtRGCke")
    myHeaders.append("Content-Type","application/json")
    let fetchClient = null
    if (req.method === 'GET') {



      fetchClient = fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({"filter":{"property":"page_id","rich_text":{"equals":`${req.query.pageId}`}}}),
        redirect: 'follow'
      })

    }else if(req.method === 'POST'){
      fetchClient = fetch(`https://api.notion.com/v1/pages`, {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
        body : JSON.stringify({
          "parent":{
              "database_id":databaseId
          },
          "properties":{
            "page_id":{
              "rich_text":[{
                "text":{
                  "content":req.body.pageId
                }
              }]
            },
            "comment":{
              "title":[{
                "text":{
                  "content":req.body.text
                }}]
              }
            }
          })
      })
    }else{
      return res.status(405).send({ error: 'method not allowed' })
    }
    fetchClient.then(response => response.text())
    .then(result => {
      res.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, max-age=3600, stale-while-revalidate=3600'
      )

      res.status(200).json(JSON.parse(result))
    })
    .catch(error => {
      res.status(400).json(error)
    });
    // myHeaders.append("Cookie", "__cf_bm=BLUckkeCSUliYm14356XFQp75zmygxVGLdxZkE20n10-1680248832-0-AZsIPBKsizJOnXa8K2JXQ/ubhW5B4WwUCxAzHZntL8HZPIuZIH9QqwrF4+pPdCJx4fT8iMsujpo9JCds42/9uMM=");




}
