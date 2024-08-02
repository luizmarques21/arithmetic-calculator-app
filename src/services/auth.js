export let time

export const isAuthenticated = () => {
  if (sessionStorage.getItem("user-token")) {
      inactivityTimeout()
  }

  return getToken();
}
export const getUser = () => JSON.parse(localStorage.getItem("user"))

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
}

export const getToken = () => localStorage.getItem("user-token");

export const login = data => { 
    localStorage.setItem("user-token", data.token); 
    setUser(data.user) 
}

export const logout = () => localStorage.clear()

export const inactivityTimeout = () => {
  document.onscroll = resetTimer;
  document.onmousemove = resetTimer;
  document.onmousedown = resetTimer;
  document.onclick = resetTimer;
  document.onkeypress = resetTimer;

  function getOut() {
      alert(`${sessionStorage.getItem("operatorName")}, your session expired!`)
      clearTimeout(time)
      logout()
      window.location.href = '/';
  }

 function resetTimer() {
      clearTimeout(time);
      time = setTimeout(getOut, 900000); //Padrão 15 minutos(900000)
  }
}
