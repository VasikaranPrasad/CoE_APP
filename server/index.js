// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const DesignVariable = require('./modal/FM_model/DesignVariable');
// const Design = require('./modal/FM_model/DesignModel');
// const userRouter = require('./router/DA_router/userRouter');
// const addrunRouter = require('./router/DA_router/AddRunRouter')
// const landingRouter = require('./router/DD_router/LandingRouter')
// // Vasi model
// const addRunModel = require('./modal/DA_model/AddRunDetails')
// const checklistRoutes = require('./router/DA_router/checklistRoutes')
// const postChecklistRouter = require('./router/DA_router/postChecklistRouter')
// const app = express();
// const dotenv = require("dotenv").config();
// const path = require("path");



const express = require('express');
const cors = require('cors');
const fs = require('fs');
const yaml = require('yaml'); // Add the YAML library
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const DesignVariable = require('./modal/FM_model/DesignVariable');
const Design = require('./modal/FM_model/DesignModel');
const userRouter = require('./router/DA_router/userRouter');
const addrunRouter = require('./router/DA_router/AddRunRouter');
const landingRouter = require('./router/DD_router/LandingRouter');
const addRunModel = require('./modal/DA_model/AddRunDetails');
const checklistRoutes = require('./router/DA_router/checklistRoutes');
const postChecklistRouter = require('./router/DA_router/postChecklistRouter');
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");



const port = process.env.PORT;

app.use(cors());
// Connect to MongoDB

const MongoUrl = process.env.MongoUri

const InitiateMongoServer = async ()=>{
  try{
      await mongoose.connect(MongoUrl,{
          useNewUrlParser:true
      });
      console.log("connected to db")
  }
  catch(e){
      console.log('Failed to connect to MongoDB',e)
      throw e
  }
}
// MongoDb connection
InitiateMongoServer();

// Middleware to parse request bodies as JSON

app.use(express.json());
app.use(bodyParser.json());

// Routes

app.use('/api', userRouter);
app.use('/api', addrunRouter);
app.use('/api', landingRouter);
app.use('/api', checklistRoutes);
app.use('/api', postChecklistRouter)


const _dirname = path.dirname("")
const builPath = path.join(_dirname, "../coe-client/build");
// app.use(express.static(builPath))
app.use(express.static(path.join(builPath)));
app.get("/*", function (req, res) {
  res.sendFile('index.html',
    { root: path.join(_dirname, "../coe-client/build") },
    function (err) {
      if (err) {
        res.status(500).send(err)
      }
    }
  );
})



// //validate given directories
app.post('/validate-directories', (req, res) => {
  const { defDirectory, lefDirectory, libDirectory, techDirectory } = req.body;
  console.log('Request received:', req.body);

  const directories = [
    { name: 'DEF', path: defDirectory, extension: '.def' },
    { name: 'LEF', path: lefDirectory, extension: '.lef' },
    { name: 'LIB', path: libDirectory, extension: '.lib' },
    { name: 'Tech', path: techDirectory, extension: '.tech' }
  ];
  console.log('Directories:', directories);

  const validationResults = directories.map(directory => {
    try {
      const stats = fs.statSync(directory.path);
      console.log(`Stats for ${directory.name}:`, stats);
      if (stats.isFile() && directory.path.endsWith(directory.extension)) {
        // If the provided path is a file and has the required extension
        return { name: directory.name, isValid: true };
      } else {
        // If the provided path is not a file or does not have the required extension
        return { name: directory.name, isValid: false };
      }
    } catch (err) {
      console.error(`Error validating ${directory.name}:`, err);
      return { name: directory.name, isValid: false };
    }
  });

  console.log('Validation results:', validationResults);
  res.json(validationResults);
});

//save paths
app.post('/save-path', async (req, res) => {
  const { defDirectory, lefDirectory, libDirectory, techDirectory } = req.body.data;
  const dataId = req.body.dataId

  // Create a new design document
  const design = new Design({
    defDirectory,
    lefDirectory,
    libDirectory,
    techDirectory,
    runId: dataId
  });

  // Save the design document to the database
  try {
    await design.save();
    res.status(201).json({ message: 'Design saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//save variables
app.post('/save-design-variable', async (req, res) => {
  const { design, num_cpu, power_opt, gen_eff, data_Id } = req.body;
  console.log( design, num_cpu, power_opt, gen_eff, data_Id)

  // Create a new design variable document
  const designVariable = new DesignVariable({
    design,
    num_cpu,
    power_opt,
    gen_eff,
    runId: data_Id
  });

  // Save the design variable document to the database
  try {
    await designVariable.save();
    await addRunModel.findByIdAndUpdate(data_Id, { fm: true }, { new: true });
    res.status(201).json({ message: 'Design variable saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.get('/design-paths', async (req, res) => {
//   try {
//     const designs = await Design.find();
//     res.status(200).json(designs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

app.get('/design-variables', async (req, res) => {
  try {
    const designVariables = await DesignVariable.find();
    res.status(200).json(designVariables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//fetch unique data
app.get('/fetch-data/:runId', async (req, res) => {
  const runId = req.params.runId;

  try {
    // Fetch data from the first collection
    const collection1Data = await Design.findOne({ runId });

    // Fetch data from the second collection
    const collection2Data = await DesignVariable.findOne({ runId });

    // Combine the data from both collections
    const data = { collection1Data, collection2Data };

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// New route to process the file path from the frontend
app.post('/process-file', (req, res) => {
  const { filePath } = req.body;

  // Configuration for the SSH connection
  const sshConfig = {
    host: '172.16.90.3',
    port: 22,
    username: 'vasikaran',
    password: 'Vasikaran@123', // Or use privateKey, if applicable
  };

  // Create a new SSH client
  const { Client } = require('ssh2');
  const sshClient = new Client();

  // Connect to the Linux server via SSH
  sshClient.connect(sshConfig);

  sshClient.on('ready', () => {
    console.log('SSH connection established.');

    // Fetch the file from the Linux server
    sshClient.sftp((err, sftp) => {
      if (err) {
        console.error('Error occurred during SFTP:', err);
        sshClient.end(); // Close the SSH connection
        res.status(500).json({ error: 'Error occurred during SFTP' });
        return;
      }

      // Fetch the file contents
      sftp.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error occurred while reading the file:', err);
          sshClient.end(); // Close the SSH connection
          res.status(500).json({ error: 'Error occurred while reading the file' });
          return;
        }

        // Remove comments from the YAML data
        const cleanedData = data.replace(/#.*/g, '');

        // Parse the cleaned YAML data to a JavaScript object
        const yamlData = yaml.parse(cleanedData);

        // Convert the JavaScript object to JSON
        const jsonString = JSON.stringify(yamlData, null, 2);

        // Write the JSON string to a new JSON file
        const outputPath = '../coe-client/src/DA/components/output2.json';
        fs.writeFileSync(outputPath, jsonString, 'utf8');

        console.log('YAML to JSON conversion is complete. The JSON data has been saved to output.json.');

        // Close the SSH connection after the file is fetched and processed
        sshClient.end();

        res.json({ message: 'YAML to JSON conversion is complete. The JSON data has been saved to output.json.' });
      });
    });
  });

  // Handle errors during the SSH connection
  sshClient.on('error', (err) => {
    console.error('Error occurred during SSH connection:', err);
    sshClient.end(); // Close the SSH connection
    res.status(500).json({ error: 'Error occurred during SSH connection' });
  });

  // Handle SSH connection close
  sshClient.on('close', () => {
    console.log('SSH connection closed.');
  });
});




// Start the server

app.listen(port, () => {

  console.log(`Server is running on port ${port}`);

});
