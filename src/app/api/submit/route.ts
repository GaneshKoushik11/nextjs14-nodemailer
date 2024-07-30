// import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from "next/server";
 
export async function POST(req:any,res:any) {
    const Formdata = await req.formData();
    const fullname = Formdata.get('fullname');
    const email = Formdata.get('email');
    //Response 
    return NextResponse.json({ fullname, email})
}