async function deleteFormHandler(event){
    event.preventDefault();

    const id=window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];

    //calls the task api to delete a task from the database
    const response = await fetch(`/api/task/${id}`,{
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
}

document.querySelector('.delete-task-btn').addEventListener('click', deleteFormHandler);