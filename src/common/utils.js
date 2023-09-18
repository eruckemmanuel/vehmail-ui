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
    return `Today, ${getDateHour(date)}:${getDateMinute(date)}`;
  }
  return date.toDateString();
};

export const getNameFromEmail = (email) => {
  const emailParts = email.split("@");
  const name = emailParts[0];
  return name[0].toUpperCase() + name.substring(1);
};

export const getAllThreadParticipants = (thread) => {
  const participants = [];
  const names = [];
  const namesAndEmails = [];
  thread.forEach((item) => {
    const email = item.sender[0][1];
    const name = item.sender[0][0] || getNameFromEmail(item.sender[0][1]);
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
