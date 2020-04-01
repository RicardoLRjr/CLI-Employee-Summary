const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
var employees = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function askName() {
    inquirer
     .prompt([
          {
          type: "input",
          name: "name",
          message: "What is this employee's name?",
        },
        {
            type: "input",
            name: "email",
            message: "What is this employee's email?",
          },
          {
            type: "input",
            name: "ID",
            message: "What is this employee's ID?",
          },
          { 
            type: "checkbox",
            name: "role",
            message: "What is this employee's role?",
            choices: ["employee", "manager", "intern", "engineer"]
        },
                {
            when: function (answer) {
              return answer.role == "manager";
            },
            type: "input",
            name: "officeNumber",
            message: "What is this employee's office number?",
            },
            {
                when: function (answer) {
                  return answer.role == "engineer";
                },
                type: "input",
                name: "gitHub",
                message: "What is this employee's GitHub user name?",
                },
                {
                    when: function (answer) {
                      return answer.role == "intern";
                    },
                    type: "input",
                    name: "school",
                    message: "What is this employee's school?",
                    }
     ]).then(answers => {
         if (answers.role == "manager"){
            const manager = new Manager(answers.name, answers.ID, answers.email, answers.role, answers.officeNumber, )
            console.log(manager)
        employees.push(manager)}
           else if (answers.role == "intern"){
                const intern = new Intern(answers.name, answers.ID, answers.email, answers.role, answers.school)
                console.log(intern)
                employees.push(intern)}
               else if (answers.role == "engineer"){
                    const engineer = new Engineer(answers.name, answers.ID, answers.email, answers.role, answers.gitHub)
                    console.log(engineer)
                    employees.push(engineer)}
                    else if (answers.role == "employee"){
                        const employee = new Employee(answers.name, answers.ID, answers.email, answers.role)
                        console.log(employee)
                        employees.push(employee)}
                        else{
                            return
                        }
         }).then(answers => {
            render(employees);
            console.log(render(employees))
            const htmlFramework = render(employees)
            fs.writeFile(outputPath, htmlFramework, function(err){
                if (err) {
                    console.log(err);
                  }
                  else {
                    console.log("Your Employee Summary has been written!")
                  }    
              });

        }).then(answers => {
             inquirer.prompt([
            {
                type: "confirm",
                name: "runAgain",
                messsage: "Add another employee?"
            }
        ]).then(answers => {
            if(answers.runAgain == true){
                askName();
            } 
            else {
                return          
        }
        })
    })

    }

askName();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
