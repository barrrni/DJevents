import { API_URL } from '@/config/index'

export default async (req, res) => {

    if (req.method === 'POST') {
        const { identifier, password } = req.body

        const strapiRes = await fetch(`${API_URL}/auth/local`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                identifier,
                password
            })
        })

        const data = await strapiRes.json()

        if (strapiRes.ok) {
            res.status(200).json({ user: data.user })
        } else {
            res.status(data.statusCode).json({ msg: data.message[0].messages[0].message })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ msg: `Method ${req.method} not allowed` })
    }
}