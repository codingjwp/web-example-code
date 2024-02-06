import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';

export default function EditEvent() {
  const params = useParams();
  const navigate = useNavigate();
  // const submit = useSubmit();

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newData = data.event;

      await queryClient.cancelQueries({queryKey: ['events', {id : params.id}]});
      const prevData = queryClient.getQueryData(['events', {id: params.id}]);

      queryClient.setQueryData(['events', {id: params.id}], newData);
      return { prevData };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', {id: params.id}], context.prevData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['events', {id: params.id}])
    }
  })

  function handleSubmit(formData) {
    mutate({id: params.id, event: formData});
    navigate('../');
    // submit(formData, {method: 'PUT'});
  }

  function handleClose() {
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>
      <EventForm inputData={null} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    </Modal>
  );
}

export function loader({params}) {
  return queryClient.fetchQuery({
    queryKey: ['events', { id: params.id}],
    queryFn: ({signal}) => fetchEvent({signal, id: params.id})
  })
}

// export async function action({request, params}) {
//   const formData = await request.formData();
//   const updateEventData = Object.fromEntries(formData);
//   await updateEvent({id: params.id, event: updateEventData});
//   await queryClient.invalidateQueries(['events']);
//   return redirect('../');
// }