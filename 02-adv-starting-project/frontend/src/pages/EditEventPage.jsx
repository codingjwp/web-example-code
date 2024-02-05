import { useParams } from "react-router-dom";

export default function EditEventPage() {
  const param = useParams();
  const id = param?.detailId || 'null id';
  return <div>EditEventPage {id}</div>
}