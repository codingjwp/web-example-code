

export default function Error({ title, message }) {

  return (
    <div className="bg-red-200 flex flex-col gap-2 text-[#1d1a16] rounded-md px-2">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-xl">{message}</p>
    </div>
  )
};