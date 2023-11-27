const validator = (reservationData) => {
  const warnings = [];

  if (!/^\d{4}-\d{2}-\d{2}$/.test(reservationData["date"])) {
    warnings.push("Date is invalid");
  }

  if (!reservationData["location"]) {
    warnings.push("Location is invalid");
  }

  if (!/^[A-Z0-9\s-]*$/.test(reservationData["vehicle_no"])) {
    warnings.push("Vehicle number is invalid");
  }

  if (!/^\d+$/.test(reservationData["mileage"])) {
    warnings.push("Mileage is invalid");
  }

  if (!reservationData["message"]) {
    warnings.push("Message is invalid");
  }

  return warnings;
};

module.exports = validator;
