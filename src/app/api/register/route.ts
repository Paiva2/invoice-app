import { prisma } from "@/lib/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcrypt"

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  if (!req.body?.email) return res.status(404).end("E-mail can't be empty!")

  if (!req.body?.username) return res.status(404).end("User can't be empty!")

  if (!req.body?.password) return res.status(404).end("Password can't be empty!")

  const isEmailAlreadyRegistered = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  })

  if (isEmailAlreadyRegistered) {
    return res.status(409).end("This e-mail is already registered!")
  }

  const saltRounds = 10
  const passwordToHash = req.body.password

  const hashedPassword = bcrypt.hashSync(passwordToHash, saltRounds)

  await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    },
  })

  return res.status(201).end("Register successful!")
}
