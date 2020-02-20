function setErrorMessageCallBackEnd(error) {
  let messageResponse = "Server down";
  if (error.response) {
    // Server up
    messageResponse = error.response.data;
    if (error.response.data === "") {
      messageResponse = `(${error.response.status}) Server error`;
    }
    if (error.response.status === "500") {
      messageResponse = "Internal server error";
    }
  }
  return messageResponse;
}

function getArrayYears(start, end) {
  let arrayYears = [];
  for (let i = end; i >= start; i--) {
    arrayYears = [...arrayYears, i]
  }
  return arrayYears;
}

const validatorEmail = {
  required: "The e-mail is required",
  pattern: {
    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "The e-mail is not valid"
  },
  maxLength: {
    value: 45,
    message: "Maximun is 45 characters"
  }
};

const validatorPassword = {
  required: "The password is required",
  pattern: {
    value: /^[a-zA-Z0-9]{3,36}$/,
    message: "The password is not valid"
  }
};

const validatorLinkedin = {
  pattern: {
    value: /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/,
    message: "The LinkedIn address is not valid"
  },
  maxLength: {
    value: 255,
    message: "Maximun is 255 characters"
  }
};

const validatorUserName = {
  required: "The name is required",
  maxLength: {
    value: 45,
    message: "Maximun is 45 characters"
  }
};

const validatorCompanyName = {
  required: "Company name is required",
  minLength: {
    value: 3,
    message: "Minimun is 3 characters"
  },
  maxLength: {
    value: 60,
    message: "Maximun is 60 characters"
  }
};

const validatorDescription = {
  minLength: {
    value: 10,
    message: "Minimun is 10 characters"
  },
  maxLength: {
    value: 1000,
    message: "Maximun is 1000 characters"
  }
};

const validatorUrl = {
  pattern: {
    value: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    message: "The URL is not valid"
  },
  maxLength: {
    value: 255,
    message: "Maximun is 255 characters"
  }
};

const validatorAddress = {
  minLength: {
    value: 10,
    message: "Minimun is 10 characters"
  },
  maxLength: {
    value: 60,
    message: "Maximun is 60 characters"
  }
};

const validatorDelete = {
  required: "This field is required",
  pattern: {
    value: /CONFIRM DELETE/,
    message: "Must type CONFIRM DELETE"
  }
};

const validatorSalary = {
  pattern: {
    value: /^\d{1,6}(?:\.\d{0,2})?$/,
    message: "The ammount is not valid"
  }
};

const validatorTitleReview = {
  required: "This field is required",
  minLength: {
    value: 5,
    message: "Minimun is 5 characters"
  },
  maxLength: {
    value: 30,
    message: "Maximun is 30 characters"
  }
};

const validatorDescriptionReview = {
  required: "This field is required",
  minLength: {
    value: 10,
    message: "Minimun is 10 characters"
  },
  maxLength: {
    value: 1000,
    message: "Maximun is 1000 characters"
  }
};


const validatorSector = {
  required: "This field is required",
  minLength: {
    value: 5,
    message: "Minimun is 5 characters"
  },
  maxLength: {
    value: 45,
    message: "Maximun is 45 characters"
  }
};

const validatorPosition = {
  required: "This field is required",
  minLength: {
    value: 5,
    message: "Minimun is 5 characters"
  },
  maxLength: {
    value: 60,
    message: "Maximun is 60 characters"
  }
};

const validatorCity = {
  required: "This field is required",
  minLength: {
    value: 5,
    message: "Minimun is 5 characters"
  },
  maxLength: {
    value: 60,
    message: "Maximun is 60 characters"
  }
};

export {
  setErrorMessageCallBackEnd,
  getArrayYears,
  validatorEmail,
  validatorPassword,
  validatorLinkedin,
  validatorUserName,
  validatorCompanyName,
  validatorDescription,
  validatorUrl,
  validatorAddress,
  validatorDelete,
  validatorTitleReview,
  validatorDescriptionReview,
  validatorSalary,
  validatorSector,
  validatorPosition,
  validatorCity
};
