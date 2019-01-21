import * as React from 'react';
import CRMEvent from '../interfaces/CRMEvent';
import Calendar from '../interfaces/Calendar';
import EventType from '../interfaces/EventType';
import { Modal, FormControl } from 'react-bootstrap';
import Select from 'react-select';


const EventPropertiesEditor: React.FunctionComponent<{ event: CRMEvent, calendars: Array<Calendar>, eventTypes: Array<EventType>, changeHandler: (event:React.ChangeEvent)=>void, pinnedCalendarChanged: (event: Array<Object>) => void, eventTypeChanged: (event: Array<Object>) => void }> = ({ event, calendars, eventTypes, changeHandler, pinnedCalendarChanged, eventTypeChanged }) => {
  //map the Calendar data type (returned from CRM API) into something that react-select can present as dropdown choices
  var calendarOptions=calendars.map((Pcal:Calendar) => ({value: Pcal.Id,  label: Pcal.Name}) );
  var EventTypeOptions=eventTypes.map((eventType:EventType) => ({value: eventType.Id,  label: eventType.Name}) );
  var initialPinnedCalendarValue=calendars.map((Pcal:Calendar) => {if (event.PinnedCalendars.includes(Pcal.Id) ) { return {value: Pcal.Id,  label: Pcal.Name}} } );
  var initialEventTypeValue= eventTypes.map( (eventType:EventType) => { if (event.Type == eventType.Id) { return { value: eventType.Id, label: eventType.Name } } } );
  return (
    <table className="table modal-table">
      <tbody>
        <tr>
          <td className="LabelColumn">
            Event Type
            </td>
          <td className="TextColumn">
            <Select name="EventType" options={EventTypeOptions} value={initialEventTypeValue} onChange={eventTypeChanged} />
          </td>
        </tr>
        <tr>
         <td className="LabelColumn">
            Event Description
            </td>
          <td className="TextColumn">
            <textarea name="Desc" value={event.Desc} onChange={changeHandler} />
          </td>
        </tr>
        <tr>
          <td className="LabelColumn">
            Date Range
            </td>
          <td className="TextColumn">
            <input name="Start" value={event.Start} onChange={changeHandler} />
            <input name="End" value={event.End} onChange={changeHandler} />
          </td>
        </tr>
        <tr>
          <td className="LabelColumn">
            Pinned Calendars
            </td>
          <td className="TextColumn">
            <Select name="PinnedCalendars" options={calendarOptions} value={initialPinnedCalendarValue} onChange={pinnedCalendarChanged} isMulti="true"  />
            </td>
        </tr>
        <tr>
          <td className="LabelColumn">
            Text
            </td>
          <td className="TextColumn">
            <textarea name="Text" value={event.Text} onChange={changeHandler} />
          </td>
        </tr>
      </tbody>
    </table>
)}


export default EventPropertiesEditor