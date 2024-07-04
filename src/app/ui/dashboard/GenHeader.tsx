import Link from 'next/link'
export default function GenHeader () {
    return (
        <header className=' flex justify-center items-center mb-4 py-3'>
        <h1 className="text-2xl">
          <Link href="/">TaskLister</Link>
        </h1>
      </header>
    )
}