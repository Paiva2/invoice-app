/* import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

require("dotenv").config()

const cloudinary = require("cloudinary").v2

interface RequestInvoiceBody {
  file: any //fix
}

export async function PATCH(req: NextRequest) {
  const res = (await req.json()) as RequestInvoiceBody

  cloudinary.uploader
    .upload(res.file, {
      resource_type: "image",
    })
    .then((result) => {
      console.log("sucess", JSON.stringify(result))

      return new NextResponse(
        JSON.stringify({
          message: "Profile edited successfully!",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    })
    .catch((err) => {
      console.log(err, JSON.stringify(err))
    })
}
 */
