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

export const sshInto = (ip,pass) =>
{
  executeCommand('ssh root@ $ip',
    branch => success(branch),
    errormsg => error(errormsg)
   )
} 

export const getPingWin = (ip,pakketsize,totalpings,success,error) =>
{
    executeCommand(
        'ping -n ${totalpings} -l ${pakketsize} ${ip}',
        branch => success(branch),
        errormsg => error(errormsg)
    );
};
export const getPingLinux = (ip,pakketsize,totalpings,success,error) =>
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
export const downLoadLinux = (ip,image,success,error) => 
{
  executeCommand
  (
    'wget',
    branch => success(branch),
    errormsg => error(errormsg)
  );
}