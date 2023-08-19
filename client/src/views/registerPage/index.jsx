import { useState } from "react";
import { ProfessionalRegisterForm, StudentRegisterForm, CompanyRegisterForm } from "../../components";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState("");

  const handleRegister = (type) => {
    setRegisterForm(type);
  };

  return (
    <main className="main-container">
      <h2>First of all... How do you want to register?</h2>
      {registerForm === "" && (
        <section className="button-section">
          <button className="register-button" onClick={() => handleRegister("student")}>
            Student
          </button>
          <button className="register-button" onClick={() => handleRegister("professional")}>
            Professional
          </button>
          <button className="register-button" onClick={() => handleRegister("company")}>
            Company
          </button>
        </section>
      )}
      {registerForm === "student" && <StudentRegisterForm />}
      {registerForm === "professional" && <ProfessionalRegisterForm />}
      {registerForm === "company" && (
        <div>
           <img src="/images/company_image.png" alt="Company" />
        </div>
      )}
      <footer className="footer-container">
        <button className="back-button" onClick={() => navigate("/")}>
          {registerForm === "company" && <CompanyRegisterForm />}
        </button>
      </footer>
    </main>
  );
}
