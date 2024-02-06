import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { fetchEvent, deleteEvent, queryClient } from '../../util/http.js';
import { useQuery, useMutation } from '@tanstack/react-query';

import Header from '../Header.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { useState } from 'react';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const param = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', { id: param.id }],
    queryFn: ({ signal }) => fetchEvent({ id: param.id, signal }),
    staleTime: 5000,
    enabled: param.id !== undefined
  })
  const { mutate, isPending, isError: isMutationError } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none'
      });
      navigate('/events');
    }
  })

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleDeleteDetail() {
    mutate({ id: param.id })
  }

  return (
    <>
      {isDeleting &&
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <div className='form-actions'>
            <button type="button" className='button-text' onClick={handleStopDelete}>Cancel</button>
            <button type="button" className='button' onClick={handleDeleteDetail}>Delete</button>
          </div>
        </Modal>
      }
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {(isLoading || isPending) && <LoadingIndicator />}
      {(isError || isMutationError) && <ErrorBlock title="Filed to load event details" message={error.message || 'Filed to load event details'} />}
      {(!(isLoading || isPending) && data) &&
        <article id="event-details">
          <header>
            <h1>{data.title}</h1>
            <nav>
              <button onClick={handleStartDelete}>Delete</button>
              <Link to="edit">Edit</Link>
            </nav>
          </header>
          <div id="event-details-content">
            <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data.location}</p>
                <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} {data.time}</time>
              </div>
              <p id="event-details-description">{data.description}</p>
            </div>
          </div>
        </article>
      }
    </>
  );
}
