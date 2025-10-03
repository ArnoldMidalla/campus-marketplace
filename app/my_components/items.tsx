import Image from "next/image";
export default function Items({img, name, price}:{img:string, name:string, price:string}) {
  return (
    <div>
        <div className="relative h-20 w-20">

        <Image src={img} alt="" fill />
        </div>
        <h1>title is {name}</h1>
        <p>price is {price}</p>

    </div>
  )
}