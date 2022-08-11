const { exec } = require('child_process');

export const executeCommand = (cmd, successCallback, errorCallback) => {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
     // console.log(`error: ${error.message}`);
      if (errorCallback) {
        errorCallback(error.message);
      }
      return;
    }
    if (stderr) {
      //console.log(`stderr: ${stderr}`);
      if (errorCallback) {
        errorCallback(stderr);
      }
      return;
    }
    //console.log(`stdout: ${stdout}`);
    if (successCallback) {
      successCallback(stdout);
    }
  });
};

export const getPingWin = (ip,pakketsize,totalpings,success,error) =>
{
    executeCommand(
        'ping -n ${totalpings} -l ${pakketsize} ${ip}',
        branch => success(branch),
        errormsg => error(errormsg)
    );
};
export const getPingLin = (ip,pakketsize,totalpings,success,error) =>
{
    executeCommand(
        'ping -c ${totalpings} -s ${pakketsize} ${ip}',
        branch => success(branch),
        errormsg => error(errormsg)
    );
};
export const getPingMac = (ip,pakketsize,totalpings,success,error) =>
{
    executeCommand(
        'ping -c ${totalpings} -s ${pakketsize} ${ip}',
        branch => success(branch),
        errormsg => error(errormsg)
    );
};