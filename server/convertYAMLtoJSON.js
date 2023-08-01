const fs = require('fs');
const yaml = require('yaml');
const { Client } = require('ssh2');

// Create a new SSH client
const sshClient = new Client();

// Configuration for the SSH connection
const sshConfig = {
  host: '172.16.90.3',
  port: 22, // Default SSH port is 22
  username: 'vasikaran',
  password: 'Vasikaran@123', // Or use privateKey, if applicable
};

// Connect to the Linux server via SSH
sshClient.connect(sshConfig);

sshClient.on('ready', () => {
  console.log('SSH connection established.');

  // File path of the flow.yaml on the Linux server
  const remoteFilePath = '/home/TE10732/Zeus_1p0_OTPC_EF_F360_T360/scripts/flow.yaml';

  // Fetch the flow.yaml file from the Linux server
  sshClient.sftp((err, sftp) => {
    if (err) {
      console.error('Error occurred during SFTP:', err);
      sshClient.end(); // Close the SSH connection
      return;
    }

    sftp.readFile(remoteFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error occurred while reading flow.yaml:', err);
        sshClient.end(); // Close the SSH connection
        return;
      }

      // Remove comments from the YAML data
      const cleanedData = data.replace(/#.*/g, '');

      // Parse the cleaned YAML data to JavaScript object
      const yamlData = yaml.parse(cleanedData);

      // Convert the JavaScript object to JSON
      const jsonString = JSON.stringify(yamlData, null, 2);

      // Write the JSON string to a new JSON file
      fs.writeFileSync('../coe-client/src/DA/components/output.json', jsonString, 'utf8');

      console.log('YAML to JSON conversion is complete. The JSON data has been saved to output.json.');

      // Close the SSH connection after the file is fetched and processed
      sshClient.end();
    });
  });
});

// Handle errors during the SSH connection
sshClient.on('error', (err) => {
  console.error('Error occurred during SSH connection:', err);
  sshClient.end(); // Close the SSH connection
});

// Handle SSH connection close
sshClient.on('close', () => {
  console.log('SSH connection closed.');
});

