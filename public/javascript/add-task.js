async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="task-title"]').value;
    const deadline = document.querySelector('input[name="deadline"]').value;
    // const employee_id = document.querySelector('input[name="employee_id"]').value;
    
    //calls the task api to create a task in the database
    const response = await fetch(`/api/task`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        deadline
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/employee-dashboard');
    } else {

      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-task-form').addEventListener('submit', newFormHandler);