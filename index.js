function createEmployeeRecord(employee) {
    let employeeRecord = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeRecord;
};

function createEmployeeRecords(employees) {
    return employees.map(function(e) {
        return createEmployeeRecord(e);
    });
};

function createTimeInEvent(employeeRecord, timeInStamp) {
    const date = timeInStamp.split(' ')[0];
    const hour = parseInt(timeInStamp.split(' ')[1]);

    const timeInEvent = {type: "TimeIn", date: date, hour: hour};

    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
};

function createTimeOutEvent(employeeRecord, timeOutStamp) {
    const date = timeOutStamp.split(' ')[0];
    const hour = parseInt(timeOutStamp.split(' ')[1]);

    const timeOutEvent = {type: "TimeOut", date: date, hour: hour};

    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
};

function hoursWorkedOnDate(employeeRecord, date) {
    const findDate = function(e) {
        return e.date === date;
    };
    const timeIn = employeeRecord.timeInEvents.find(e => findDate(e)).hour;
    const timeOut = employeeRecord.timeOutEvents.find(e => findDate(e)).hour;

    const hoursWorked = function(timeIn, timeOut) {
        return (timeOut - timeIn) / 100;
    };
    return hoursWorked(timeIn, timeOut);
};

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return (hoursWorked * employeeRecord.payPerHour);
};

function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(function(event) {
        return event.date;
    });
    return dates.reduce(function(total, date) {
        return wagesEarnedOnDate(employeeRecord, date) + total;
    }, 0);
};

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(total, employeeRecord) {
        return allWagesFor(employeeRecord) + total;
    }, 0);
};

function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find(function(employee) {
        return employee.firstName === firstName;
    });
};