import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'yaml';
import { middleware } from 'express-openapi-validator';


// Load the OpenAPI spec from the YAML file
const swaggerDocument = yaml.parse(fs.readFileSync('src/basicServer.yaml', 'utf-8'));

const app = express();
const port = 8000;

// Serve Swagger UI for OpenAPI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware: Load and validate against OpenAPI spec
app.use(
  middleware({
    apiSpec: 'src/basicServer.yaml',   // Path to OpenAPI spec
    validateRequests: true,      // Validate incoming requests
    validateResponses: true      // Validate outgoing responses
  })
);

// Sample incident data
interface Incident {
  id: string;
  date: string;
  time: string;
  road_id: string;
  place: string;
  direction: string;
  description: string;
}

const incidents: Incident[] = [
  {
    id: "MABOS001",
    date: "20170617",
    time: "1437",
    road_id: "A90",
    place: "Stonehaven",
    direction: "north",
    description: "Broken-down T on north and park station."
  },
  {
    id: "MABOS002",
    date: "20221217",
    time: "0937",
    road_id: "A90",
    place: "Stonehaven",
    direction: "north",
    description: "Car in West Village broken down."
  }
];

// GET all incidents
app.get('/incidents', (req: Request, res: Response) => {
  res.status(200).json(incidents);
});

// GET an incident by ID
app.get('/incidents/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const incident = incidents.find((incident) => incident.id === id);
  
  if (incident) {
    res.status(200).json(incident);
  } else {
    res.status(400).json({ error: 'Incident not found' });
  }
});

// Error handling for OpenAPI validation errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status) {
    // OpenAPI validation error
    res.status(err.status).json({
      message: err.message,
      errors: err.errors
    });
  } else {
    // General server error
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
