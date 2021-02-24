import React, { useEffect, useState } from "react";
import '../css/App.css';
import AddAppointments from './AddAppointments';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

import { without, findIndex } from 'lodash';
function App() {

  const [myAppointments, setmyAppointments] = useState([]);
  const [formDisplay, setformDisplay] = useState(false);
  const [orderBy, setorderBy] = useState('petName');
  const [orderDir, setorderDir] = useState('asc');
  const [queryText, setqueryText] = useState('');
  const [lastIndex, setlastIndex] = useState();

  useEffect(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const apts = result.map((item, key) => {
          item.aptId = key;
          setlastIndex(key);
          return item;
        });
        setmyAppointments(apts);
      });
  }, []);



  const deleteAppointment = ((apt) => {
    let tempApts = myAppointments;
    tempApts = without(tempApts, apt);

    setmyAppointments(tempApts);

  });

  const toggleForm = (() => {
    setformDisplay(!formDisplay);
  });

  const addAppointment = ((apt) => {
    let tempApts = myAppointments;
    apt.aptId = lastIndex + 1;
    tempApts.unshift(apt);
    setmyAppointments(tempApts);
    setlastIndex(lastIndex + 1);
  });

  let order;
  let filteredApts = myAppointments;
  if (orderDir === 'asc') {
    order = 1;
  } else {
    order = -1;
  }

  filteredApts = filteredApts.sort((a, b) => {
    if (a[orderBy].toLowerCase() <
      b[orderBy].toLowerCase()) {
      return -1 * order
    } else {
      return 1 * order
    }
  }).filter(eachItem => {
    return (
      eachItem['petName']
        .toLowerCase()
        .includes(queryText.toLowerCase()) ||
      eachItem['ownerName']
        .toLowerCase()
        .includes(queryText.toLowerCase()) ||
      eachItem['aptNotes']
        .toLowerCase()
        .includes(queryText.toLowerCase())
    );
  });

  const changeOrder = ((order, dir) => {
    setorderBy(order);
    setorderDir(dir);
  });

  const searchApts = ((query) => {
    setqueryText(query);
  })

  const updateInfo = ((name, value, id) => {
    let tempApts = myAppointments;
    let aptIndex = findIndex(myAppointments, {
      aptId: id
    });
    tempApts[aptIndex][name] = value;
    setmyAppointments(tempApts);

  });
  return (
    <main className="page bg-white" id="petratings">
      <div className="container">
        <div className="row">
          <div className="col-md-12 bg-white">
            <div className="container">
              <AddAppointments
                formDisplay={formDisplay}
                toggleForm={toggleForm}
                addAppointment={addAppointment} />
              <SearchAppointments orderBy={orderBy}
                orderDir={orderDir}
                changeOrder={changeOrder}
                searchApts={searchApts} />
              <ListAppointments appointments={filteredApts}
                deleteAppointment={deleteAppointment}
                updateInfo={updateInfo} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
