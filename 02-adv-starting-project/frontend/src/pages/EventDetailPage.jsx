import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EventDetailPage() {
  const param = useParams();
  const id = param?.detailId || 'null id';
  const navigation = useNavigate();

  const handleLinkEdit = () => {
    navigation('edit');
  }

  return (
    <div>EventDetailPage {id}
      <button type="button" onClick={handleLinkEdit}>수정</button>
    </div>
  );
}