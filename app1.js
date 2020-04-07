const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const ouyputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employeeArr = [];

const ask = function(){
    inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "What is your name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your id?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "list",
        name: "role",
        message: "What is your role?",
        choices:[
            "Manager",
            "Engineer",
            "Intern"
        ]
    },
    {
        type: "input",
        name: "office",
        message: "What is your office number?",
        when: function(answers){
            return answers.role === "Manager"
        }
    },
    {
        type: "input",
        name: "github",
        message: "What is your github username?",
        when: function(answers){
            return answers.role === "Engineer"
        }
    },
    {
        type: "input",
        name: "school",
        message: "Where do you attend school?",
        when: function(answers){
            return answers.role === "Intern"
        }
    },
    {
        type: "list",
        name: "another",
        message: "Add another employee?",
        choices: [
            "Yes",
            "No"
        ]
    },

]).then(function(res){
    if(res.role === "Manager"){
        let newManager = new Manager(res.name, res.id, res.email, res.office);
        employeeArr.push(newManager);
        render(employeeArr);
    }else if(res.role === "Intern"){
        let newIntern = new Intern(res.name, res.id, res.email, res.school);
        employeeArr.push(newIntern);
    }else if(res.role === "Engineer"){
        let newEngineer = new Engineer(res.name, res.id, res.email, res.github);
        employeeArr.push(newEngineer);
    }

    if(res.another === "Yes"){
        ask();
    }else{
        render(employeeArr)
    }

    
    // render(employeeArr)
    // if(res.another === "Yes"){
    //     ask();
    // }else{
    //     render(employeeArr);
    // }

})
}

ask();