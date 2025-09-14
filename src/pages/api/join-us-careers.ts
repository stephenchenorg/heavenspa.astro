import type { APIRoute } from 'astro'
import { gql, graphQLAPI, GraphQLValidationError } from '@/api'

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json()
    const { name, phone, email, height, weight, social, birthday, address } = body

    // 驗證必填欄位
    const errors: Record<string, string[]> = {}

    if (!name || typeof name !== 'string') errors.name = ['中文姓名 是必填']
    if (!phone || typeof phone !== 'string') errors.phone = ['行動電話 是必填']
    if (!email || typeof email !== 'string') errors.email = ['電子信箱 是必填']
    if (!height || Number.isNaN(Number.parseInt(height))) errors.height = ['身高 是必填且必須是數字']
    if (!weight || Number.isNaN(Number.parseInt(weight))) errors.weight = ['體重 是必填且必須是數字']
    if (!social || typeof social !== 'string') errors.social = ['FB/IG 帳號 是必填']
    if (!birthday || typeof birthday !== 'string') errors.birthday = ['出生年月日 是必填']
    if (!address || typeof address !== 'string') errors.address = ['居住地址 是必填']

    if (Object.keys(errors).length) {
      return new Response(JSON.stringify({ errors }), {
        status: 422,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    // 原始的 GraphQL API 呼叫 (暫時註解)
    const result = await graphQLAPI(gql`
      mutation (
        $name: String!
        $phone: String!
        $email: String!
        $height: Int!
        $weight: Int!
        $social: String!
        $birthday: String!
        $address: String!
      ){
        createResume(
          input: {
            name: $name
            phone: $phone
            email: $email
            height: $height
            weight: $weight
            social: $social
            birthday: $birthday
            address: $address
          }
        ) {
          id
        }
      }
      
    `, {
      variables: {
        name,
        phone,
        email,
        height: Number.parseInt(height),
        weight: Number.parseInt(weight),
        social,
        birthday,
        address,
      },
    })

    return new Response(JSON.stringify({
      success: true,
      data: result,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (e) {
    if (e instanceof GraphQLValidationError) {
      return new Response(JSON.stringify({
        errors: e.errors,
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    return new Response(JSON.stringify({
      errors: [{ message: e instanceof Error ? e.message : '伺服器發生錯誤，請稍後再試' }],
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
