async function editFormHandler(event){
    event.preventDefault();

    const title = document.querySelector('input[name="task-title"]').value;
    const deadline = document.querySelector('input[name="deadline"]').value;
    const employee_id = document.querySelector('input[name="employee_id"]').value;
    const id=window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];

    //matches the id from the window location address and calls the task api to update a task in the database
    const response = await fetch(`/api/task/${id}`,{
        method: 'PUT',
        body: JSON.stringify({
            title,
            deadline,
            employee_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    //redirects to dashboard if request processes successfully
    if(response.ok)
    {
        document.location.replace('/dashboard');
    }
    else
    {
        alert(response.statusText);
    }

}

document.querySelector('.edit-task-form').addEventListener('submit', editFormHandler);