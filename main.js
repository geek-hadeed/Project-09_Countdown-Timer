import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import { setInterval } from "timers";
let ask = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: "Enter number of Seconds:",
    validate: (input) => {
        if (isNaN(input)) {
            return "PLEASE ENTER VALID NUMBER";
        }
        else if (input > 60) {
            return ("PLEASE ENTER NUMBER UNDER 60");
        }
        else {
            return true;
        }
    }
});
let input = ask.userInput;
function startTime(value) {
    const time = new Date().setSeconds(new Date().getSeconds() + value);
    const timeInterval = new Date(time);
    setInterval((() => {
        const currentTime = new Date();
        const differenceInTime = differenceInSeconds(timeInterval, currentTime);
        if (differenceInTime <= 0) {
            console.log("Timer Has Expired");
            process.exit();
        }
        const min = Math.floor((differenceInTime % (3600 * 24)) / 3600);
        const sec = Math.floor(differenceInTime % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
