import Image from "next/image"

const FounderBio = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-xl">
      <div className="flex flex-col items-center">
        <Image
          src="/images/founder-headshot.jpeg"
          alt="Kyle Johnson, Founder of Structured Partners"
          width={500}
          height={600}
          className="rounded-lg shadow-md"
        />
        <h2 className="text-2xl font-semibold mt-4">Kyle Johnson</h2>
        <p className="text-gray-600 mt-2 text-center">Founder & CEO, Structured Partners</p>
        <p className="mt-4 text-gray-700 text-justify">
          Kyle is a seasoned entrepreneur with over 15 years of experience in building and scaling successful
          businesses. He is passionate about helping companies achieve their full potential through strategic planning,
          operational excellence, and innovative solutions.
        </p>
      </div>
    </div>
  )
}

export default FounderBio
