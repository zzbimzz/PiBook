//chuyển dổi giữ liệu từ formData sang JS

function convertFormData(form) {
  const formDataObject = {}; // đối tượng
  const data = new FormData(form);
  data.forEach((value, key) => {
    formDataObject[key] = value;
  });

  return formDataObject;
}

export default convertFormData;
