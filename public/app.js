form.onsubmit = async(e) => {

    e.preventDefault();

    try {

        let url = `${window.location.origin}/api/${studentid.value}`;

        let response = await fetch(url, {
            method: 'GET',
            credentials: 'include',
            // body: JSON.stringify(), use only when sending data to server
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        //json-response
        if (response.status == 200) {
            let json = await response.json();
            console.log(JSON.stringify(json));
        } else {
            console.log('something went wrong');
        }

    } catch (err) {
        console.log(err);
    }

};