const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const DesignVariable = require('./modal/FM_model/DesignVariable');
const Design = require('./modal/FM_model/DesignModel');
const userRouter = require('./router/DA_router/userRouter');
const addrunRouter = require('./router/DA_router/AddRunRouter')
const landingRouter = require('./router/DD_router/LandingRouter')
// Vasi model
const addRunModel = require('./modal/DA_model/AddRunDetails')
const checklistRoutes = require('./router/DA_router/checklistRoutes')
const postChecklistRouter = require('./router/DA_router/postChecklistRouter')
const app = express();
const dotenv = require("dotenv").config();
const path = require("path")

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


// Start the server

app.listen(port, () => {

  console.log(`Server is running on port ${port}`);

});
