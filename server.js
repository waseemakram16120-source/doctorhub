const express = require('express');
const cors = require('cors');
const path = require('path');
const { setupDatabase } = require('./database');

const authRoutes = require('./routes/auth.routes');
const doctorRoutes = require('./routes/doctor.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const paymentRoutes = require('./routes/payment.routes');
const historyRoutes = require('./routes/history.routes');
const prescriptionRoutes = require('./routes/prescription.routes');
const communicationRoutes = require('./routes/communication.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Static folder for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/communication', communicationRoutes);
app.use('/api/admin', adminRoutes);

// Database initialization and server start
setupDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
  });
