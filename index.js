import express from "express";
import uploadRoute from './routes/uploadRoute.js';
import billingRoute from './routes/billingRoute.js';

const app = express();
const port = 5000;

app.use(express.json());

app.use('/', uploadRoute)

app.use('/', billingRoute)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server is running in Port:${port}`);
});
