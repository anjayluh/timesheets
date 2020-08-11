const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const employees = [
    { id: 1, name: 'Angella Naigaga', role: 'Developer' } //Sample structure
]
const timesheets = [
    { id: 1, empId: 1, date: newDate, taskName: 'BOU', taskCode: 'UES-1', description: "Initiated project" } ////Sample structure
]

app.get('/', (req, res) => {
    // Get logged in user's timesheets
    const userTimesheets = timesheets.filter((timesheet) => timesheet.empId === parseInt(req.params.empId));
    res.send(timesheets);
})

app.get('/api/timesheets/:id', (req, res) => {
    const course = courses.find((timesheet) => timesheet.empId === parseInt(req.params.empId) && timesheet.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The timesheet with the given ID was not found')
    res.send(course);
});

app.post('/api/timesheets', (req, res) => {
    const schema = { //Validation rules
        empId: Join.string().required,
        date: Join.date().required,
        taskName: Join.string().min(3).required,
        taskCode: Join.string().min(3).required,
        description: Join.string().min(5).required,
    };
    const result = Joi.validate(req.body, schema)
    if (result.error) return req.status(400).send(result.error.details[0].message)

    const newTimesheet = {
        id: timesheets.length + 1,
        ...req.body
    };
    timesheets.push(newTimesheet);
    res.send(course);
});
app.put('/api/timesheets/:id', (req, res) => {
    const previousTimesheet = courses.find((course) => timesheet.empId === parseInt(req.params.empId) && timesheet.id === parseInt(req.params.id))
    if (!previousTimesheet) return res.status(404).send('The course with the given ID was not found')
        // Validate
    const schema = { //Validation rules
        empId: Join.string().required,
        taskName: Join.string().min(3).required,
        taskCode: Join.string().min(3).required,
        description: Join.string().min(5).required,
    };
    const result = Joi.validate(req.body, schema)
    if (result.error) return req.status(400).send(result.error.details[0].message)
    res.send(previousTimesheet);
});
// Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
    /* app.post()
    app.put()
    app.delete() */