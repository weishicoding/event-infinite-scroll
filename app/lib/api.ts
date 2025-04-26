export async function fetchEvents(begin: number, end: number) {
  const response = await fetch(
    `https://suiterc.icareus.com/api/events?end=${end}&version=02&organizationId=1404509&action=` +
      `getEvents&includeSubOrganizationEvents=true&order=desc&begin=${begin}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    const data = await response.json();
    const events = data.events || [];
    return {
      events: events,
      // Fetch data, begin from 0, so if events size equals end - begin menas there already has more data.
      hasMoreData: events.length === end - begin,
      eventTotalCount: data.total_events || 0,
    };
  } catch (error) {
    console.log("Faild to fetch events", error);
    return {
      events: [],
      hasMoreData: false,
      eventTotalCount: 0,
    };
  }
}

export async function fetchEventDetails(eventId: string) {
  const response = await fetch(
    `https://suiterc.icareus.com/api/events?version=02&organizationId=1404509&action=getEvent&eventId=${eventId}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    const data = await response.json();
    return {
      event: data.event,
    };
  } catch (error) {
    console.log("Faild to fetch events", error);
    return {
      event: {},
    };
  }
}
