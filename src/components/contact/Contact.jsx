import { Button, TextField } from "@mui/material";
import ContactLottie from "./contactLottie";
import { Element } from "react-scroll";
import { useEffect } from "react";
import { useFormik } from "formik";
import emailjs from "@emailjs/browser";
import * as Yup from "yup";
import { styled } from "styled-components";

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    color: white;
  }

  .MuiInputLabel-root {
    color: white;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }
`;
const StyledTextFieldMessage = styled(TextField)`
  .MuiOutlinedInput-root {
    width: 100%;
    min-height: 300px;
    color: white;
  }

  .MuiInputLabel-root {
    color: white;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }
`;

const ContactSchema = Yup.object({
  fullname: Yup.string().min(2).required("Name is a required field"),
  email: Yup.string()
    .email()
    .min(4)
    .max(35)
    .required("Email is a required field"),
  message: Yup.string().max(200).required("Message is a required field"),
});

const iValues = {
  fullname: "",
  email: "",
  message: "",
};
export default function Contact() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: iValues,
    validationSchema: ContactSchema,
    onSubmit: () => {
      resetForm();
      emailjs.send(
        "service_yijdw0n",
        "template_l4ekoov",
        {
          fullname: values.fullname,
          contact: values.contact,
          message: values.message,
          email: values.email,
        },
        "zcKF8sOM7vmxCXLng"
      );
    },
  });

  useEffect(() => {
    function _turnstileCb(response) {
      console.debug("Turnstile verification response:", response);
    }

    const loadTurnstileScript = () => {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        window.turnstile.render(".cf-turnstile", {
          sitekey: "0x4AAAAAAAJovBJuxtfEvcgQ",
          theme: "dark",
          callback: _turnstileCb,
          mode: "managed",
        });
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    };

    loadTurnstileScript();
  }, []);

  return (
    <Element name="contact" className="contactParent">
      <div className="lottieContact">
        <div className="lottieContactCenter">
          <ContactLottie />
        </div>
      </div>
      <div className="contactForm">
        <div className="leftContact">
          <div className="contactTitle">
            <h1>Contact</h1>
          </div>
          <div className="contactLeftInputs">
            <div className="leftInputs">
              <StyledTextField
                variant="outlined"
                label="Full Name"
                size="large"
                placeholder="Full Name"
                name="fullname"
                value={values.fullname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.fullname}
                helperText={
                  errors.fullname && touched.fullname ? (
                    <p>{errors.fullname}</p>
                  ) : null
                }
              />
              <StyledTextField
                variant="outlined"
                label="Email"
                size="large"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                helperText={
                  errors.email && touched.email ? <p>{errors.email}</p> : null
                }
              />
            </div>
            <div className="cf-turnstile"></div>
          </div>
        </div>
        <div className="rightContact">
          <div className="centerMessages">
            <StyledTextFieldMessage
              label="Message"
              placeholder="Message"
              multiline
              variant="outlined"
              maxRows={5}
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.message}
              helperText={
                errors.message && touched.message ? (
                  <p>{errors.message}</p>
                ) : null
              }
            />
          </div>
          <div className="buttonContact">
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={handleSubmit}
              fullWidth
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </Element>
  );
}
