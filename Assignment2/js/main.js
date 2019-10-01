/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Dayoung Lee     Student ID: 121693162      Date: 9/28/2018
*
*
********************************************************************************/ 

// created new heroku : https://pure-reaches-30800.herokuapp.com/
// but it seems not working


let employeesModel; 

$( document ).ready(function() {
    console.log("jQuery working");    
  
// initiate employeesModeal
    function initializeEmployeesModel(){
        console.log("initializeEmployeesModel() working");
        $.ajax({
            url: "https://sheltered-plains-11382.herokuapp.com/employees",
            method: "GET",
            contentType: "application/json"
        }).done(function(data){
            employeesModel = _.take(data, 300);
            refreshEmployeeRows(employeesModel);
            
        }).fail(function(err){
            console.log("error: " + err.statusText);
            showGenericModal('Error', 'Unable to get Employees');
        });
    }

    function showGenericModal(title, message){
        $(".modal-title").html(title);
        $(".modal-body").html(message);
        $("#genericModal").modal();
    }

    function refreshEmployeeRows(employees){
        let rowTemplate = _.template(
            '<% _.forEach(employees, function(employee) { %>' +
                '<div class="row body-row" data-id=<%- employee._id %>>' + 
                    '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' + 
                    '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' + 
                    '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' + 
                '</div>' +
            '<% }); %>'
        );
      
        let rows = rowTemplate({'employees': employees});
        let employeesTable = $("#employees-table");
        employeesTable.empty();
        employeesTable.append(rows);
    }

    function getFilteredEmployeesModel(filterString){
        let filterData = _.filter(employeesModel, function(employee){
            // convert a string to uppercase letters. not case sensitive
            if(employee.FirstName.toUpperCase().indexOf(filterString.toUpperCase()) != -1 ||
            employee.LastName.toUpperCase().indexOf(filterString.toUpperCase()) != -1 || 
            employee.Position.PositionName.toUpperCase().indexOf(filterString.toUpperCase()) != -1){
                return true;
            }else{
                return false;
            }
        });
        return filterData;
    }

    function getEmployeeModelById(id){
        // search
        let findInd = _.findIndex(employeesModel, function(employee){
            return employee._id === id;
        });
        // deep copy
        if (findInd != -1)
            return _.cloneDeep(employeesModel[findInd]);
        else null;
    }
    
    // fetch the data and populate our employees table
    initializeEmployeesModel();


    $("#employee-search").on("keyup", function(){
        
        //.val(); Get the current value of the first element
        let searchT = $("#employee-search").val();
        refreshEmployeeRows(getFilteredEmployeesModel(searchT));
    });

    $(".bootstrap-header-table").on("click", ".body-row", function(){
        let $empId = $(this).attr("data-id")
        let clickedEmployee = getEmployeeModelById($empId);
        
        // checking
        // console.log($empId);
        // console.log(clickedEmployee.FirstName);

        let hireDateStr = moment(clickedEmployee).format("LL");
        clickedEmployee.HireDate = hireDateStr;

        let modalTemplate = _.template(
            '<b>Address:</b> <%- employee.AddressStreet %> <%- employee.AddressCity %> <%- employee.AddressState %> <%- employee.AddressZip %><br>' +
            '<b>Phone Number:</b> <%-employee.PhoneNum %><br>' + 
            '<b>Hire Date:</b> <%- employee.HireDate %>');

        showGenericModal(
            "<b>" + clickedEmployee.FirstName + " " + clickedEmployee.LastName, 
            modalTemplate({ 'employee':clickedEmployee })
        );          
    })
});

