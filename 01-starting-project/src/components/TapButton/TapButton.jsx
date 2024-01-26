export default function TapButton({onSelect, children, isSelected}) {
  return(
    <li>
      <button className={isSelected ? 'active' : undefined} onClick={onSelect}>
        {children}
      </button>
    </li>
  )
}