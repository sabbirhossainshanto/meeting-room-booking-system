import express from 'express';
import cors from 'cors';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app = express();

/* parser */
app.use(express.json());
// app.use(express.static())
app.use(
  cors({
    credentials: true,
    origin: [
      'http://localhost:5174',
      'http://localhost:5173',
      'http://localhost:5175',
      'https://meeting-room-booking-gules.vercel.app',
    ],
   
  }),
);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* Module routes */
app.use('/api', router);
/* Error handling */
app.use(globalErrorHandler);
app.use(notFound);

export default app;
