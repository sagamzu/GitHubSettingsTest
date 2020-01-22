  
function logToAzureDevops(msg: string, type: string){
    const lines = msg.split('\n');
    for (const line of lines) {
      console.log(`##vso[task.logissue type=${type}]${line}`); //??? console.log(`##[type]:${line}`)
    }

    console.log(`##[${type}]: "test`);
}

export const logError = (msg: string) => logToAzureDevops(msg, 'error');

export const logWarning = (msg: string) => logToAzureDevops(msg, 'warning');

export const logCommand = (msg: string) => logToAzureDevops(msg, 'command');

export const logSection = (msg: string) => logToAzureDevops(msg, 'section');
