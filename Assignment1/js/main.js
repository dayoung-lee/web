/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Dayoung Lee      Student ID: 121693162 Date: 14-Sep-2018
*
*
********************************************************************************/ 


$( document ).ready(function() {
    console.log("jQuery working");

    $(".dropdown-menu").on("click", "#teams-menu", function(event){
       
        event.preventDefault();
              
      
        $.ajax({
            url: "https://sheltered-plains-11382.herokuapp.com/teams" ,
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data){
            $("#data").empty();
            $("#data").html("<h3>Teams</h3>");
            $("#data").append(JSON.stringify(data));
        })
        .fail(function(err){
            console.log("error: " + err.statusTest);
        });
    });

    $(".dropdown-menu").on("click", "#employees-menu", function(event){
        
        event.preventDefault();
              
        
        $.ajax({
            url: "https://sheltered-plains-11382.herokuapp.com/employees" ,
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data){
            $("#data").empty();
            $("#data").html("<h3>Employees</h3>");
            $("#data").append(JSON.stringify(data));
        })
        .fail(function(err){
            console.log("error: " + err.statusTest);
        });
    });

    $(".dropdown-menu").on("click", "#projects-menu", function(event){
        
        event.preventDefault();
              
        
        $.ajax({
            url: "https://sheltered-plains-11382.herokuapp.com/projects" ,
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data){
            $("#data").empty();
            $("#data").html("<h3>Projects</h3>");
            $("#data").append(JSON.stringify(data));
        })
        .fail(function(err){
            console.log("error: " + err.statusTest);
        });
    });

    $(".dropdown-menu").on("click", "#positions-menu", function(event){
     
        event.preventDefault();
           
     
        $.ajax({
            url: "https://sheltered-plains-11382.herokuapp.com/positions" ,
            type: "GET",
            contentType: "application/json"
        })
        .done(function (data){
            $("#data").empty();
            $("#data").html("<h3>Positions</h3>");
            $("#data").append(JSON.stringify(data));
        })
        .fail(function(err){
            console.log("error: " + err.statusTest);
        });
    });
  });


