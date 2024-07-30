import Image from "next/image"
export default function Header(){
    return(
        <header className="pl-4 pr-4 pt-2 pb-2">
            <nav>
                <Image src="/images/nodemailer.webp" width={100} height={100} alt="Nodemailer"></Image>
            </nav>
        </header>
    )
}