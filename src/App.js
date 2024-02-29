import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./+homedirectory/pages/Home";

import {
  displayDonationTransaction,
  displayDonors,
  displayMedicalCenters,
  displayMedicalRecord,
  displayTransporters,
  isWallectConnected,
} from "./BlockchainService";
import MDLogin from "./medicalcenter/pages/Authentication/MDLogin";
import DonorLogin from "./Donor/pages/Authentication/DonorLogin";
import TransLogin from "./transporter/pages/Authentication/TransLogin";
import VerifyBlood from "./medicalcenter/pages/VerifyBlood";
import DonateBloodToMedicalCenter from "./medicalcenter/pages/DonateBloodToMedicalCenter";
import CPRegisterDonor from "./collectionPoint/pages/CPRegisterDonor";
import CPViewDonor from "./collectionPoint/pages/CPViewDonor";
import CPDonationTransaction from "./collectionPoint/pages/CPDonationTransaction";
import BloodSupplied from "./medicalcenter/pages/BloodSupplied";
import CPLogin from "./collectionPoint/pages/Authentication/CPLogin";
import MDViewDonor from "./medicalcenter/pages/MDViewDonor";
import DSLogin from "./damuSalama/pages/authentication/DSLogin";
import DSRegisterMedicalCenter from "./damuSalama/pages/DSRegisterMedicalCenter";
import DSRegisterTransporter from "./damuSalama/pages/DSRegisterTransporter";
import MedicalRecords from "./medicalcenter/pages/MedicalRecords";
import DNDashboard from "./Donor/pages/DNDashboard";
import CPDashboard from "./collectionPoint/pages/CPDashboard";
import MCDashboard from "./medicalcenter/pages/MCDashboard";
import DSDashboard from "./damuSalama/pages/DSDashboard";
import DonationTransactionRecord from "./Donor/pages/DonationTransactionRecord";
import TransDashboard from "./transporter/pages/TransDashboard";
import InitiateTransportation from "./transporter/pages/InitiateTransportation";

function App() {
  useEffect(() => {
    const isConnected = async () => {
      await isWallectConnected();
      await displayDonors();
      await displayTransporters();
      await displayMedicalCenters();
      await displayDonationTransaction();
      await displayMedicalRecord();
    };
    isConnected();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Damu Salama Routes */}
        <Route path="/damu-salama/login" element={<DSLogin />} />
        <Route path="/damu-salama/dashboard" element={<DSDashboard />} />
        <Route
          path="/damu-salama/medical-center"
          element={<DSRegisterMedicalCenter />}
        />
        <Route
          path="/damu-salama/transporter"
          element={<DSRegisterTransporter />}
        />
        {/* Medical Center Routes */}
        <Route path="/medical-center/login" element={<MDLogin />} />
        <Route path="/medical-center/dashboard" element={<MCDashboard />} />
        <Route path="/medical-center/verify-blood" element={<VerifyBlood />} />
        <Route path="/medical-center/view-donor" element={<MDViewDonor />} />
        <Route
          path="/medical-center/medical-records"
          element={<MedicalRecords />}
        />
        <Route
          path="/medical-center/blood-supplied"
          element={<BloodSupplied />}
        />
        <Route
          path="/medical-center/donate-blood-to-medicalcenter"
          element={<DonateBloodToMedicalCenter />}
        />
        {/* Donor Routes */}
        <Route path="/donor/login" element={<DonorLogin />} />
        <Route path="/donor/dashboard" element={<DNDashboard />} />
        <Route path="/donor/records" element={<DonationTransactionRecord />} />

        {/* Transporter */}
        <Route path="/transporter/login" element={<TransLogin />} />
        <Route path="/transporter/dashboard" element={<TransDashboard />} />
        <Route
          path="/transporter/initiate-transportation"
          element={<InitiateTransportation />}
        />

        {/* Collection Point Routes */}
        <Route path="/collection-point/login" element={<CPLogin />} />
        <Route path="/collection-point/dashboard" element={<CPDashboard />} />
        <Route
          path="/collection-point/register-donor"
          element={<CPRegisterDonor />}
        />
        <Route path="/collection-point/view-donor" element={<CPViewDonor />} />
        <Route
          path="/collection-point/donation-transaction"
          element={<CPDonationTransaction />}
        />
      </Routes>
    </Router>
  );
}

export default App;
