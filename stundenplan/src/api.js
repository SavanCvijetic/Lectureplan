const occupationAPI = 'http://sandbox.gibm.ch/berufe.php';
const classAPI = 'http://sandbox.gibm.ch/klassen.php?beruf_id=';
const timeTableAPI = 'http://sandboxx.gibm.ch/tafel.php?klasse_id=';

export async function occupation()
{
    return fetch(occupationAPI)
        .then( response => response.json() )
        .then(result => { console.log('Success: ', result); })
        .catch(error => { console.error('Error: ', error);  });
}

export async function classes(id)
{
    return fetch(classAPI + { id })
        .then( response => response.json() )
        .then(result => { console.log('Success: ', result); })
        .catch(error => { console.error('Error: ', error);  });
}

export async function timeTable(id, calenderWeek)
{
    return fetch(timeTableAPI + id +'&woche=' + calenderWeek)
        .then( response => response.json() )
        .then(result => { console.log('Success: ', result); })
        .catch(error => { console.error('Error: ', error);  });
}

export default
{
    occupation,
    classes,
    timeTable
}