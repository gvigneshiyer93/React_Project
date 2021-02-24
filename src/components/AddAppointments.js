import React, { useState } from "react";
import { FaPlus } from 'react-icons/fa';

function AddAppointments({formDisplay, toggleForm, addAppointment}) {

    const [petName, setpetName] = useState();
    const [ownerName, setownerName] = useState();
    const [aptDate, setaptDate] = useState();
    const [aptTime, setaptTime] = useState();
    const [aptNotes, setaptNotes] = useState();
    
    const handleAdd = ((e) => {
        e.preventDefault();
        let tempApt = {
            petName : petName,
            ownerName : ownerName,
            aptDate : aptDate + ' ' + aptTime,
            aptNotes: aptNotes
        }
        addAppointment(tempApt);
        setpetName("");
        setownerName("");
        setaptDate("");
        setaptTime("");
        setaptNotes("");
        toggleForm();
    });

return(
    <div className= {
        "card textcenter mt-3 " +
        (formDisplay ? '' : 'add-appointment')
    }>
          <div className="apt-addheading card-header bg-primary text-white"
          onClick = {toggleForm}>
           <FaPlus /> Add Appointment
          </div>

          <div className="card-body">
            <form id="aptForm" noValidate
            onSubmit = {handleAdd}>
              <div className="form-group form-row">
                <label
                  className="col-md-2 col-form-label text-md-right"
                  htmlFor="petName"
                  readOnly
                >
                  Pet Name
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    name="petName"
                    placeholder="Pet's Name"
                    value = {petName}
                    onChange = {e => setpetName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group form-row">
                <label
                  className="col-md-2 col-form-label text-md-right"
                  htmlFor="ownerName"
                >
                  Pet Owner
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    name="ownerName"
                    placeholder="Owner's Name"
                    value = {ownerName}
                    onChange = {e => setownerName(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group form-row">
                <label
                  className="col-md-2 col-form-label text-md-right"
                  htmlFor="aptDate"
                >
                  Date
                </label>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    name="aptDate"
                    id="aptDate"
                    value = {aptDate}
                    onChange = {e => setaptDate(e.target.value)}
                  />
                </div>
                <label
                  className="col-md-2 col-form-label text-md-right"
                  htmlFor="aptTime"
                >
                  Time
                </label>
                <div className="col-md-4">
                  <input
                    type="time"
                    className="form-control"
                    name="aptTime"
                    id="aptTime"
                    value = {aptTime}
                    onChange = {e => setaptTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group form-row">
                <label className="col-md-2 text-md-right" htmlFor="aptNotes">
                  Apt. Notes
                </label>
                <div className="col-md-10">
                  <textarea
                    className="form-control"
                    rows="4"
                    cols="50"
                    name="aptNotes"
                    id="aptNotes"
                    placeholder="Appointment Notes"
                    value = {aptNotes}
                    onChange = {e => setaptNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group form-row mb-0">
                <div className="offset-md-2 col-md-10">
                  <button
                    type="submit"
                    className="btn btn-primary d-block ml-auto"
                  >
                    Add Appointment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
);
}

export default AddAppointments;