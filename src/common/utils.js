export const dateIsToday = (date) => {
  return date.toDateString() === new Date().toDateString();
};

export const getDateHour = (date) => {
  return `${date.getHours().toString().padStart(2, "0")}`;
};

export const getDateMinute = (date) => {
  return `${date.getMinutes().toString().padStart(2, "0")}`;
};

export const getFormattedDate = (dateStr) => {
  const date = new Date(dateStr);
  if (dateIsToday(date)) {
    return `${getDateMinute(date)}:${getDateMinute()}`;
  }
  return date.toDateString();
};

export const getNameFromEmail = (email) => {
  const name = email.split("@")[0];
  return name[0].toUpperCase() + name.substring(1);
};

export const getDisplayNameFromAddressArray = (addressArray) => {
  return addressArray[0][0] || addressArray;
};

export const getAllThreadParticipants = (thread) => {
  const participants = [];
  const names = [];
  const namesAndEmails = [];
  thread.forEach((item) => {
    const email = item.from[0][1];
    const name =
      item.from[0][0] || getDisplayNameFromAddressArray(item.from[0][1]);
    if (!participants.includes(email)) {
      participants.push(email);
      names.push(name);
      namesAndEmails.push({
        name: name,
        email: email,
      });
    }
  });

  return {
    names: names,
    emails: participants,
    namesAndEmails: namesAndEmails,
  };
};
