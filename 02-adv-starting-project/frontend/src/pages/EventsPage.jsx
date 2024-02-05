import { Link } from "react-router-dom"


const DUMMY_DETAIL_LINK = [
  { path: "d1", label: '디데일 1번 페이지' },
  { path: "d2", label: '디데일 2번 페이지' },
  { path: "d3", label: '디데일 3번 페이지' },
]

export default function EventsPage() {
  return (
    <div>
      EventsPage
      <ul>
        {DUMMY_DETAIL_LINK.map((link) => <li key={link.path}><Link to={link.path}>{link.label}</Link></li>)}
      </ul>
    </div>
  )
}