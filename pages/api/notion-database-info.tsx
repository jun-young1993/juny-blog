import { NextApiRequest, NextApiResponse } from 'next'


export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).send({ error: 'method not allowed' })
  }
  fetch('https://api.notion.com/v1/databases/30f97a21634b44268078efc8c32682b7/query',{
    method: 'post',
    headers: {
      'Notion-Version': '2022-06-28',
      'Authorization': 'Bearer secret_Vg1DrMbsXceXEZ4d8bVhyqnAQd95DHach7LOrtRGCke',
    }
  }).then((resolve) => {
    resolve.json().then((resolve) => {
      console.log(resolve)
    })
  })

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, max-age=3600, stale-while-revalidate=3600'
  )
  res.status(200).json("success")
}
