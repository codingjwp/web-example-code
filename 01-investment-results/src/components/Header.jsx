export default function Header({title, path}) {
  return (
    <header id="header" className="center">
      <img src={path} alt={title} />
      <h1>{title}</h1>
    </header>
  )
}