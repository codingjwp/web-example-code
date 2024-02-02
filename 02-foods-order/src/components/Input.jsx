export default function Input({ label, id, ...props }) {
  return (
    <p className="my-2 mx-0 flex flex-col">
      <label htmlFor={id} className="font-bold mb-2">{label}</label>
      <input id={id} name={id} className="w-full max-w-80 p-2 rounded border-w-1 border-[#ccc]" required {...props} />
    </p>
  )
}