export function getChatName(chat, localUser) {
  let chatName = "";
  chat.users.forEach(user => {
    if (user.username !== localUser.username) {
      if (chatName.length > 0) chatName += ", ";
      chatName += user.username;
    }
  });
  return chatName;
}

export function getPicture(chat, localUser) {
  const user = chat.users.find(user => user.username !== localUser.username);
  return user.picture;
}

export function getPictureOfUser(chat, username) {
  const user = chat.users.find(user => user.username === username);
  return user.picture;
}

export function getDate(dateString) {
  const date = new Date(dateString);
  let string = date.getHours() + ":" + date.getMinutes() + " ";
  if (date.getDate() === new Date().getDate()) string += "today";
  else if (
    date.getDate() === new Date(new Date() - 60 * 60 * 24 * 1000).getDate()
  )
    string += "yesterday";
  else string += date.getDate() + "/" + date.getMonth();

  return string;
}