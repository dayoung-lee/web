/*********************************************************************************
*  WEB422 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Dayoung Lee     Student ID: 121693162      Date: 10/12/2018
*
*
********************************************************************************/ 

let employeesModel; 

var viewModel = {
    teams: ko.observable([]),
    employees: ko.observable([]),
    projects: ko.observable([])    
};

function showGenericModal(title, message)
{
    $(".modal-title").html(title);
    $(".modal-body").html(message);
    $("#genericModal").modal();
}

function initializeTeams()
{
    return new Promise( function(resolve, reject) {
        $.ajax({
            url: "https://sheltered-plains-11382.herokuapp.com/teams-raw",
            method: "GET",
            contentType: "application/json"
        })
        .done(function(data) {          
            viewModel.teams = ko.mapping.fromJS(data);         
            resolve();
        })
        .fail(function(err){                   
            reject("Error loading the team data.");
        });
    });
}

function initializeEmployees()
{
    return new Promise( function(resolve, reject) {
        $.ajax({
            url: "https://sheltered-plains-11382.herokuapp.com/employees",
            method: "GET",
            contentType: "application/json"
        })
        .done(function(data) { 
            viewModel.employees = ko.mapping.fromJS(data);           
            resolve();
        })
        .fail(function(err){               
            reject("Error loading the team data.");
        });
    });
}

function initializeProjects()
{
    return new Promise( function(resolve, reject) {
    $.ajax({
            url: "https://sheltered-plains-11382.herokuapp.com/projects",
            method: "GET",
            contentType: "application/json"
        })
        .done(function(data) {
            // Assign the results to the "viewModel" variable  
            viewModel.projects = ko.mapping.fromJS(data);
            resolve();
        })
        .fail(function(err){
            reject("Error loading the team data.");
        });
    });
}
function saveTeam()
{
    let currentTeam = this;
    $.ajax({
        url: "https://sheltered-plains-11382.herokuapp.com/team/" + currentTeam._id(),
        type: "PUT",
        data: JSON.stringify ( // create an object literal
            {
                "Projects": currentTeam.Projects(), 
                "Employees": currentTeam.Employees(), 
                "TeamLead": currentTeam.TeamLead() 
            }
        ),
        contentType: "application/json"
    })
    .done(function (data) {
        showGenericModal("Success", "[" 
        + currentTeam.TeamName() 
        + "] Updated Successfully");
    })
    .fail(function (err) {
        showGenericModal("Error", "Error updating the team information.");
    });
}


$( document ).ready(function() {
    initializeTeams()
    .then(initializeEmployees)
    .then(initializeProjects)
    .then(function() {
        ko.applyBindings(viewModel);
        $("select.multiple").multipleSelect({ filter: true });         
        $("select.single").multipleSelect({ single: true, filter: true });
    })
    .catch(function(err) {
        showGenericModal('Error', err);
    });
});

