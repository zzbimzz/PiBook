function convertFormData(form) {
  const formDataObject = {};
  const data = new FormData(form);
  data.forEach((value, key) => {
    formDataObject[key] = value;
  });

  return formDataObject;
}

export default convertFormData;
