import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getEvent from "app/events/queries/getEvent"
import updateEvent from "app/events/mutations/updateEvent"
import EventForm from "app/events/components/EventForm"

// TODO: migrate EditEvent component to a modal form integrated with events index
// TODO: make corrections from scaffolded pseudo-model to actual prisma schema

export const EditEvent = () => {
  const router = useRouter()
  const eventId = useParam("eventId", "string")
  const [event, { mutate }] = useQuery(getEvent, { where: { id: eventId } })
  const [updateEventMutation] = useMutation(updateEvent)

  return (
    <div>
      <h1>Edit Event {event.id}</h1>
      <pre>{JSON.stringify(event)}</pre>

      <EventForm
        initialValues={event}
        onSubmit={async () => {
          try {
            const updated = await updateEventMutation({
              where: { id: event.id },
              data: { name: "MyNewName" },
            })
            await mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/events/[eventId]", `/events/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating event " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditEventPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditEvent />
      </Suspense>

      <p>
        <Link href="/events">
          <a>Events</a>
        </Link>
      </p>
    </div>
  )
}

EditEventPage.getLayout = (page) => <Layout title={"Edit Event"}>{page}</Layout>

export default EditEventPage
