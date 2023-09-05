const {exec} = require('child_process');

exec("gh classroom accepted-assignments -a 481687", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }

    const lines = stdout.split("\n");
    lines.forEach(line => {
        console.log(line);
    })
});