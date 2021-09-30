import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { APIURL } from "../API/environment";

function ActivationEmail() {
  const { activation_token } = useParams();
  console.log(activation_token);
  useEffect(() => {
    if (activation_token) {
      try {
        axios
          .post(`${APIURL}/customer/activate-email`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
            toast.success(res.data.message);
            window.setTimeout(function () {
              window.location.href = "/login";
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        //toast.error(err.response, data.message);
      }
    }
  });

  console.log(activation_token);
  return <div className="activate_page"></div>;
}

export default ActivationEmail;
