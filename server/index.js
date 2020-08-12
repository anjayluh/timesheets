const express = require('express')
const Joi = require('joi')
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());

const employees = [
    { id: 1, name: 'Angella', role: 'Developer' } //Sample structure
]
const timesheets = [
    { id: 1, empId: 1, date: new Date(), taskName: 'BOU', taskCode: 'UES-1', description: "Initiated project" } //Sample structure
]

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname.slice(0, -6) + 'views/index.html')
})
let currentUser = null;
app.post('/employees', (req, res) => {
    /* const schema = { //Validation rules
        name: Joi.string().alphanum().min(3).required,
    };
    const result = Joi.validate(req.body, schema)
    if (result.error) return req.status(400).send(result.error.details[0].message) */
    currentUser = employees.find((employee) => employee.name.toLowerCase() === req.body.name.toLowerCase());
    const user = currentUser ? currentUser : {
        id: timesheets.length + 1,
        role: 'Developer',
        name: req.body.name,
    };
    timesheets.push(user);
    res.redirect('/timesheets');
});
app.get('/timesheets', (req, res) => {
    // Get logged in user's timesheets
    console.log(currentUser, 'currentUser');
    if (currentUser) {
        const userTimesheets = timesheets.filter((timesheet) => timesheet.empId === parseInt(currentUser.id));
        res.send(userTimesheets.length > 0 ? userTimesheets : 'You curretly have no timesheets yet. Click the button to create one');
    } else res.send('User not found');
})

app.get('/api/timesheets/:id', (req, res) => {
    const course = timesheet.find((timesheet) => timesheet.empId === parseInt(req.params.empId) && timesheet.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The timesheet with the given ID was not found')
    res.send(course);
});

app.post('/api/timesheets', (req, res) => {
    const schema = { //Validation rules
        empId: Joi.string().required,
        date: Joi.date().required,
        taskName: Joi.string().min(3).required,
        taskCode: Joi.string().min(3).required,
        description: Joi.string().min(5).required,
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
    if (!previousTimesheet) return res.status(404).send('The timesheets with the given ID was not found')
        // Validate
    const schema = { //Validation rules
        empId: Joi.string().required,
        taskName: Joi.string().min(3).required,
        taskCode: Joi.string().min(3).required,
        description: Joi.string().min(5).required,
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